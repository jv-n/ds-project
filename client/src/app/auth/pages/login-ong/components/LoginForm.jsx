"use client";

import React, { useState } from "react";
import Input from "@/app/auth/components/ui/Input";
import Button from "@/app/auth/components/ui/Button";
import { formatCNPJ, validateCNPJ } from "@/app/auth/utils/cnpjUtils";
import { useRouter } from "next/navigation";

const LoginFormOng = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    cnpj: "",
    password: "",
  });

  const validate = () => {
    if (!formData.cnpj || !validateCNPJ(formData.cnpj)) return false;
    if (!formData.password || formData.password.length < 6) return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Redirecionar para /acoes
      router.push("/acoes");
    }
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
        placeholder="00.000.000/0000-00"
        value={formData.cnpj}
        onChange={handleChange}
      />

      <Input
        label="Senha"
        name="password"
        type="password"
        placeholder="••••••"
        value={formData.password}
        onChange={handleChange}
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

      <div className="pt-4 text-center">
        <Button
          type="button"
          variant="primary"
          className="w-[300px]"
          onClick={() => router.push("/auditoria")}
        >
          Entrar
        </Button>
      </div>
    </form>
  );
};

export default LoginFormOng;
