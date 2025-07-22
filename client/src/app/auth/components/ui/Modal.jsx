// src/components/ui/Modal.jsx
"use client";
import {useRouter} from 'next/navigation'
import React from 'react';
import AuthHeader from "@/app/auth/AuthHeader";
import Button from '@/app/auth/components/ui/Button';
import { Card } from "@/app/auth/components/ui/Card";


const Modal = ({ isOpen, children }) => {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-50">
      <Card variant="elevated" className="py-27 flex flex-col justify-center">

        <div className="mb-5">
          {children}
        </div>
        
        <Button
          onClick={()=> router.back()}
          className="mx-15"
          variant="primary"
        >
          Voltar para a página de login
        </Button>
      </Card>
    </div>
  );
};

export default Modal;