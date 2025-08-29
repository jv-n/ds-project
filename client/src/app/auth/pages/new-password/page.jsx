"use client";
import React, { useState } from "react";
import AuthHeader from "@/app/auth/AuthHeader";
import Input from "@/app/auth/components/ui/Input";
import Button from "@/app/auth/components/ui/Button";
import Modal from "@/app/auth/components/ui/Modal";
import { Card } from "@/app/auth/components/ui/Card";
import { BackButton } from "@/app/auth/components/ui/BackButton";

export default function NewPassword() {
  const [formData, setFormData] = useState({
    password: "",
    comparyPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 8) {
      newErrors.password = "A senha deve ter pelo menos 8 caracteres";
    }

    if (!formData.comparyPassword) {
      newErrors.comparyPassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.comparyPassword) {
      newErrors.comparyPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log("Nova senha definida:", formData.password);
      // Aqui é pra chamar a API

      setIsSuccessModalOpen(true);
    }
  };

  const handleSuccessModalClose = () => {
    setIsSuccessModalOpen(false);
    () => window.history.go(-2);
  };

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col justify-center py-12 sm:px-40 lg:px-140">
      <BackButton />
      <Card variant="elevated" className="py-27">
        <div className="sm:mx-auto sm:w-full sm:max-w-md px-12 mb-6">
          <AuthHeader
            title="Nova senha"
            description="Escolha uma nova senha para acessar sua conta"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col  items-center gap-6"
        >
          <Input
            label="Nova senha"
            name="password"
            type="password"
            placeholder="Digite uma senha de 8 ou mais dígitos"
            onChange={handleChange}
            value={formData.password}
            error={errors.password}
            className="py-3 w-95"
          />

          <Input
            label="Confirmar senha"
            name="comparyPassword"
            type="password"
            placeholder="Repita a senha"
            onChange={handleChange}
            value={formData.comparyPassword}
            error={errors.comparyPassword}
            className="py-3 w-95"
          />

          <Button
            type="submit"
            variant="primary"
            className="w-95 py-3 text-base mt-2"
          >
            Confirmar
          </Button>
        </form>

        <Modal isOpen={isSuccessModalOpen} onClose={handleSuccessModalClose}>
          <div className="sm:mx-auto px-10 sm:w-full sm:max-w-md">
            <AuthHeader
              title="Senha alterada com sucesso!"
              description="Agora você pode fazer login com sua nova senha."
            />
            <div className="mt-4 flex justify-center">
              <Button
                variant="primary"
                onClick={handleSuccessModalClose}
                className="w-full"
              >
                Ir ao login
              </Button>
            </div>
          </div>
        </Modal>
      </Card>
    </div>
  );
}
