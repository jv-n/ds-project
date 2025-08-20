"use client";

import React, { useState } from "react";
import Input from "@/app/auth/components/ui/Input";
import Button from "@/app/auth/components/ui/Button";
import { formatCNPJ, validateCNPJ } from "@/app/auth/utils/cnpjUtils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginFormEmpresa = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    cnpj: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    cnpj: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // ignora validações e navega direto
    router.push("/acoes");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="CNPJ"
        name="cnpj"
        type="text"
        mask={formatCNPJ}
        placeholder="Digite seu CNPJ"
        value={formData.cnpj}
        onChange={handleChange}
        error={errors.cnpj}
      />

      <Input
        label="Senha"
        name="password"
        type="password"
        placeholder="••••••"
        value={formData.password}
        onChange={handleChange}
        error={errors.password}
      />

      <div className="flex items-center justify-between">
        <div className="flex pl-9 items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-900"
          >
            Lembrar-me
          </label>
        </div>

        <div className="text-sm pr-8">
          <a
            href="/auth/pages/send-email"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Esqueceu sua senha?
          </a>
        </div>
      </div>

      <div className="pt-4 text-center cursor-pointer">
        <Button
          type="submit"
          variant="primary"
          className=" w-[350px] py-3 text-base"
        >
          Entrar como Empresa
        </Button>
      </div>

      <div className="mt-10 text-center">
        <p className="text-sm text-gray-600">Não possui cadastro?</p>
        <Link
          href="/auth/pages/formulario-empresas"
          className="inline-block mt-2"
        >
          <Button variant="primary">Criar conta para empresa</Button>
        </Link>
      </div>
    </form>
  );
};

export default LoginFormEmpresa;
