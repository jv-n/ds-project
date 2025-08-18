"use client";
import React, { useState } from "react";
import AuthHeader from "@/app/auth/AuthHeader";
import Input from "@/app/auth/components/ui/Input";
import Button from "@/app/auth/components/ui/Button";
import Link from "next/link";
import Modal from "@/app/auth/components/ui/Modal";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "../../components/ui/BackButton";

export default function SendEmailPage() {
  const [formData, setFormData] = useState({ email: "" });
  const [errors, setErrors] = useState({ email: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewPasswordOpen, setIsNewPasswordOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // turnOn = false;

    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Formato aceitável: "julia@gmail.com"';
    }
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Aqui deve chamar a API para validação do email
      //seta o retorno da api para turnon para aparecer o erro indicado
      // turnOn = false;
      // if (Object.keys(newErrors).length != 0) {
      //   newErrors.email = "Email não encontrado"
      // }

      console.log("E-mail para recuperação enviado:", formData.email);

      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-40 lg:px-140 relative">
      <BackButton />
      <Card variant="elevated" className="py-27">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-12">
          <AuthHeader
            title="Esqueceu sua senha?"
            description="Preencha seu e-mail cadastrados e enviaremos um link para definir uma nova senha"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col items-center gap-7"
        >
          <Input
            label="E-mail"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="exemplo@empresa.com"
            error={errors.email}
            className="w-95 mr-4 pl-2"
          />
          <Button
            type="submit"
            variant="primary"
            className=" w-95 py-3 text-base"
          >
            Enviar e-mail de recuperação
          </Button>
          <Link href="/auth/pages/new-password">
            <Button
              type="submit"
              variant="secondary"
              className="w-95 py-3 text-base"
            >
              Ir à página new password
            </Button>
          </Link>
        </form>

        <Modal isOpen={isModalOpen}>
          <div className="sm:mx-auto px-10 sm:w-full sm:max-w-md">
            <AuthHeader
              title="E-mail enviado!"
              description="Confira sua caixa de entrada e acesse o link para criar uma nova senha."
            />
          </div>
        </Modal>
      </Card>
    </div>
  );
}
