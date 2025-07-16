import { logoprefeitura } from "@/assets";
import Image from "next/image";

type Btprops = {
  ativo?: string;
  setAtivo?: (valor: string) => void;
  variant?: 'default' | 'logout'; 
  onLogout?: () => void;
};

export default function Navbar({ ativo, setAtivo, variant = 'default', onLogout }: Btprops) {
  return (
    <div className="w-full h-[88px] bg-[#009FE3] flex items-center">
      <Image src={logoprefeitura} alt="" className="ml-[100px]" />

      <div className="flex ml-auto mr-[50px] gap-6">
        {variant === 'logout' ? (

          <div
            className={`relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200`}
            onClick={(onLogout)}
            >
            Sair
            
          </div>
          

        ) : (
          <>
        <div
          className={`relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200`}
          onClick={() => setAtivo("acoes")}
        >
          Ações
          {ativo === "acoes" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
          )}
        </div>

        <div
          className={`relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200`}
          onClick={() => setAtivo("minhas doacoes")}
        >
          Minhas doações
          {ativo === "minhas doacoes" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
          )}
        </div>

        <div
          className={`relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200 `}
          onClick={() => setAtivo("selos")}
        >
          Selos
          {ativo === "selos" && (
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white" />
          )}
        </div>
          <div
            className={`relative cursor-pointer font-bold pb-1 border-b-2 border-transparent hover:border-white transition-colors duration-200`}
            onClick={(onLogout)}
            >
            Sair
            
          </div>
          </>
        )}
      </div>
    </div>
  );
}
