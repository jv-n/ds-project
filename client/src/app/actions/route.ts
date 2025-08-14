// client/src/app/api/actions/route.ts
import { NextResponse } from "next/server";

const BACKEND = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3001";

// se sua API do servidor é /actions (pelo curl que você mostrou):
const buildUrl = (sp: URLSearchParams) =>
  `${BACKEND}/actions${sp.toString() ? "?" + sp.toString() : ""}`;

// (se fosse /api/actions, trocaria a linha acima)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const endpoint = buildUrl(searchParams);

  try {
    const resp = await fetch(endpoint, {
      headers: { "Content-Type": "application/json" },
    });
    const json = await resp.json();

    // <<< AQUI está o pulo do gato: desembrulhar
    const actions = Array.isArray(json)
      ? json[0]?.actions ?? []
      : json.actions ?? [];

    if (!resp.ok) {
      return new NextResponse(
        JSON.stringify({ error: "Backend error", actions }),
        { status: resp.status }
      );
    }
    return NextResponse.json(actions); // devolve só o array de ações
  } catch (e: any) {
    return new NextResponse(e?.message ?? "Proxy error", { status: 500 });
  }
}
