"use client";

import EmpresaForm from "./EmpresaForm";
import Navbar from "@/components/navbar";
import Rodape from "@/components/rodape";
export default function FormularioEmpresasPage() {
  return (
    <div className="pt-[88px]">
      <Navbar ativo="sair" />
      <div className="mt-[30px] mb-[30px]">
        <EmpresaForm className="max-w-6xl mx-auto" />
      </div>
      <Rodape />
    </div>
  );
}
