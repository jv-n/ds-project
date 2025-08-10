import { z } from 'zod';
export const Login = z.object({
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

});

export const LoginCnpj = z.object({
  cnpj: z
    .string({
      invalid_type_error: 'O CNPJ deve ser uma string',
      required_error: 'O CNPJ é obrigatório',
    })
    .regex(/^\d{14}$/, { message: 'O CNPJ deve conter exatamente 14 dígitos numéricos.' }), 

  senha: z
    .string({ 
      invalid_type_error: 'A senha deve ser uma string',
      required_error: 'A senha é obrigatória',
    })
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' }),

});

export const UpdateLogin = Login.partial();
export const UpdateLoginCompany = LoginCnpj.partial();