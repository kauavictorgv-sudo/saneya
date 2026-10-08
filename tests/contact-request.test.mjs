import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { test, afterEach } from "node:test";
import ts from "typescript";
import { validateContact } from "../lib/contact-request.ts";
import { createContactEmail, sendContactEmail } from "../lib/contact-email.ts";
import { allowContactAttempt, isAllowedOrigin, readContactBody } from "../lib/contact-security.ts";

const data = { name: "Pessoa Teste", email: "teste@example.com", phone: "", organization: "", city: "", service: "Workshop de reciclagem", message: "Atividade de reciclagem para um grupo de participantes." };
const reference = "2d655e08-079c-4ff3-88bb-0b70d7136aa1";
const settings = { apiKey: "test-key-not-a-secret", from: "Saneyá <onboarding@resend.dev>", to: "saneyaambiental@gmail.com" };

test("campos obrigatórios são validados e opcionais vazios são aceitos", () => {
  assert.deepEqual(Object.keys(validateContact({}).errors).sort(), ["email", "message", "name", "service"]);
  assert.deepEqual(validateContact(data), { ok: true, data });
  assert.equal(validateContact({ ...data, name: "  Kauã  ", message: "Linha inicial\r\nLinha seguinte" }).data.name, "Kauã");
});

test("rejeita tipos, controles, e-mails, telefones, serviços e tamanhos inválidos", () => {
  for (const patch of [{ email: "a@example.com\r\nBcc: pessoa@exemplo.com" }, { email: "a..b@example.com" }, { email: "a@-example.com" }, { name: 42 }, { name: "a".repeat(81) }, { service: "Serviço inexistente" }, { phone: "abc" }, { message: "curta" }, { message: "a".repeat(1201) }, { organization: "a".repeat(121) }]) assert.equal(validateContact({ ...data, ...patch }).ok, false);
});

test("template mantém HTML de entrada como texto e fornece versão textual", () => {
  const email = createContactEmail({ ...data, name: '<img src=x onerror="alert(1)">', message: "Texto <script>alert(1)</script> & conteúdo" }, reference);
  assert.equal(email.html.includes("<script>"), false);
  assert.equal(email.html.includes("<img src=x"), false);
  assert.ok(email.html.includes("&lt;script&gt;"));
  assert.ok(email.text.includes("Referência: " + reference));
  assert.ok(email.text.includes("30 dias"));
});

test("envio HTTP define remetente, destinatário, resposta e chave estável para repetição", async () => {
  const requests = [];
  const mock = async (url, options) => { requests.push({ url, options }); return Response.json({ id: "email-test" }); };
  assert.deepEqual(await sendContactEmail(data, reference, settings, mock), { accepted: true });
  await sendContactEmail(data, reference, settings, mock);
  assert.equal(requests[0].url, "https://api.resend.com/emails");
  assert.equal(requests[0].options.headers["Idempotency-Key"], "saneya-contact/" + reference);
  assert.equal(requests[0].options.body, requests[1].options.body);
  const body = JSON.parse(requests[0].options.body);
  assert.deepEqual(body.to, [settings.to]);
  assert.equal(body.reply_to, data.email);
  assert.equal(body.from, settings.from);
});

test("falhas do provedor nunca são apresentadas como sucesso", async () => {
  for (const [status, reason] of [[401, "unavailable"], [409, "conflict"], [429, "rate_limit"], [500, "uncertain"]]) assert.deepEqual(await sendContactEmail(data, reference, settings, async () => Response.json({ message: "Detalhe interno" }, { status })), { accepted: false, reason });
  assert.deepEqual(await sendContactEmail(data, reference, settings, async () => { throw new Error("timeout"); }), { accepted: false, reason: "uncertain" });
  assert.deepEqual(await sendContactEmail(data, reference, settings, async () => Response.json({})), { accepted: false, reason: "uncertain" });
});

test("origem é comparada ao domínio configurado e não ao Host fornecido pelo cliente", () => {
  const make = (origin, site) => new Request("https://saneya.test/api/atendimento", { headers: { ...(origin ? { origin } : {}), ...(site ? { "sec-fetch-site": site } : {}) } });
  assert.equal(isAllowedOrigin(make("https://saneya.test"), "https://saneya.test"), true);
  assert.equal(isAllowedOrigin(make("https://malicioso.test"), "https://saneya.test"), false);
  assert.equal(isAllowedOrigin(make(null), "https://saneya.test"), false);
  assert.equal(isAllowedOrigin(make("https://saneya.test", "cross-site"), "https://saneya.test"), false);
  assert.equal(isAllowedOrigin(make("https://saneya.test"), "https://saneya.test/caminho"), false);
});

