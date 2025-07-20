// src/app/login-empresa/components/LoginForm.jsx
'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { formatCNPJ, validateCNPJ } from '@/utils/cnpjUtils';
import Link from 'next/link';

const LoginFormEmpresa = () => {
  const [formData, setFormData] = useState({
    cnpj: '',
    password: '',
  });
  const [errors, setErrors] = useState({
    cnpj: '',
    password: '',
  });

  const validate = () => {
    const newErrors = { cnpj: '', password: '' };
    let isValid = true;

    // Validação do CNPJ
    if (!formData.cnpj) {
      newErrors.cnpj = 'CNPJ é obrigatório';
      isValid = false;
    } else if (!validateCNPJ(formData.cnpj)) {
      newErrors.cnpj = 'CNPJ inválido';
      isValid = false;
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Login válido para Empresa:', formData);
      alert('Login simulado para Empresa');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Lembrar-me
          </label>
        </div>
        
        <div className="text-sm pr-8">
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Esqueceu sua senha?
          </a>
        </div>
      </div>
      
      <div className="pt-4 text-center">
        <Button
          type="submit"
          variant="primary"
          className=" w-95 py-3 text-base"
        >
          Entrar como Empresa
        </Button>
      </div>

      {/* Seção de cadastro para empresas */}
      <div className="mt-20 text-center">
        <p className="text-sm text-gray-600">
          Não possui cadastro?
        </p>
        <Link href="/formulario-empresas" className="inline-block mt-2">
          <Button
            variant="outline"
            className="px-24 py-2 text-base"
          >
            Criar conta para empresa
          </Button>
        </Link>
      </div>
    </form>
  );
};

export default LoginFormEmpresa;