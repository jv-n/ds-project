import nodemailer from 'nodemailer';

const template = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8" />
<title>Doação Aprovada - Selo de Responsa</title>
<style>
  body { font-family: Arial, sans-serif; background-color: #f4f6f8; color: #333; }
  .container { max-width: 600px; margin: auto; background: #fff; padding: 20px; border-radius: 8px; }
  .header { background-color:rgb(50, 86, 185); padding: 15px; text-align: center; color: white; border-radius: 8px 8px 0 0; }
  .content { padding: 20px; }
  .footer { margin-top: 20px; font-size: 12px; color: #777; text-align: center; }
  .button { display: inline-block; padding: 10px 15px; background-color:rgb(0, 90, 150); color: white; text-decoration: none; border-radius: 5px; }
</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Selo de Responsa</h2>
    </div>
    <div class="content">
      <p>Olá <strong>Empresa Teste</strong>,</p>
      <p>Gostariamos de notificar que a sua doação foi <strong>APROVADA</strong> no Sistema Selo de Responsa.</p>
      <p><strong>Descrição da doação:</strong> Apoio financeiro </p>
      <p><strong>Destino:</strong> ONG Crianças de Recife</p>
      <p><strong>Data prevista de entrega:</strong> 08/08/2025</p>
      <p><strong>Contato técnico:</strong> 81 99999-9999</p>
      <p>Obrigado pela sua contribuição para a nossa cidade!</p>
    </div>
    <div class="footer">
      <p>Prefeitura do Recife - Projeto Selo de Responsa</p>
      <p>Contato: seloderesponsa@gmail.com </p>
    </div>
  </div>
</body>
</html>
`;

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seloderesponsa@gmail.com',         // seu e-mail
    pass: 'twcm ygno tvuo etra',       // app password (não a senha do Gmail)
  },
});

export const sendEmail = async (to: string, subject: string) => {
  try {
    const info = await transporter.sendMail({
      from: '"Sistema Selo de Responsa" <seloderesponsa@gmail.com>',
      to,
      subject,
      html: template,
    });

    console.log('Email enviado: %s', info.messageId);
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    throw error;
  }
};
