"use client";
import { useState } from "react";
import Modalcriterios from "@/components/modal-criterios";
import CardMedalhaBronze from "@/components/card-medalha-bronze";
import CardMedalhaOuro from "@/components/card-medalha-ouro";
import CardMedalhaPrata from "@/components/card-medalha-prata";

export default function Home() {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarcriterios, Setcriterios] = useState("off");

  function abrirModal() {
    setMostrarModal(true);
  }

  function fecharModal() {
    setMostrarModal(false);
  }

  return (
    <div>
      <CardMedalhaBronze abrirModal={Setcriterios} />
      <CardMedalhaPrata abrirModal={Setcriterios} />
      <CardMedalhaOuro abrirModal={Setcriterios} />

      {mostrarcriterios == "bronzemedal" && (
        <Modalcriterios nivel="bronzemedal" fecharmodal={Setcriterios} />
      )}

      {mostrarcriterios == "goldenmedal" && (
        <Modalcriterios nivel="goldenmedal" fecharmodal={Setcriterios} />
      )}

      {mostrarcriterios == "silvermedal" && (
        <Modalcriterios nivel="silvermedal" fecharmodal={Setcriterios} />
      )}
    </div>
  );
}
