import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import CadastroDoacao from 'src/components/formulario-doacao';

/** Mocks dos filhos para testes controlados */
// Mock do FloatingInput: se receber `options`, vira <select>, senão <input>
vi.mock('../components/FloatingInput', () => ({
  default: (props: any) => {
    const { label, value, onChange, options, error } = props;
    const id = label.replace(/\W+/g, '-').toLowerCase();
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        {Array.isArray(options) ? (
          <select
            id={id}
            aria-label={label}
            value={value}
            onChange={(e) => onChange((e.target as HTMLSelectElement).value)}
          >
            <option value=""></option>
            {options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            id={id}
            aria-label={label}
            value={value}
            onChange={(e) => onChange((e.target as HTMLInputElement).value)}
          />
        )}
        {error ? <div role="alert">{error}</div> : null}
      </div>
    );
  },
}));

// Mock do FileUploadInput: input type="file" que chama onFilesAttached no change
vi.mock('../file-uploader', () => ({
  default: (props: any) => {
    const { label, onFilesAttached, forceErrorMessage } = props;
    const id = label.replace(/\W+/g, '-').toLowerCase();
    return (
      <div>
        <label htmlFor={id}>{label}</label>
        <input
          id={id}
          aria-label={label}
          type="file"
          multiple
          onChange={(e) => onFilesAttached(Array.from((e.target as HTMLInputElement).files ?? []))}
        />
        {forceErrorMessage ? <div role="alert">{forceErrorMessage}</div> : null}
      </div>
    );
  },
}));

const makeProps = (override: Partial<React.ComponentProps<typeof CadastroDoacao>> = {}) => ({
  onClose: vi.fn(),
  ongName: 'ONG Esperança',
  actionName: 'Campanha de Inverno',
  onSubmitDonation: vi.fn(),
  ...override,
});

describe('<CadastroDoacao />', () => {
  it('exibe o nome da ONG e da ação', () => {
    const props = makeProps();
    render(<CadastroDoacao {...props} />);
    expect(screen.getByText(/ONG Esperança/i)).toBeInTheDocument();
    expect(screen.getByText(/Ação:\s*Campanha de Inverno/i)).toBeInTheDocument();
  });

  it('fecha ao clicar no botão X (chama onClose)', async () => {
    const user = userEvent.setup();
    const props = makeProps();
    render(<CadastroDoacao {...props} />);

    // Existem dois botões principais: o "X" (sem type) e o submit (type="submit")
    const buttons = screen.getAllByRole('button');
    const closeBtn = buttons.find((b) => (b as HTMLButtonElement).type !== 'submit')!;
    await user.click(closeBtn);
    expect(props.onClose).toHaveBeenCalledTimes(1);
  });

  it('seleciona apenas um tipo de doação (dropdown controlado)', async () => {
    const user = userEvent.setup();
    render(<CadastroDoacao {...makeProps()} />);

    const select = screen.getByLabelText(/Tipo de doação\*/i) as HTMLSelectElement;
    await user.selectOptions(select, 'Dinheiro');
    expect(select.value).toBe('Dinheiro');

    // Selecionar outra substitui o valor (não acumula múltiplos)
    await user.selectOptions(select, 'Serviço');
    expect(select.value).toBe('Serviço');
  });

  it('permite digitar o valor/quantidade', async () => {
    const user = userEvent.setup();
    render(<CadastroDoacao {...makeProps()} />);

    const input = screen.getByLabelText(/Valor ou quantidade\*/i) as HTMLInputElement;
    await user.type(input, 'R$ 500');
    expect(input.value).toBe('R$ 500');
  });

  it('anexa documentos e envia com payload correto', async () => {
    const user = userEvent.setup();
    const onSubmitDonation = vi.fn();
    render(<CadastroDoacao {...makeProps({ onSubmitDonation })} />);

    // Seleciona tipo
    const select = screen.getByLabelText(/Tipo de doação\*/i) as HTMLSelectElement;
    await user.selectOptions(select, 'Dinheiro');

    // Valor
    const input = screen.getByLabelText(/Valor ou quantidade\*/i) as HTMLInputElement;
    await user.type(input, 'R$ 1000');

    // Arquivos
    const fileInput = screen.getByLabelText(/Documentos Comprobatórios\*/i) as HTMLInputElement;
    const f1 = new File(['a'], 'comprovante.pdf', { type: 'application/pdf' });
    const f2 = new File(['b'], 'recibo.jpg', { type: 'image/jpeg' });
    await user.upload(fileInput, [f1, f2]);
    expect(fileInput.files?.length).toBe(2);

    // Enviar
    const submit = screen.getByRole('button', { name: /enviar para validação/i });
    await user.click(submit);

    expect(onSubmitDonation).toHaveBeenCalledTimes(1);
    const payload = onSubmitDonation.mock.calls[0][0];
    expect(payload.tipoAjuda).toBe('Dinheiro');
    expect(payload.valorOuQuantidade).toBe('R$ 1000');
    expect(Array.isArray(payload.documentos)).toBe(true);
    expect(payload.documentos.map((f: File) => f.name)).toEqual(['comprovante.pdf', 'recibo.jpg']);
  });

  it('valida campos obrigatórios e não envia quando faltando', async () => {
    const user = userEvent.setup();
    const onSubmitDonation = vi.fn();
    render(<CadastroDoacao {...makeProps({ onSubmitDonation })} />);

    const submit = screen.getByRole('button', { name: /enviar para validação/i });
    await user.click(submit);

    // Mensagens de erro vêm do próprio componente (replicadas pelos mocks)
    expect(await screen.findByRole('alert', { name: '' })).toBeTruthy(); // haverá pelo menos um
    expect(onSubmitDonation).not.toHaveBeenCalled();

    // Checa textos específicos
    expect(screen.getByText(/Selecione o tipo de doação\./i)).toBeInTheDocument();
    expect(screen.getByText(/Informe o valor ou quantidade\./i)).toBeInTheDocument();
    expect(screen.getByText(/Anexe pelo menos um documento\./i)).toBeInTheDocument();
  });
});
