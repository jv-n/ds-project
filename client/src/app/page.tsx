import Image from "next/image";
import Certificate from "./components/certificate";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Certificate empresa="Coca-Cola" level="Prata" id="01jj123214oj12132" data_emissao="04/07/2025"/>
    </div>
  );
}