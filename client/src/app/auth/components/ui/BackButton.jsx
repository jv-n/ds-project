"use client";

import { useRouter } from "next/navigation";
import backbutton from "@/assets/backbutton.svg";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="
        absolute top-4 left-4
        bg-transparent
        text-gray-900
        p-2
        rounded-full
        z-10
        cursor-pointer
        transition-all
        duration-200
        hover:bg-gray-200/30
        hover:ring-1
        hover:ring-gray-400/50
        hover:shadow-sm
      "
    >
      <img src={backbutton.src} alt="Voltar" className="h-7 w-7" />
    </button>
  );
}



