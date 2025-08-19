// ...existing code...
import { postJSON } from "@/lib/api";

export type LinkActionCompanyInput = {
  actionId: number | string;
  companyId: number | string;
  nome?: string;
  descricao?: string;
  nomeOng?: string;
  emailOng?: string;
  telefoneOng?: string;
  odsAcao?: number[];
};

const ACTION_COMPANY_ENDPOINT = "/actions";

export async function linkActionToCompany(input: LinkActionCompanyInput) {
  const acaoId = Number(input.actionId);
  const empresaId = Number(input.companyId);

  return postJSON(ACTION_COMPANY_ENDPOINT, {
    // campos que o backend valida (português)
    nome: input.nome ?? "",
    descricao: input.descricao ?? "",
    nomeOng: input.nomeOng ?? "",
    emailOng: input.emailOng ?? "",
    telefoneOng: input.telefoneOng ?? "",
    acaoId,
    empresaId,
    odsAcao: input.odsAcao ?? [],

    // aliases para compatibilidade (snake_case / camelCase)
    action_id: acaoId,
    company_id: empresaId,
    actionId: acaoId,
    companyId: empresaId,
  });
}
// ...existing code...
