import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SearchbarComFiltrosODS from 'src/components/search-bar-com-filtrosODS';

// Mocks utilitários
vi.mock('next/image', () => ({
  default: (props: any) => {
    const { src, alt, ...rest } = props || {};
    return <img src={typeof src === 'string' ? src : '/test.png'} alt={alt} {...rest} />;
  },
}));
vi.mock('@/assets', () => ({ lupa: '/lupa.png' }));
vi.mock('lucide-react', () => ({
  Filter: (p: any) => <svg data-testid="icon-filter" {...p} />,
  ChevronDown: (p: any) => <svg data-testid="icon-chevron" {...p} />,
  X: (p: any) => <svg data-testid="icon-x" {...p} />,
}));

// Harness para simular o "pai" controlando o estado
import React from 'react';
function Harness({
  initialSearchText = '',
  initialActiveOds = [] as string[],
  onSearchTextChange = vi.fn(),
  onAddOds = vi.fn(),
  onRemoveOds = vi.fn(),
  onClearAll = vi.fn(),
}) {
  const [searchText, setSearchText] = React.useState(initialSearchText);
  const [activeOds, setActiveOds] = React.useState<string[]>(initialActiveOds);

  return (
    <SearchbarComFiltrosODS
      searchText={searchText}
      activeOds={activeOds}
      onSearchTextChange={(t) => {
        setSearchText(t);
        onSearchTextChange(t);
      }}
      onAddOds={(name) => {
        setActiveOds((prev) => [...prev, name]);
        onAddOds(name);
      }}
      onRemoveOds={(name) => {
        setActiveOds((prev) => prev.filter((n) => n !== name));
        onRemoveOds(name);
      }}
      onClearAll={() => {
        setSearchText('');
        setActiveOds([]);
        onClearAll();
      }}
    />
  );
}

const openDropdown = async () => {
  const user = userEvent.setup();
  const odsBtn = screen.getByRole('button', { name: 'ODS' });
  await user.click(odsBtn);
  expect(odsBtn).toHaveAttribute('aria-expanded', 'true');
};

describe('<SearchbarComFiltrosODS />', () => {
  it('C1: digitar na busca chama onSearchTextChange e reflete o valor no input', async () => {
    const user = userEvent.setup();
    const onSearchTextChange = vi.fn();
    render(
      <Harness
        onSearchTextChange={onSearchTextChange}
      />
    );

    const input = screen.getByPlaceholderText(/pesquisar/i) as HTMLInputElement;
    await user.type(input, 'reciclagem');
    expect(onSearchTextChange).toHaveBeenCalled();
    expect(input.value).toBe('reciclagem');
  });

  it('C2: selecionar uma ODS chama onAddOds com nome sem prefixo e mostra a pílula', async () => {
    const user = userEvent.setup();
    const onAddOds = vi.fn();
    render(<Harness onAddOds={onAddOds} />);

    await openDropdown();

    // clica em "1. Erradicação da Pobreza"
    const item = await screen.findByRole('button', { name: /1\. Erradicação da Pobreza/i });
    await user.click(item);

    // callback recebe nome sem "1. "
    expect(onAddOds).toHaveBeenCalledWith('Erradicação da Pobreza');

    // pílula aparece com o nome limpo
    expect(screen.getByText('Erradicação da Pobreza')).toBeInTheDocument();
  });

  it('C3: clicar fora do dropdown fecha o menu', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    // abre
    await openDropdown();

    // garante que item está visível
    expect(await screen.findByRole('button', { name: /1\. Erradicação da Pobreza/i })).toBeInTheDocument();

    // clica no input (fora do menu)
    const input = screen.getByPlaceholderText(/pesquisar/i);
    await user.click(input);

    // menu fechou: o item some e aria-expanded volta a false
    expect(screen.queryByRole('button', { name: /1\. Erradicação da Pobreza/i })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'ODS' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('C4: pode acumular múltiplas ODS (seleciona várias em sequência)', async () => {
    const user = userEvent.setup();
    const onAddOds = vi.fn();
    render(<Harness onAddOds={onAddOds} />);

    // Seleciona a ODS 2
    await openDropdown();
    await user.click(await screen.findByRole('button', { name: /2\. Fome Zero e Agricultura Sustentável/i }));

    // Seleciona a ODS 3 (precisa abrir de novo)
    await openDropdown();
    await user.click(await screen.findByRole('button', { name: /3\. Saúde e Bem-estar/i }));

    // callbacks com nomes limpos
    expect(onAddOds).toHaveBeenNthCalledWith(1, 'Fome Zero e Agricultura Sustentável');
    expect(onAddOds).toHaveBeenNthCalledWith(2, 'Saúde e Bem-estar');

    // pílulas visíveis
    expect(screen.getByText('Fome Zero e Agricultura Sustentável')).toBeInTheDocument();
    expect(screen.getByText('Saúde e Bem-estar')).toBeInTheDocument();
  });

  // Extras úteis (opcionais)
  it('Remover uma pílula chama onRemoveOds e some da tela', async () => {
    const user = userEvent.setup();
    const onRemoveOds = vi.fn();
    render(<Harness initialActiveOds={['Educação de Qualidade']} onRemoveOds={onRemoveOds} />);

    // botão de remover da pílula
    const removeBtn = screen.getByRole('button', { name: /remover filtro Educação de Qualidade/i });
    await user.click(removeBtn);

    expect(onRemoveOds).toHaveBeenCalledWith('Educação de Qualidade');
    expect(screen.queryByText('Educação de Qualidade')).not.toBeInTheDocument();
  });

  it('Mostra "Limpar filtros" quando há busca ou ODS ativas e aciona onClearAll', async () => {
    const user = userEvent.setup();
    const onClearAll = vi.fn();
    render(<Harness initialSearchText="texto" initialActiveOds={['ODS X']} onClearAll={onClearAll} />);

    const clearBtn = screen.getByRole('button', { name: /limpar filtros/i });
    await user.click(clearBtn);

    expect(onClearAll).toHaveBeenCalledTimes(1);
    // Após limpar, o botão deve sumir
    expect(screen.queryByRole('button', { name: /limpar filtros/i })).not.toBeInTheDocument();
  });
});
