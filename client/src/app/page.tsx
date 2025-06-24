import Image from "next/image";
import bronzemedal from '../../assets/bronzemedal.svg';
import silvermedal from '../../assets/silvermedal.svg';
import goldenmedal from '../../assets/goldenmedal.svg';
import CardMedalhaBronze from '../components/card-medalha-bronze';
import CardMedalhaPrata from "@/components/card-medalha-prata";
import CardMedalhaOuro from "@/components/card-medalha-ouro";


export default function Home() {

  const CardMedalhaBronzeProps = {
    categoria: "Nível Bronze",
    pontuacao: "5 a 45 pontos",
    descricao: "Empresas em fase inicial ou com nível básico de engajamento social.",
    criterios: "Ver critérios"
    }

  const CardMedalhaPrataProps = {
    categoria: "Nível Prata",
    pontuacao: "46 a 74 pontos",
    descricao:"Empresas com bom nível de engajamento e programas sociais consistentes.",
    criterios: "Ver critérios"
  }

  const CardMedalhaOuroProps = {
    categoria: "Nível Ouro",
    pontuacao: "75 a 100 pontos",
    descricao: "Empresas líderes em responsabilidade social, com impacto significativo e cultura de engajamento enraizada.",
    criterios: "Ver critérios"
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <CardMedalhaBronze
          categoria={CardMedalhaBronzeProps.categoria}
          pontuacao={CardMedalhaBronzeProps.pontuacao}
          descricao={CardMedalhaBronzeProps.descricao}
          criterios={CardMedalhaBronzeProps.criterios}
        />

        <CardMedalhaPrata
          categoria={CardMedalhaPrataProps.categoria}
          pontuacao={CardMedalhaPrataProps.pontuacao}
          descricao={CardMedalhaPrataProps.descricao}
          criterios={CardMedalhaPrataProps.criterios}
        />

        <CardMedalhaOuro 
          categoria={CardMedalhaOuroProps.categoria}
          pontuacao={CardMedalhaOuroProps.pontuacao}
          descricao={CardMedalhaOuroProps.descricao}
          criterios={CardMedalhaOuroProps.criterios}
        />

      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
