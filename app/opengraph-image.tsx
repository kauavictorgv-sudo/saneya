import { ImageResponse } from "next/og";

export const alt = "Saneyá — Saneamento que transforma comunidades";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background: "#FCF7F1",
        color: "#003785",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        padding: "72px 78px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 760,
        }}
      >
        <div
          style={{
            color: "#1465BB",
            display: "flex",
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: 4,
          }}
        >
          SANEYÁ AMBIENTAL
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: -4,
            lineHeight: 1.02,
            marginTop: 30,
          }}
        >
          Saneamento que transforma comunidades.
        </div>
        <div
          style={{
            color: "#003785",
            display: "flex",
            fontSize: 28,
            lineHeight: 1.45,
            marginTop: 28,
          }}
        >
          Tecnologia social, participação comunitária e acompanhamento.
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          background: "#1465BB",
          borderRadius: 120,
          display: "flex",
          height: 240,
          justifyContent: "center",
          marginLeft: 40,
          position: "relative",
          width: 240,
        }}
      >
        <div
          style={{
            border: "4px solid #FCF7F1",
            borderRadius: 90,
            display: "flex",
            height: 180,
            position: "absolute",
            width: 180,
          }}
        />
        <div
          style={{
            color: "#FCF7F1",
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 2,
          }}
        >
          S
        </div>
      </div>
    </div>,
    size,
  );
}
