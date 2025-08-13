"use client";
import { useRouter } from "next/navigation";
import { logoprefeitura, portasair } from "@/assets";
import Image from "next/image";

type NavbarProps = {
  ativo: string; // "acoes", "minhas doacoes" ou "selos" ou "sair"
};

export default function Navbar({ ativo }: NavbarProps) {
  const router = useRouter();

  return (
    <div className="fixed top-0 z-50 w-full h-[88px] bg-[#009FE3] flex items-center text-white">
      <Image src={logoprefeitura} alt="logo" className="ml-[100px]" />

      <div className="flex ml-auto mr-[50px] gap-6">
        {ativo === "sair" ? (
          <div
            className="relative cursor-pointer flex items-center"
            onClick={() => router.push("")}
          >
            <Image src={portasair} alt="Sair" />
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
          </div>
        ) : (
          <>
            <div
              className="relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200"
              onClick={() => router.push("/acoes")}
            >
              Ações
              {ativo === "acoes" && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
              )}
            </div>

            <div
              className="relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200"
              onClick={() => router.push("/doacoespage")}
            >
              Minhas doações
              {ativo === "minhas doacoes" && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
              )}
            </div>

            <div
              className="relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200"
              onClick={() => router.push("/selospage")}
            >
              Selos
              {ativo === "selos" && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
              )}
            </div>

            <div
              className="relative cursor-pointer flex items-center"
              onClick={() => router.push("")}
            >
              <Image src={portasair} alt="Sair" />
              {ativo === "sair" && (
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
