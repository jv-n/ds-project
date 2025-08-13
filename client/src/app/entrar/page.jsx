import React from "react";
import Link from "next/link";
import { Card } from "@/app/auth/components/ui/Card";
import AuthHeader from "@/app/auth/AuthHeader";
import { BackButton } from "../auth/components/ui/BackButton";

export default function EntrarPage() {
  return (
    <div className="flex items-center relative">
      <div className="min-h-screen w-1/2 bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
        <BackButton />
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-2">
          <AuthHeader
            title=""
            description="Bem vindo! Por favor, selecione abaixo como deseja acessar o portal."
          />
        </div>

        <div className="mt-1 flex sm:mx-auto sm:h-full sm:w-full sm:max-w-md">
          <div className="py-10 px-4 sm:px-10">
            <div className="flex gap-4">
              <Link href="/auth/pages/login-ong">
                <button className="w-full bg-[#294BB6] text-white py-14 px-4 rounded-md border-2 hover:bg-blue-700 transition font-medium text-lg">
                  Sou uma ONG/projeto
                </button>
              </Link>
              <Link href="/auth/pages/login-empresas">
                <button className="w-full bg-white text-blue-600 py-14 px-5.5 rounded-md border-2 hover:bg-gray-50 transition font-medium text-lg">
                  Sou uma Empresa
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-blue-500 min-h-screen" />
    </div>
  );
}
