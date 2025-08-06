// server/src/DTOs.ts (Exemplo de como deve ser o seu arquivo DTO)
import { z } from 'zod';
import { StatusApoio } from '@prisma/client'; // Ou o caminho correto para o seu StatusApoio

export const Donation = z.object({
  data: z.string().datetime(), // Ou z.string() se você parsear a data depois
  valor: z.coerce.number(), // <--- MUDANÇA AQUI: Coage string para número
  tipoAjuda: z.string(),
  documentacao: z.string(),
  empresaId: z.coerce.number(), // <--- MUDANÇA AQUI: Coage string para número
  ongId: z.coerce.number(),     // <--- MUDANÇA AQUI: Coage string para número
  acaoId: z.coerce.number(),    // <--- MUDANÇA AQUI: Coage string para número
  prefeituraId: z.coerce.number().optional(),
  status: z.nativeEnum(StatusApoio).default(StatusApoio.CONTATO_INICIAL),
});

export type Donation = z.infer<typeof Donation>;

export const UpdateDonation = Donation.partial();
export type UpdateDonation = z.infer<typeof UpdateDonation>;