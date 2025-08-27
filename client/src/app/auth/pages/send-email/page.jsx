"use client";

import React, { useState } from "react";
import AuthHeader from "@/app/auth/AuthHeader";
import FloatingInput from "@/components/floating-input";
import Button from "@/app/auth/components/ui/Button";
import Link from "next/link";
import Modal from "@/app/auth/components/ui/Modal";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "../../components/ui/BackButton";
import { validateEmail } from "@/app/auth/utils/emailUtils";

export default function SendEmailPage() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (value) => {
    setFormData({ email: value });
    if (errors.email) setErrors({ email: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = { email: "" };
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Formato aceitável: "exemplo@empresa.com"';
    }
    setErrors(newErrors);

    if (newErrors.email) return;

    try {
      // Verifica se o e-mail existe (não importa o perfil)
      const checkRes = await fetch(
        `http://localhost:3001/user/email?value=${encodeURIComponent(formData.email)}`
      );

      if (checkRes.status === 404) {
        setErrors({ email: "E-mail não cadastrado", password: "" });
        return;
      }

      if (!checkRes.ok) throw new Error("Erro ao verificar e-mail");

      // Se o e-mail existe, mostra o modal
      setIsModalOpen(true);
    } catch (err) {
      console.error("Erro ao verificar e-mail:", err.message);
      setErrors({ email: "Erro inesperado ao verificar e-mail", password: "" });
    }
  };

  return (
    <div className="min-h-screen bg-[#CBEFFF] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-40 relative">
      <BackButton />

      <div className="w-full flex justify-center">
        <Card variant="elevated" className="w-full max-w-md py-10 px-6 sm:py-12 sm:px-8">
          <div className="mx-auto w-full">
            <AuthHeader
              title="Esqueceu sua senha?"
              description="Preencha seu e-mail cadastrado e enviaremos um link para definir uma nova senha"
            />
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col items-center gap-6 mt-6 w-full"
          >
            <FloatingInput
              label="E-mail"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplo@empresa.com"
              error={errors.email}
              type="email"
              className="w-full"
            />

            <Button type="submit" variant="primary" className="w-full py-3 text-base">
              Enviar e-mail de recuperação
            </Button>

            <Link href="/auth/pages/new-password" className="w-full">
              <Button type="button" variant="secondary" className="w-full py-3 text-base">
                Ir à página de nova senha
              </Button>
            </Link>
          </form>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="sm:mx-auto px-6 sm:w-full sm:max-w-md">
              <AuthHeader
                title="E-mail enviado!"
                description="Confira sua caixa de entrada e acesse o link para criar uma nova senha."
              />
            </div>
          </Modal>
        </Card>
      </div>
    </div>
  );
}



