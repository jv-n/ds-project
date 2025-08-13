import { z } from 'zod';

// Schema para a CRIAÇÃO de um usuário
export const User = z.object({
  cnpj: z
    .string({
      invalid_type_error: 'O CNPJ deve ser uma string',
      required_error: 'O CNPJ é obrigatório',
    })
    .regex(/^\d{14}$/, { message: 'O CNPJ deve conter exatamente 14 dígitos numéricos.' }), 


  email: z
    .string({
      invalid_type_error: 'O email deve ser uma string',
      required_error: 'O email é obrigatório',
    })
    .email({ message: 'Endereço de email inválido' }),
  
  senha: z
    .string({ 
      invalid_type_error: 'A senha deve ser uma string',
      required_error: 'A senha é obrigatória',
    })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),

  telefone: z
    .string({ invalid_type_error: 'O número de telefone deve ser uma string' })
    .regex(/^\d{10,11}$/, { 
      message: 'O número de telefone deve conter 10 ou 11 dígitos numéricos.',
    })
    .optional(),
});

export const UpdateUser = User.partial();