import { z } from 'zod';

export const Donation = z.object({
  valor: z.coerce.number(), 
  tipoAjuda: z.string(),
  empresaId: z.coerce.number(), 
  ongId: z.coerce.number(),
  acaoId: z.coerce.number(),
  prefeituraId: z.coerce.number().optional(),
});

export const UpdateDonation = Donation.partial();