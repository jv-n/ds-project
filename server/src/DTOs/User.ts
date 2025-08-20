import { z } from 'zod';

export const User = z.object({
  cnpj: z
    .string({
      invalid_type_error: 'O CNPJ deve ser uma string',
      required_error: 'O CNPJ é obrigatório',
    })
    .regex(/^\d{14}$/, { message: 'O CNPJ deve ter 14 dígitos' }),
  email: z
    .string({
      invalid_type_error: 'O email deve ser uma string',
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Endereço de email inválido' }),
  senha: z
    .string({ invalid_type_error: 'A senha deve ser uma string' })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' }),
  telefone: z
    .string({ invalid_type_error: 'O número de telefone deve ser uma string' })
    .regex(/^\+?[0-9]+$/, {
      message: 'O número de telefone deve conter apenas números',
    })
    .optional(),
});

export const UpdateUser = User.partial();
