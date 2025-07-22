"use client";
import React from "react";
import Image from "next/image";
import { balao, balaopopup, confirma, emailpopup } from "@/assets";

export interface propspopup {
  nomedaong: string;
  nomeacao: string;
  emailong: string;
  numeroong: string;
  onEntrarContato: () => void;
}

export default function Modalcontatos(props: propspopup) {
  return (
    <div className="w-[450px] h-[300px] flex flex-col bg-white rounded-lg shadow p-[22px] font-sans text-[#1B2029]">
      <div className="flex">
        <Image src={balao} alt="" className="" />
        <div className="text-[16px] ml-[5px]"> Entrar em contato</div>
      </div>

      <div className="text-[13px] text-[#717182] flex mt-[5px] flex-wrap">
        <div>Entre em contato com &nbsp;</div>
        <div className="font-bold">{props.nomedaong}</div>
        <div>&nbsp; sobre a ação &nbsp;</div>
        <div className="font-bold">{props.nomeacao}</div>
      </div>

      <div className="w-[400px] h-[64px] bg-white flex items-center border-[1px] mt-[5px] rounded-lg border-gray-200 hover:bg-[#F2F2F2EE] cursor-pointer">
        <Image src={emailpopup} alt="" className="ml-[10px]" />

        <div className="flex flex-col ml-[10px]">
          <div className="text-[12px] font-bold">Enviar e-mail</div>
          <div className="text-[13px] text-[#6A7282]  font-bold">
            {props.emailong}
          </div>
        </div>
      </div>
      <div className="w-[400px] h-[64px] bg-white flex items-center border-[1px] mt-[10px] rounded-lg border-gray-200 hover:bg-[#F2F2F2EE] cursor-pointer">
        <Image src={balaopopup} alt="" className="ml-[10px]" />

        <div className="flex flex-col ml-[10px]">
          <div className="text-[12px] font-bold">Enviar whatsapp</div>
          <div className="text-[13px] text-[#6A7282] font-bold">
            {props.numeroong}
          </div>
        </div>
      </div>

      <div className="bg-gray-200 w-[400px] h-[1px] mt-[14px]"></div>

      <div className="flex mt-[12px]">
        <div
          className="h-[40px] w-[190px] border-gray-200 border-[1px] rounded-md flex items-center justify-center text-[16px] cursor-pointer"
          onClick={props.onEntrarContato}
        >
          Cancelar
        </div>
        <div className="h-[40px] w-[190px]  ml-[20px]  rounded-md flex items-center justify-center bg-[#009FE3] text-[16px] text-white cursor-pointer">
          <Image src={confirma} alt="" className="mr-[3px]" />
          Confirmar contato
        </div>
      </div>
    </div>
  );
}
