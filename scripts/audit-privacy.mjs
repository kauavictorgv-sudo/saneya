import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { CONSENT_KEY, createConsent, parseConsent } from "../lib/cookie-consent.ts";

// Usa Playwright já disponível no ambiente, sem adicioná-lo à aplicação.
const require = createRequire(import.meta.url);
const { chromium } = require("playwright");
const base = process.env.PRIVACY_TEST_URL || "http://127.0.0.1:3100";
const output = new URL("../artifacts/privacy-audit-email/", import.meta.url);
await mkdir(output, { recursive: true });
const checks = [];
const pass = (message) => { checks.push(message); console.log(`OK: ${message}`); };

for (const action of ["all", "necessary", "custom"]) {
  assert.equal(parseConsent(JSON.stringify(createConsent(action))).optional, false);
}
for (const value of [null, "broken", "null", "[]", "true", '{"version":0}', JSON.stringify({ ...createConsent("all"), optional: true }), JSON.stringify({ ...createConsent("all"), version: 999 }), JSON.stringify({ ...createConsent("all"), action: "unknown" })]) {
  assert.equal(parseConsent(value), null);
}
pass("Preferências inválidas, antigas ou com autorização opcional são rejeitadas");

const browser = await chromium.launch({ channel: "msedge", headless: true });
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const requests = [];
  const errors = [];
  page.on("request", (request) => requests.push({ url: request.url(), method: request.method(), body: request.postData() }));
  page.on("pageerror", (error) => errors.push(error.message));
  const response = await page.goto(base, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  const headers = response.headers();
  assert.match(headers["content-security-policy"], /connect-src 'self';/);
  assert.match(headers["content-security-policy"], /form-action 'none'/);
  assert.doesNotMatch(headers["content-security-policy"], /unsafe-eval/);
  assert.equal(headers["referrer-policy"], "no-referrer");
  assert.equal(headers["x-frame-options"], "DENY");
  assert.equal(headers["set-cookie"], undefined);
  assert.deepEqual(await context.cookies(), []);
  assert.equal(await page.evaluate(() => localStorage.length), 0);
  assert.equal(await page.getByRole("region", { name: "Aviso de cookies" }).isVisible(), true);
  await page.screenshot({ path: fileURLToPath(new URL("desktop-banner.png", output)) });
  pass("Primeira visita sem cookies, armazenamento ou requisições opcionais; cabeçalhos presentes");
  await page.getByRole("button", { name: "Recusar opcionais", exact: true }).click();
  assert.equal(await page.getByRole("region", { name: "Aviso de cookies" }).count(), 0);
  await page.reload({ waitUntil: "networkidle" });
  assert.equal(await page.getByRole("region", { name: "Aviso de cookies" }).count(), 0);
  pass("Recusa persistida após recarregar");

  await page.locator("footer").getByRole("link", { name: "Gerenciar Cookies", exact: true }).click();
  await page.getByRole("button", { name: "Aceitar todos", exact: true }).click();
  let saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), CONSENT_KEY);
  assert.equal(saved.action, "all");
  assert.equal(saved.optional, false);
  const second = await context.newPage();
  await second.goto(`${base}/gerenciar-cookies`);
  await page.getByRole("button", { name: "Recusar opcionais", exact: true }).click();
  await second.getByText("Escolha atual: Recusar opcionais.", { exact: true }).waitFor();
  await page.getByRole("button", { name: "Salvar preferências", exact: true }).click();
  saved = await page.evaluate((key) => JSON.parse(localStorage.getItem(key)), CONSENT_KEY);
  assert.equal(saved.action, "custom");
  assert.equal(saved.optional, false);
  pass("Aceite, personalização, substituição/revogação e sincronização entre abas");

  for (const route of ["/politica-de-privacidade", "/politica-de-cookies", "/termos-de-uso", "/direitos-lgpd", "/gerenciar-cookies", "/cadastro"]) {
    const result = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    assert.equal(result.status(), 200);
    assert.equal(await page.locator("main").count(), 1);
    assert.equal(await page.locator("footer").count(), 1);
    for (const name of ["Política de Privacidade", "Política de Cookies", "Termos de Uso", "Gerenciar Cookies", "Direitos e canal LGPD"]) {
      assert.equal(await page.locator("footer").getByRole("link", { name, exact: true }).count(), 1);
    }
  }
  pass("Todas as rotas e links do rodapé respondem com estrutura semântica única");

  const send = page.getByRole("button", { name: "Enviar pedido de atendimento", exact: true });
  await send.click();
  assert.equal(await page.getByLabel("Nome", { exact: true }).evaluate((element) => document.activeElement === element), true);
  assert.equal(requests.some((item) => item.method === "POST"), false);
  const sentinel = '<img src=x onerror="window.__injected=true">';
  await page.getByLabel("Nome", { exact: true }).fill(sentinel);
  await page.getByLabel("E-mail", { exact: true }).fill("teste@example.com");
  await page.getByLabel("Descreva sua necessidade").fill("Necessidade de teste sem dados reais de clientes.");
  await page.locator('select[name="service"]').selectOption({ label: "Educação ambiental" });
  const submitted = [];
  await page.route("**/api/atendimento", async (route) => {
    const body = route.request().postDataJSON();
    submitted.push(body);
    await route.fulfill({ status: submitted.length === 1 ? 503 : 200, contentType: "application/json", body: JSON.stringify(submitted.length === 1 ? { ok: false, message: "Envio indisponível no teste." } : { ok: true, reference: body.reference }) });
  });
  await send.click();
  await page.getByRole("alert").filter({ hasText: "Envio indisponível" }).waitFor();
  assert.equal(await page.getByLabel("Nome", { exact: true }).inputValue(), sentinel);
  assert.equal(await page.evaluate(() => window.__injected), undefined);
  pass("Obrigatoriedade e foco de erro; falha de envio simulada mantém os campos sem executar HTML");
  await send.click();
  await page.getByRole("heading", { name: "Pedido encaminhado", exact: true }).waitFor();
  assert.equal(submitted.length, 2);
  assert.equal(submitted[0].reference, submitted[1].reference);
  assert.equal(await page.locator("form").count(), 0);
  assert.equal(await page.evaluate(() => sessionStorage.length), 0);
  assert.equal(await page.evaluate(() => localStorage.length), 1);
  await page.getByRole("button", { name: "Enviar outro pedido", exact: true }).click();
  assert.equal(await page.getByLabel("Nome", { exact: true }).inputValue(), "");
  await page.getByLabel("Cidade e estado").fill("Cidade teste/ZZ");
  await page.getByRole("button", { name: "Limpar formulário", exact: true }).click();
  assert.equal(await page.getByLabel("Cidade e estado").inputValue(), "");
  assert.equal(requests.filter((item) => item.method === "POST").length, 2);
  pass("Aceitação simulada exige ação do visitante, repetição conserva referência e limpeza remove campos");
  await page.unroute("**/api/atendimento");
  await page.getByLabel("Cidade e estado").fill("Retorno/ZZ");
  await page.goto(`${base}/termos-de-uso`);
  await page.goBack({ waitUntil: "networkidle" });
  assert.equal(await page.getByLabel("Cidade e estado").inputValue(), "");
  pass("Saída e retorno à página limpam o formulário; nenhuma entrega real de e-mail foi executada");

  await page.evaluate((key) => localStorage.setItem(key, '{"version":999}'), CONSENT_KEY);
  await page.goto(base);
  await page.getByRole("region", { name: "Aviso de cookies" }).waitFor();
  await page.getByRole("link", { name: "Personalizar", exact: true }).click();
  await page.getByRole("button", { name: "Salvar preferências", exact: true }).waitFor();
  const accept = page.getByRole("button", { name: "Aceitar todos", exact: true });
  await accept.focus();
  await page.keyboard.press("Tab");
  assert.equal(await page.getByRole("button", { name: "Recusar opcionais", exact: true }).evaluate((element) => document.activeElement === element), true);
  await page.keyboard.press("Enter");
  assert.equal(await page.evaluate((key) => JSON.parse(localStorage.getItem(key)).action, CONSENT_KEY), "necessary");
  pass("Versão inválida reabre aviso e Personalizar abre gerenciamento sem consentir");

  await page.evaluate((key) => localStorage.removeItem(key), CONSENT_KEY);

  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of ["/", "/gerenciar-cookies", "/politica-de-privacidade", "/politica-de-cookies", "/termos-de-uso", "/direitos-lgpd", "/cadastro"]) {
    await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, route);
    if (route === "/" || route === "/gerenciar-cookies") await page.screenshot({ path: fileURLToPath(new URL(route === "/" ? "mobile-banner.png" : "mobile-manager.png", output)) });
  }
  pass("Sem rolagem horizontal nas sete rotas a 390px");
  assert.deepEqual(requests.filter((request) => new URL(request.url).origin !== new URL(base).origin), []);
  assert.deepEqual(errors, []);
  pass("Nenhuma requisição externa automática nem erro JavaScript em todos os estados testados");

  const blocked = await browser.newContext();
  await blocked.addInitScript(() => {
    Object.defineProperty(Storage.prototype, "setItem", { value() { throw new DOMException("Blocked", "SecurityError"); } });
    Object.defineProperty(Storage.prototype, "getItem", { value() { throw new DOMException("Blocked", "SecurityError"); } });
  });
  const blockedPage = await blocked.newPage();
  await blockedPage.goto(base);
  await blockedPage.getByRole("button", { name: "Recusar opcionais", exact: true }).click();
  await blockedPage.getByRole("status").filter({ hasText: "O navegador bloqueou" }).waitFor();
  await blockedPage.reload();
  await blockedPage.getByRole("region", { name: "Aviso de cookies" }).waitFor();
  pass("Armazenamento bloqueado gera aviso e fallback em memória");

  const nojs = await browser.newContext({ javaScriptEnabled: false });
  const nojsPage = await nojs.newPage();
  await nojsPage.goto(`${base}/cadastro`);
  assert.equal(await nojsPage.getByLabel("Cidade e estado").isDisabled(), true);
  assert.equal(await nojsPage.getByRole("button", { name: "Enviar pedido de atendimento", exact: true }).isDisabled(), true);
  assert.equal(await nojsPage.getByRole("region", { name: "Aviso de cookies" }).isVisible(), false);
  pass("Sem JavaScript: campos e envio desabilitados; aviso de cookies não obstrui a página");

  await writeFile(new URL("results.json", output), JSON.stringify({ testedAt: new Date().toISOString(), base, browser: "Microsoft Edge headless", checks, automaticExternalRequests: 0, pageErrors: errors }, null, 2));
} finally { await browser.close(); }
