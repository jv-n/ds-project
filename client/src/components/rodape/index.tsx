import { logoamassada } from "@/assets";
import Image from "next/image";

export default function Rodape() {
  return (
    <div className="w-full h-[220px] bg-[#009FE3] flex items-center">
      <div className="flex-col ml-[100px] mb-[10px]">
        <Image src={logoamassada} alt="" className="" />
        <div className="font-bold text-xl mt-[20]">Bora Impactar</div>
        <div className="text-xl">A união que transforma </div>
        <div className="text-xl">vidas</div>
      </div>

      <div className="flex-col ml-[100px] mb-[10px]">
        <div className="text-xl font-bold">Portal</div>
        <div className="text-xl mt-[10px]">Ações</div>
        <div className="text-xl mt-[10px]">Minhas doações</div>
        <div className="text-xl mt-[10px]">Selos</div>
      </div>
    </div>
  );
}
