import Image from "next/image";
import Certificate from "./components/certificate";

export default function Home() {
  return (
    <div className="bg-sky-50 flex items-center justify-center min-h-full">
      <Certificate empresa="coca" level="prata" id="01kak1" data_emissao="19/06/2025"/>
    </div>
  );
}
