import { logoprefeitura } from "@/assets";
import Image from "next/image";

type Btprops = {
  ativo: string;
  setAtivo: (valor: string) => void;
};

export default function Navbar({ ativo, setAtivo }: Btprops) {
  return (
    <div className="w-full h-[88px] bg-[#009FE3] flex items-center">
      <Image src={logoprefeitura} alt="" className="ml-[100px]" />

      <div className="flex ml-auto mr-[50px] gap-6">
        <div
          className={`relative cursor-pointer font-bold pb-1 `}
          onClick={() => setAtivo("acoes")}
        >
          Ações
          {ativo === "acoes" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
          )}
        </div>

        <div
          className={`relative cursor-pointer font-bold pb-1 `}
          onClick={() => setAtivo("minhas doacoes")}
        >
          Minhas doações
          {ativo === "minhas doacoes" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
          )}
        </div>

        <div
          className={`relative cursor-pointer font-bold pb-1 `}
          onClick={() => setAtivo("selos")}
        >
          Selos
          {ativo === "selos" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
          )}
        </div>
      </div>
    </div>
  );
}
