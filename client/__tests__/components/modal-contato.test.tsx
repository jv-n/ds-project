// src/components/Modalcontatos/__tests__/Modalcontatos.test.tsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modalcontatos, { type propspopup } from 'src/components/modal-contato';

// Mock de next/image -> vira <img />
vi.mock('next/image', () => ({
  default: (props: any) => {
    const { src, alt, ...rest } = props || {};
    return <img src={typeof src === 'string' ? src : '/test.png'} alt={alt} {...rest} />;
  },
}));

// Mock dos assets
vi.mock('@/assets', () => ({
  balao: '/balao.png',
  balaopopup: '/balaopopup.png',
  confirma: '/confirma.png',
  emailpopup: '/emailpopup.png',
}));

const makeProps = (override: Partial<propspopup> = {}): propspopup => ({
  nomedaong: 'ONG Exemplo',
  nomeacao: 'Ação de Mutirão',
  emailong: 'contato@ong.org',
  numeroong: '(81) 99999-9999',
  onEntrarContato: vi.fn(),
  ...override,
});

beforeEach(() => {
  // Garante que window.open exista e possamos inspecionar chamadas
  vi.spyOn(window, 'open').mockImplementation(() => null);
});

describe('<Modalcontatos />', () => {
  it('C1: exibe e-mail e WhatsApp quando aberto', () => {
    const props = makeProps();
    render(<Modalcontatos {...props} />);

    // E-mail visível
    expect(screen.getByText(props.emailong)).toBeInTheDocument();

    // WhatsApp visível
    expect(screen.getByText(props.numeroong)).toBeInTheDocument();

    // Títulos/labels auxiliares
    expect(screen.getByRole('dialog', { name: /entrar em contato/i })).toBeInTheDocument();
    expect(screen.getByText(/enviar e-mail/i)).toBeInTheDocument();
    expect(screen.getByText(/enviar whatsapp/i)).toBeInTheDocument();
  });

  it('C2: clicar em "Cancelar" fecha o modal (chama onEntrarContato)', async () => {
    const user = userEvent.setup();
    const props = makeProps();
    render(<Modalcontatos {...props} />);

    const cancelar = screen.getByRole('button', { name: /cancelar/i });
    await user.click(cancelar);

    expect(props.onEntrarContato).toHaveBeenCalledTimes(1);
  });

  it('C3: elementos clicáveis exibem cursor-pointer (Cancelar, E-mail, WhatsApp)', () => {
    const props = makeProps();
    render(<Modalcontatos {...props} />);

    const cancelar = screen.getByRole('button', { name: /cancelar/i });
    expect(cancelar).toHaveClass('cursor-pointer');

    // O bloco de e-mail é um div com role="button"
    const emailBtn = screen.getByRole('button', { name: /enviar e-mail/i });
    expect(emailBtn).toHaveClass('cursor-pointer');
    expect(emailBtn).not.toHaveClass('pointer-events-none');

    // O WhatsApp é um <a>
    const wa = screen.getByTitle(/abrir whatsapp/i);
    expect(wa).toHaveClass('cursor-pointer');
    expect(wa).not.toHaveClass('pointer-events-none');
  });

  it('C4: e-mail desabilitado quando emailong é vazio (sem cursor-pointer e sem ação)', async () => {
    const user = userEvent.setup();
    const props = makeProps({ emailong: '' });
    render(<Modalcontatos {...props} />);

    const emailBtn = screen.getByRole('button', { name: /enviar e-mail/i });
    expect(emailBtn).toHaveClass('pointer-events-none', 'opacity-60');
    expect(emailBtn).not.toHaveClass('cursor-pointer');

    // Clique não deve abrir janela
    await user.click(emailBtn);
    expect(window.open).not.toHaveBeenCalled();
  });

  it('C4: WhatsApp desabilitado quando numeroong é vazio/ inválido (sem cursor-pointer)', () => {
    const props = makeProps({ numeroong: '' });
    render(<Modalcontatos {...props} />);

    const wa = screen.getByTitle(/whatsapp indisponível/i);
    expect(wa).toHaveClass('pointer-events-none', 'opacity-60');
    expect(wa).not.toHaveClass('cursor-pointer');

    // href vira "#"
    expect((wa as HTMLAnchorElement).getAttribute('href')).toBe('#');
  });

  it('C5: fechar ao clicar no backdrop', async () => {
    const user = userEvent.setup();
    const props = makeProps();
    render(<Modalcontatos {...props} />);

    // Backdrop é o elemento com bg-black/40 cobrindo a tela; não tem role, pegamos por title do WhatsApp e subimos
    const wa = screen.getByTitle(/abrir whatsapp/i);
    const backdrop = wa.closest('[role="dialog"]')?.previousElementSibling as HTMLElement;
    expect(backdrop).toBeTruthy();

    await user.click(backdrop!);
    expect(props.onEntrarContato).toHaveBeenCalledTimes(1);
  });

  it('C5: fechar ao pressionar tecla Escape', () => {
    const props = makeProps();
    render(<Modalcontatos {...props} />);

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(props.onEntrarContato).toHaveBeenCalledTimes(1);
  });

  it('C6: link do WhatsApp contém DDI 55 e apenas dígitos', () => {
    const props = makeProps({ numeroong: '(11) 91234-5678' });
    render(<Modalcontatos {...props} />);

    const wa = screen.getByTitle(/abrir whatsapp/i) as HTMLAnchorElement;
    expect(wa.href).toMatch(/wa\.me\/5511912345678/);
    expect(wa.href).toMatch(/text=/); // texto pré-preenchido presente
  });

  it('abrir Gmail: clica no bloco de e-mail quando habilitado', async () => {
    const user = userEvent.setup();
    const props = makeProps();
    render(<Modalcontatos {...props} />);

    const emailBtn = screen.getByRole('button', { name: /enviar e-mail/i });
    await user.click(emailBtn);

    expect(window.open).toHaveBeenCalledTimes(1);
    const [href, target, features] = (window.open as any).mock.calls[0];
    expect(String(href)).toMatch(/mail\.google\.com\/mail\/\?view=cm/);
    expect(target).toBe('_blank');
    expect(features).toContain('noopener');
  });
});
