import { logoamassada } from "@/assets";
import { predio } from "@/assets";
import Image from "next/image";

export interface Cardacaoprops {
  nomeacao: string;
  descricao: string;
  ods1: string;
  ods2: string;
  ods3: string;
  ods4: string;
  nomedaong: string;
  emailong: string;
  numeroong: string;
  onEntrarContato: () => void;
}

export default function Cardacao(props: Cardacaoprops) {
  return (
    <div className="w-[400px] flex flex-col bg-white rounded-xl shadow p-4 font-sans text-[#1B2029]">
      <div className="text-[16px] font-bold">{props.nomeacao}</div>

      <div className="text-[12px] mt-[7px]">{props.descricao}</div>

      <div className="flex flex-wrap gap-[5px] mt-[10px]">
        {(
          [props.ods1, props.ods2, props.ods3, props.ods4].filter(
            (v) => !!v && String(v).trim().length > 0
          ) as string[]
        ).map((ods, idx) => {
          const colors = [
            "bg-[#C6CAFF]",
            "bg-[#A5FFAA]",
            "bg-[#FFD8AE]",
            "bg-[#FFAED5]",
          ];
          return (
            <div
              key={`${ods}-${idx}`}
              className={`${
                colors[idx % colors.length]
              } rounded-full px-[10px] py-[2px] text-[12px]`}
            >
              {ods}
            </div>
          );
        })}
      </div>

      <div className="flex items-center mt-[16px]">
        <Image src={predio} alt="ícone prédio" />
        <div className="text-[12px] ml-[10px]">{props.nomedaong}</div>
      </div>

      <div className="flex items-center mt-[16px]">
        <div
          className="h-[32px] w-[144px] bg-[#294BB6] flex justify-center items-center rounded-sm text-white text-sm cursor-pointer"
          onClick={props.onEntrarContato}
        >
          Entrar em contato
        </div>
      </div>
    </div>
  );
}
