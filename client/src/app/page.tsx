"use client";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
import Cardacao from "@/components/card-de-acao";
import Cardcontatos from "@/components/card-cadastrar-doacao";
import { useState } from "react";
import Cardcadastrado from "@/components/card-acao-cadastrada";
import Modalcontatos from "@/components/modal-contato";
import Modalcriterios from "@/components/modal-criterios";

export default function Home() {
  const [ativo, setAtivo] = useState("acoes");
  const [ativocontato, setAtivoContato] = useState("acoes");
  const [mostrarModal, setMostrarModal] = useState(false);

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  return (
    <div className="flex flex-col min-h-screen pt-[88px]">
      <Navbar ativo="" />

      <div className="flex-grow flex flex-col items-center">
        <div className="flex flex-col sm:flex-row justify-center mt-6 gap-4 p-4">
          <Link href="/auth/pages/formulario-empresas">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition w-full sm:w-auto text-center">
              Formulário de Empresas
            </button>
          </Link>

          {/* Botão único para entrar */}
          <Link href="/entrar">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition w-full sm:w-auto text-center">
              Entrar
            </button>
          </Link>
        </div>
        {/* <Cardacao
      <div className="flex-grow bg-gray-100"> 

        {/* O conteúdo dinâmico da página */}
      </div>

      <Rodape />
    </div>
  );
}
