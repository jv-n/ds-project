"use client";

import { useRouter } from "next/navigation";
import { logoprefeitura } from "@/assets";
import Image from "next/image";
import { BackButton } from "@/app/auth/components/ui/BackButton";

export default function NavbarSecundaria(){
  return (
    <div className="fixed top-0 z-50 w-full h-[88px] bg-[#009FE3] flex items-center justify-between">
      {/* BackButton à esquerda com margem */}
      <div className="ml-8">
        <BackButton />
      </div>

      {/* Logo da prefeitura à direita com margem */}
      <div className="mr-8">
        <Image
          src={logoprefeitura}
          alt="Logo Prefeitura"
          className="h-10 w-auto"
        />
      </div>
    </div>
  );
}


