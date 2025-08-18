import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import DetalhesPontuacao from 'src/components/accordion-detalhes-pontuacao';

const openAccordion = async () => {
  const user = userEvent.setup();
  const heading = screen.getByText(/Detalhamento da Pontuação/i);
  const headerDiv = heading.parentElement as HTMLElement; // cabeçalho clicável
  await user.click(headerDiv);
};

describe('<DetalhesPontuacao />', () => {
  it('C1: ao abrir, exibe as pontuações por critério (label, detalhe, pontos)', async () => {
    render(<DetalhesPontuacao />);

    // fechado inicialmente
    expect(screen.queryByText(/6 ações realizadas/i)).not.toBeInTheDocument();

    await openAccordion();

    // amostragem dos itens
    expect(
      screen.getByText(/Ações de Conscientização e Educação Interna sobre ODSS/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/6 ações realizadas/i)).toBeInTheDocument();
    expect(screen.getByText('25 pts')).toBeInTheDocument();

    expect(screen.getByText(/ODSs com Atuação da Empresa/i)).toBeInTheDocument();
    expect(screen.getByText(/7 a 8 ODS abordados/i)).toBeInTheDocument();
    expect(screen.getByText('20 pts')).toBeInTheDocument();

    expect(screen.getByText(/ONGs Atingidas por Ações de Voluntariado/i)).toBeInTheDocument();
    expect(screen.getByText(/5 a 6 ONGs parceiras/i)).toBeInTheDocument();
    expect(screen.getByText('15 pts')).toBeInTheDocument();

    expect(screen.getByText(/Colaboradores Engajados em Ações de Voluntariado/i)).toBeInTheDocument();
    expect(screen.getByText(/6% a 10% dos colaboradores/i)).toBeInTheDocument();
    expect(screen.getByText('4 pts')).toBeInTheDocument();

    expect(screen.getByText(/Orçamento Destinado a Voluntariado e Iniciativas Sociais/i)).toBeInTheDocument();
    expect(screen.getByText(/Até 0\.1% do orçamento/i)).toBeInTheDocument();
    expect(screen.getByText('4 pts')).toBeInTheDocument();
  });

  it('C2: exibe o total somado (68 pontos) ao abrir', async () => {
    render(<DetalhesPontuacao />);
    await openAccordion();
    expect(screen.getByText(/68 pontos/i)).toBeInTheDocument();
  });

  it('C3: fecha ao clicar novamente no cabeçalho', async () => {
    const user = userEvent.setup();
    render(<DetalhesPontuacao />);

    const heading = screen.getByText(/Detalhamento da Pontuação/i);
    const headerDiv = heading.parentElement as HTMLElement;

    // abre
    await user.click(headerDiv);
    expect(screen.getByText(/68 pontos/i)).toBeInTheDocument();

    // fecha
    await user.click(headerDiv);
    expect(screen.queryByText(/68 pontos/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/6 ações realizadas/i)).not.toBeInTheDocument();
  });
});
