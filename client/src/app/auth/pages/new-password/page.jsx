"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import AuthHeader from "@/app/auth/AuthHeader";
import FloatingInput from "@/components/floating-input";
import Button from "@/app/auth/components/ui/Button";
import Modal from "@/app/auth/components/ui/Modal";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "../../components/ui/BackButton";

export default function NewPasswordPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id"); // pega o id da query string

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" });
  const [errors, setErrors] = useState({ password: "", confirmPassword: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors = { password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirmação de senha é obrigatória";
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!userId) {
      setErrors(prev => ({ ...prev, password: "ID do usuário não encontrado" }));
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/user/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senha: formData.password })
      });

      if (!res.ok) {
        throw new Error("Erro ao atualizar senha");
      }

      setIsModalOpen(true);
    } catch (err) {
      console.error("Erro ao atualizar senha:", err);
      setErrors(prev => ({ ...prev, password: "Erro inesperado ao alterar a senha" }));
    }
  };

  return (
    <div className="min-h-screen bg-[#CBEFFF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-40 relative">
      <BackButton />

      <div className="w-full flex justify-center">
        <Card variant="elevated" className="w-full max-w-md py-10 px-6 sm:py-12 sm:px-8">
          <div className="mx-auto w-full">
            <AuthHeader
              title="Nova Senha"
              description="Preencha os campos abaixo para definir sua nova senha"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center gap-6 mt-6 w-full"
          >
            <FloatingInput
              label="Nova senha"
              value={formData.password}
              onChange={(v) => handleChange("password", v)}
              placeholder="Digite sua nova senha"
              error={errors.password}
              type="password"
              className="w-full"
            />

            <FloatingInput
              label="Confirme a senha"
              value={formData.confirmPassword}
              onChange={(v) => handleChange("confirmPassword", v)}
              placeholder="Confirme sua senha"
              error={errors.confirmPassword}
              type="password"
              className="w-full"
            />

            <Button type="submit" variant="primary" className="w-full py-3 text-base">
              Alterar senha
            </Button>
          </form>

          <Modal isOpen={isModalOpen}>
            <div className="sm:mx-auto px-6 sm:w-full sm:max-w-md">
              <AuthHeader
                title="Senha alterada com sucesso!"
                description="Agora você pode usar a nova senha para acessar sua conta."
              />
            </div>
          </Modal>
        </Card>
      </div>
    </div>
  );
}

