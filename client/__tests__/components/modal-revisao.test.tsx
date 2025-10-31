import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import ModalRevisao from 'src/components/modal-revisao';

// Mocks leves para dependências visuais
vi.mock('lucide-react', () => ({
  X: (p: any) => <svg data-testid="icon-x" {...p} />,
  File: (p: any) => <svg data-testid="icon-file" {...p} />,
  Download: (p: any) => <svg data-testid="icon-download" {...p} />,
  CheckCircle2: (p: any) => <svg data-testid="icon-check" {...p} />,
  XCircle: (p: any) => <svg data-testid="icon-xcircle" {...p} />,
}));
vi.mock('@/components/button', () => ({
  default: (props: any) => {
    const { children, onClick, ...rest } = props;
    return (
      <button onClick={onClick} {...rest}>
        {children}
      </button>
    );
  },
}));
vi.mock('@/components/chip-status', () => ({
  default: (props: any) => <span data-testid="chip-status">{props.status}</span>,
}));

// Harness para controlar isOpen e observar onClose
function Harness({
  initialOpen = true,
  auditoria,
  onClose = vi.fn(),
}: {
  initialOpen?: boolean;
  auditoria: any;
  onClose?: () => void;
}) {
  const [isOpen, setIsOpen] = React.useState(initialOpen);
  return (
    <>
      <ModalRevisao
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          onClose();
        }}
        auditoria={auditoria}
      />
      {/* marcador para assert do fechamento */}
      <div data-testid="open-state">{String(isOpen)}</div>
    </>
  );
}

// Auditoria base
const baseAuditoria = {
  status: 'aguardando', // 'aguardando' | 'aprovada' | 'reprovada'
  dataDoacao: '2025-08-15T12:00:00.000Z',
  nomeEmpresa: 'Acme Ltda',
  emailEmpresa: 'contato@acme.com',
  nomeONG: 'ONG Esperança',
  tipoDoacao: 'Financeira',
  valorDoacao: 'R$ 10.000',
  acao: 'Campanha de Inverno',
  documentos: [
    {
      id: '1',
      nome: 'comprovante.pdf',
      tipo: 'Comprovante',
      dataEnvio: '2025-08-14T15:00:00.000Z',
      url: 'https://exemplo.com/comprovante.pdf',
    },
    {
      id: '2',
      nome: 'recibo.pdf',
      tipo: 'Recibo',
      dataEnvio: '2025-08-14T16:00:00.000Z',
      url: 'https://exemplo.com/recibo.pdf',
    },
  ],
  motivoReprovacao: '',
};

describe('<ModalRevisao />', () => {
  it('C1: quando aberto, exibe os documentos disponíveis', async () => {
    render(<Harness auditoria={baseAuditoria} />);

    // Título do modal
    expect(screen.getByText(/Revisão de Documentos/i)).toBeInTheDocument();

    // Cabeçalho com contagem
    expect(
      screen.getByText(/Documentos Anexados \(2\)/i)
    ).toBeInTheDocument();

    // Cada documento listado
    expect(screen.getByText('comprovante.pdf')).toBeInTheDocument();
    expect(screen.getByText(/Comprovante/i)).toBeInTheDocument();
    expect(screen.getByText('recibo.pdf')).toBeInTheDocument();
    expect(screen.getByText(/Recibo/i)).toBeInTheDocument();

    // Botões/links de download existem e possuem atributos corretos
    const links = screen.getAllByRole('link', { name: /Baixar/i });
    expect(links).toHaveLength(2);
    for (const a of links) {
      expect(a).toHaveAttribute('href');
      expect(a).toHaveAttribute('download');
      expect(a).toHaveAttribute('target', '_blank');
      expect(a).toHaveAttribute('rel', expect.stringMatching(/noopener/));
    }
  });

  it('C2: documentação segmentada por empresa (detalhes mostram Empresa/Email/ONG corretos)', () => {
    render(<Harness auditoria={baseAuditoria} />);
    expect(screen.getByText(/Empresa:/i)).toBeInTheDocument();
    expect(screen.getByText('Acme Ltda')).toBeInTheDocument();
    expect(screen.getByText(/Email:/i)).toBeInTheDocument();
    expect(screen.getByText('contato@acme.com')).toBeInTheDocument();
    expect(screen.getByText(/ONG Beneficiada:/i)).toBeInTheDocument();
    expect(screen.getByText('ONG Esperança')).toBeInTheDocument();
  });

  it('C3: aprovar fecha o modal (onClose chamado e isOpen=false)', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness auditoria={baseAuditoria} onClose={onClose} />);

    const approveBtn = screen.getByRole('button', { name: /Aprovar e notificar/i });
    await user.click(approveBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('open-state')).toHaveTextContent('false');
    expect(screen.queryByText(/Revisão de Documentos/i)).not.toBeInTheDocument();
  });

  it('C4: reprovar requer justificar — campo aparece, digitamos motivo e então fecha ao notificar', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Harness auditoria={baseAuditoria} onClose={onClose} />);

    // Entrar em modo de reprovação
    const reprovarBtn = screen.getByRole('button', { name: /Reprovar$/i });
    await user.click(reprovarBtn);

    // Campo de motivo aparece
    const motivoLabel = screen.getByLabelText(/Motivo da Reprovação/i);
    await user.type(motivoLabel, 'Documentos ilegíveis');

    // Reprovar e notificar
    const reprovarConfirmBtn = screen.getByRole('button', { name: /Reprovar e notificar/i });
    await user.click(reprovarConfirmBtn);

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByTestId('open-state')).toHaveTextContent('false');
  });

  it('C5: links de download possuem os atributos obrigatórios', () => {
    render(<Harness auditoria={baseAuditoria} />);
    const a = screen.getByRole('link', { name: /Baixar/i }) as HTMLAnchorElement;
    expect(a.download).toBeTruthy();
    expect(a.target).toBe('_blank');
    expect(a.rel).toContain('noopener');
    expect(a.href).toMatch(/^https?:\/\//);
  });

  it('Fluxo de status "reprovada" exibe banner com motivo (quando houver) e documentos', () => {
    const auditoriaReprovada = {
      ...baseAuditoria,
      status: 'reprovada',
      motivoReprovacao: 'Notas fiscais inconsistentes',
    };
    render(<Harness auditoria={auditoriaReprovada} />);
    expect(screen.getByText(/Motivo da Reprovação/i)).toBeInTheDocument();
    expect(screen.getByText(/Notas fiscais inconsistentes/i)).toBeInTheDocument();
    expect(screen.getByText(/Documentos Anexados/i)).toBeInTheDocument();
  });
});