test("limite de corpo vale também sem Content-Length", async () => {
  const make = (body) => new Request("https://saneya.test", { method: "POST", body });
  assert.deepEqual(await readContactBody(make(JSON.stringify({ nome: "Kauã" }))), { nome: "Kauã" });
  await assert.rejects(readContactBody(make("a".repeat(16385))), RangeError);
  await assert.rejects(readContactBody(make("{invalido")), SyntaxError);
});

test("controle local bloqueia a sexta tentativa e libera após a janela", () => {
  for (let index = 0; index < 5; index++) assert.equal(allowContactAttempt("unit-rate-test", 1000).allowed, true);
  assert.deepEqual(allowContactAttempt("unit-rate-test", 1001), { allowed: false, retryAfter: 600 });
  assert.equal(allowContactAttempt("unit-rate-test", 601001).allowed, true);
});

// Transpila a rota real em memória, sem gerar arquivos ou usar um provedor real.
const routeSource = await readFile(new URL("../app/api/atendimento/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(routeSource, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText.replace(/from "@\/lib\/([^"\n]+)"/g, (_, name) => `from "${new URL(`../lib/${name}.ts`, import.meta.url).href}"`);
const { POST } = await import("data:text/javascript;base64," + Buffer.from(compiled).toString("base64"));
const originalFetch = globalThis.fetch;
const environmentKeys = ["CONTACT_FORM_ORIGIN", "CONTACT_FORM_ENABLED", "RESEND_API_KEY", "CONTACT_EMAIL_FROM", "VERCEL"];
const originalEnvironment = Object.fromEntries(environmentKeys.map((key) => [key, process.env[key]]));
afterEach(() => { globalThis.fetch = originalFetch; for (const [key, value] of Object.entries(originalEnvironment)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; } });
let sourceIndex = 0;
function configure() {
  process.env.CONTACT_FORM_ORIGIN = "https://saneya.test";
  process.env.CONTACT_FORM_ENABLED = "true";
  process.env.RESEND_API_KEY = settings.apiKey;
  process.env.CONTACT_EMAIL_FROM = settings.from;
  process.env.VERCEL = "1";
}
function request(payload = { ...data, reference, website: "" }, headers = {}) {
  return new Request("https://saneya.test/api/atendimento", { method: "POST", headers: { Origin: "https://saneya.test", "Content-Type": "application/json", "x-forwarded-for": `192.0.2.${++sourceIndex}`, ...headers }, body: JSON.stringify(payload) });
}

test("rota real envia somente ao destinatário institucional e retorna referência sem segredo", async () => {
  configure();
  let sent;
  globalThis.fetch = async (_, options) => { sent = JSON.parse(options.body); return Response.json({ id: "email-test" }); };
  const response = await POST(request({ ...data, reference, website: "", to: "outro@example.com" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { ok: true, reference });
  assert.deepEqual(sent.to, ["saneyaambiental@gmail.com"]);
  assert.equal(sent.reply_to, data.email);
  assert.equal(response.headers.get("cache-control"), "no-store");
});

test("sem configuração, rota retorna indisponibilidade e não chama o provedor", async () => {
  configure();
  delete process.env.RESEND_API_KEY;
  globalThis.fetch = async () => { assert.fail("Não deve enviar sem credencial"); };
  const response = await POST(request());
  assert.equal(response.status, 503);
  assert.equal((await response.json()).ok, false);
});

test("API rejeita origem externa, honeypot, dados inválidos e referência inválida", async () => {
  configure();
  globalThis.fetch = async () => { assert.fail("Entrada inválida não deve chegar ao provedor"); };
  assert.equal((await POST(request(undefined, { Origin: "https://malicioso.test" }))).status, 403);
  assert.equal((await POST(request({ ...data, reference, website: "https://spam.test" }))).status, 400);
  const invalid = await POST(request({ ...data, reference, website: "", email: "invalido" }));
  assert.equal(invalid.status, 400);
  assert.ok((await invalid.json()).errors.email);
  assert.equal((await POST(request({ ...data, website: "", reference: "invalida" }))).status, 400);
  assert.equal((await POST(request(undefined, { "Content-Type": "text/plain" }))).status, 415);
});

test("API limita tamanho e mantém resultado incerto quando o provedor falha", async () => {
  configure();
  assert.equal((await POST(request({ ...data, reference, website: "", message: "a".repeat(17000) }))).status, 413);
  globalThis.fetch = async () => { throw new Error("Não expor credenciais nem detalhes internos"); };
  const response = await POST(request());
  assert.equal(response.status, 502);
  const body = await response.json();
  assert.equal(body.ok, false);
  assert.equal(JSON.stringify(body).includes("credenciais"), false);
});
