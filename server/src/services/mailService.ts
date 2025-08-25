// eslint-disable-next-line import/no-extraneous-dependencies
import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'; // Certifique-se de que o caminho está correto

dotenv.config();

interface DonationEmailData {
  empresaNome: string;
  status: string; // aprovado, reprovado, pendente
  descricao: string;
  tipo: string;
  data: string; // formatada como string (ex: 10/08/2025)
  valor: number;
  nomeOng: string;
  emailOng: string;
  telefoneOng: string;
}

type EmailParams = {
  to: string;
  subject: string;
  text: string;
};

export function generateDonationEmailTemplate(data: DonationEmailData): string {
  let statusColor: string;
  if (data.status === 'Aprovada') {
    statusColor = '#4CAF50';
  } else if (data.status === 'Reprovada') {
    statusColor = '#F44336';
  } else {
    statusColor = '#FF9800'; // laranja para pendente ou outros
  }

  return `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>Status da Doação - Selo de Responsa</title>
<style>
  body { font-family: Arial, sans-serif; background-color: #f4f6f8; color: #333; }
  .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; }
  .header { background-color: #009FE3; padding: 15px; text-align: center; color: white; border-radius: 8px 8px 0 0; }
  .content { padding: 20px; }
  .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
  .status { font-weight: bold; color: ${statusColor}; }
  .button { display: inline-block; padding: 10px 15px; background-color: rgb(0, 90, 150); color: white; text-decoration: none; border-radius: 5px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Selo de Responsa</h2>
    </div>
    <div class="content">
      <p>Olá <strong>${data.empresaNome}</strong>,</p>
      <p>Gostaríamos de informar que a sua doação cadastrada no Sistema Selo de Responsa foi <span class="status">${data.status.toUpperCase()}</span>.</p>
      <p>Confira os detalhes da doação:</p>
      <p><strong>Descrição da doação:</strong> ${data.descricao}</p>
      <p><strong>Tipo:</strong> ${data.tipo}</p>
      <p><strong>Valor:</strong> R$ ${data.valor.toFixed(2).replace('.', ',')}</p>
      <p><strong>Data da doação:</strong> ${data.data}</p>
      <p><strong>Destino:</strong> ${data.nomeOng}</p>
      <p><strong>Contato da ONG:</strong> ${data.emailOng} | ${data.telefoneOng}</p>
      <p>Agradecemos pela sua contribuição!</p>
      <p>Para mais informações, acesse o <a href="https://www.seloderesponsa.com.br" class="button">Sistema Selo de Responsa</a>.</p>
    </div>
    <div class="footer">
      <p>Prefeitura do Recife - Sistema Selo de Responsa</p>
      <p>Contato: seloderesponsa@gmail.com</p>
    </div>
  </div>
</body>
</html>
  `;
}


export const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE, // Gmail, Outlook, etc.
  auth: {
    user: process.env.EMAIL_ADDRESS,         // seu e-mail
    pass: process.env.EMAIL_PASSWORD       // app password (não a senha do Gmail)
  },
});

export const sendEmail = async (to: string, subject: string, data: DonationEmailData) => {
  try {
    const info = await transporter.sendMail({
      from: '"Sistema Selo de Responsa" <seloderesponsa@gmail.com>',
      to,
      subject,
      html: generateDonationEmailTemplate(data),
    });

    console.log('Email enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};

function env(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value;
}

export async function restartEmail({ to, subject, text }: EmailParams): Promise<void> {
  try {
    const info = await transporter.sendMail({
      from: '"Sistema Selo de Responsa" <seloderesponsa@gmail.com>',
      to,
      subject,
      text,
    });

    console.log('Email enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
}
