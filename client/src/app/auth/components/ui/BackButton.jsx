"use client";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";

export function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="absolute top-4 left-4 bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold px-1 rounded-lg z-10"
    >
      <FaRegArrowAltCircleLeft className="h-7 w-7" />
    </button>
  );
}
