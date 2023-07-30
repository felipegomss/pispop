import React from "react";
import Image from "next/image";
import { Psychologist } from "@/types/Psychologist";

interface PsychologistCardProps {
  psychologist: Psychologist;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
}) => {
  const {
    nome,
    crp,
    regiao,
    imageUrl,
    formacoes,
    experiencias,
    valorConsulta,
    abordagem,
    numeroWhatsapp,
  } = psychologist;

  const formattedValorConsulta = Number(valorConsulta).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });

  const regiaoNumber = regiao.match(/\d+/)?.[0] || "";

  const handleImageError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "/icon.png";
  };

  return (
    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 shadow-md rounded-lg">
      <div className="flex flex-col gap-2 p-4">
        <div className=" gap-2 flex flex-col items-center">
          <Image
            src={imageUrl || "/icon.png"}
            alt={imageUrl ? `Foto de ${nome}` : "PsiPop Logo"}
            width={300}
            height={300}
            onError={handleImageError}
            className="rounded-full w-32 h-32 mx-auto"
          />
          <p className="text-white font-bold text-xl">{abordagem}</p>
        </div>
        <div className="flex flex-col justify-between gap-2 flex-grow">
          <div className="">
            <h2 className="text-2xl font-semibold text-white">{nome}</h2>
            <p className="text-white text-sm">
              {regiaoNumber}/{crp}
            </p>
          </div>
          <div>
            <p className="text-white">
              Formado em{" "}
              {formacoes.map((formacao, index) =>
                index === formacoes.length - 1
                  ? `e ${formacao}.`
                  : `${formacao}, `
              )}
            </p>
            <p className="text-white">
              Experiência em{" "}
              {experiencias.map((experiencia, index) =>
                index === experiencias.length - 1
                  ? `e ${experiencia}.`
                  : `${experiencia}, `
              )}
            </p>
          </div>
          <div className="border-t border-white pt-4">
            <p className="text-white">
              <span className="font-semibold">Valor da Consulta:</span> R$
              {formattedValorConsulta}
            </p>
          </div>
        </div>
        <div className="">
          {numeroWhatsapp && (
            <a href="https://wa.me/${numeroWhatsapp}" target="_blank">
              <div className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 transition-colors text-center">
                Entrar em Contato
              </div>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PsychologistCard;
