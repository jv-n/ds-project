import { z } from 'zod';

export const Company = z.object({
    nome: z.string({ required_error: "nome é obrigatório", invalid_type_error: "nome deve ser uma string" }).min(2).max(100),
    usuarioId: z.number({ required_error: "usuarioId é obrigatório", invalid_type_error: "usuarioId deve ser um número" }).min(1),
    pontos: z.number({ invalid_type_error: "pontos deve ser um número" }).min(0).optional(),
    selo_nivel: z.string({ invalid_type_error: "selo_nivel deve ser uma string" }).min(2).max(100).optional(),
    numColaboradores: z.number({ invalid_type_error: "numColaboradores deve ser um número", required_error: "numColaboradores é obrigatório" }).min(1, { message: "Empresa deve ter pelo menos 1 colaborador" }),
    odsId: z.array(z.number({ invalid_type_error: "odsId deve ser um número", required_error: "odsId é obrigatório" })).min(1)
});

export const Company_Update = Company.partial()

