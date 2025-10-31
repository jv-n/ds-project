import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Cardacao, { type Cardacaoprops } from 'src/components/Cardacao';

// Mocks necessários para ambiente de teste
vi.mock('next/image', () => ({
  // Simplifica <Image> para <img>
  default: (props: any) => {
    const { src, alt, ...rest } = props || {};
    return <img src={typeof src === 'string' ? src : '/test.png'} alt={alt} {...rest} />;
  },
}));

vi.mock('@/assets', () => ({
  predio: '/predio.png',
  logoamassada: '/logo.png',
}));

const makeProps = (override: Partial<Cardacaoprops> = {}): Cardacaoprops => ({
  nomeacao: 'Ação de Doação de Alimentos',
  descricao: 'Doar cestas básicas para famílias em vulnerabilidade.',
  ods1: 'ODS 1',
  ods2: 'ODS 2',
  ods3: 'ODS 3',
  ods4: 'ODS 4',
  nomedaong: 'ONG Solidariedade',
  emailong: 'contato@ong.org',
  numeroong: '(81) 99999-9999',
  onEntrarContato: vi.fn(),
  ...override,
});

describe('<Cardacao />', () => {
  it('C1: renderiza somente as ODS não vazias (ignora vazios/brancos)', () => {
    const props = makeProps({ ods2: '   ', ods4: '' });
    render(<Cardacao {...props} />);

    // Deve exibir ODS 1 e ODS 3
    expect(screen.getByText('ODS 1')).toBeInTheDocument();
    expect(screen.getByText('ODS 3')).toBeInTheDocument();

    // Não deve exibir ODS 2 (apenas espaços) nem ODS 4 (string vazia)
    expect(screen.queryByText('ODS 2')).not.toBeInTheDocument();
    expect(screen.queryByText('ODS 4')).not.toBeInTheDocument();

    // Quantidade total de chips exibidos = 2
    // Seleciona o container de chips pela vizinhança do texto/estrutura
    // (buscamos pela presença de um dos chips e subimos ao contêiner)
    const chip1 = screen.getByText('ODS 1');
    const chipsContainer = chip1.closest('div')?.parentElement; // chip -> row flex -> container
    const chips = within(chipsContainer as HTMLElement).queryAllByText(/ODS/);
    expect(chips.length).toBe(2);
  });

  it('C2: renderiza a descrição e o nome da ONG corretamente', () => {
    const props = makeProps({
      descricao: 'Descrição detalhada da ação.',
      nomedaong: 'Instituto Esperança',
    });
    render(<Cardacao {...props} />);

    expect(screen.getByText('Descrição detalhada da ação.')).toBeInTheDocument();
    expect(screen.getByText('Instituto Esperança')).toBeInTheDocument();
  });

  it('C3: dispara onEntrarContato ao clicar no CTA', async () => {
    const user = userEvent.setup();
    const onEntrarContato = vi.fn();
    const props = makeProps({ onEntrarContato });
    render(<Cardacao {...props} />);

    // O CTA é uma <div> com texto "Entrar em contato"
    const cta = screen.getByText('Entrar em contato');
    await user.click(cta);

    expect(onEntrarContato).toHaveBeenCalledTimes(1);
  });

  it('C4: quando todas as ODS estão vazias, nenhum chip é renderizado', () => {
    const props = makeProps({ ods1: '', ods2: '  ', ods3: '', ods4: '   ' });
    render(<Cardacao {...props} />);

    // Garante que nenhum dos textos ODS aparece
    expect(screen.queryByText('ODS 1')).not.toBeInTheDocument();
    expect(screen.queryByText('ODS 2')).not.toBeInTheDocument();
    expect(screen.queryByText('ODS 3')).not.toBeInTheDocument();
    expect(screen.queryByText('ODS 4')).not.toBeInTheDocument();
  });

  it('renderiza o título da ação (sanidade visual)', () => {
    const props = makeProps({ nomeacao: 'Mutirão de Limpeza' });
    render(<Cardacao {...props} />);
    expect(screen.getByText('Mutirão de Limpeza')).toBeInTheDocument();
  });
});
