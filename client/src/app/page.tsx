import React from "react";
import Link from "next/link";
import AuthHeader from "@/app/auth/AuthHeader";

export default function EntrarPage() {
  return (
    <div className="flex items-center relative">
      <div className="min-h-screen w-1/2 bg-gray-50 flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-2">
          <AuthHeader
            title=""
            description="Bem vindo! Por favor, selecione abaixo como deseja acessar o portal."
          />
        </div>

        <div className="mt-1 flex sm:mx-auto sm:h-full sm:w-full sm:max-w-md">
          <div className="py-10 px-4 sm:px-10">
            <div className="flex gap-4">
              <Link href="/auth/pages/login-prefeitura">
                <button className="w-[162px] h-[140px] bg-[#294BB6] text-white p-[10px] rounded-[4px] hover:bg-blue-900 transition font-medium text-lg flex items-center justify-center cursor-pointer">
                  <div>Auditoria</div>
                </button>
              </Link>
              <Link href="/auth/pages/login-empresas">
                <button className="w-[162px] h-[140px] bg-white text-[#294BB6] p-[10px] rounded-[4px] border-[2px] border-[#294BB6] hover:bg-gray-100 transition font-medium text-lg flex items-center justify-center cursor-pointer">
                  <div>Sou uma Empresa </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-[#009FE3] min-h-screen" />
    </div>
  );
}