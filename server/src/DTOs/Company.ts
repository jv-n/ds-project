import { z } from 'zod';

export const Company = z.object({
    nome: z.string({ required_error: "nome é obrigatório", invalid_type_error: "nome deve ser uma string" }).min(2).max(100),
    usuarioId: z.number({ required_error: "usuarioId é obrigatório", invalid_type_error: "usuarioId deve ser um número" }).min(1),
    pontos: z.number({ invalid_type_error: "pontos deve ser um número" }).min(0).optional(),
    selo_nivel: z.string({ invalid_type_error: "selo_nivel deve ser uma string" }).min(2).max(100).optional(),
});

export const Company_Update = Company.partial()

