import Certificate from "./components/certificate";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Certificate empresa="Centro de Informatica" level="Prata" id="01jj123214oj12132" data_emissao="04/07/2025"/>
    </div>
  );
}