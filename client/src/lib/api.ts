// client/src/lib/api.ts
// Centraliza a base da API e utilitário de POST em JSON.

const API_URL = (
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:3001"
).replace(/\/$/, ""); // remove barra final, se houver

export async function postJSON<T = unknown>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`POST ${path} -> ${res.status} ${res.statusText}\n${text}`);
  }

  try {
    return (await res.json()) as T;
  } catch {
    // Se o endpoint retornar 204/empty body
    return {} as T;
  }
}
