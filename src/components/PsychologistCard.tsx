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
    <div className="bg-gradient-to-r from-emerald-500 to-blue-500 shadow-md rounded-lg min-h-[500px]">
      <div className="flex flex-col gap-2 p-4 h-full">
        <div className=" gap-2 flex flex-col items-center">
          <Image
            src={imageUrl || "/icon.png"}
            alt={imageUrl ? `Foto de ${nome}` : "PsiPop Logo"}
            width={300}
            height={300}
            onError={handleImageError}
            className="rounded-full w-32 h-32 mx-auto"
          />
          <h1 className="text-slate-50 font-bold text-xl">{abordagem}</h1>
        </div>
        <div className="flex flex-col gap-2 flex-grow">
          <div className="">
            <h2 className="text-2xl font-semibold text-slate-50">{nome}</h2>
            <p className="text-slate-200 text-sm">
              <strong>CRP</strong> {regiaoNumber}/{crp}
            </p>
          </div>
          <div>
            <p className="text-slate-50 overflow-hidden">
              Formado em{" "}
              {formacoes.length > 0 &&
                formacoes
                  .slice(0, 2)
                  .map((formacao, index) =>
                    formacoes.length > 2 && index === 2
                      ? `${formacao}...`
                      : formacoes.length === 1
                      ? `${formacao}.`
                      : index === formacoes.length - 2
                      ? `${formacao} `
                      : index === formacoes.length - 1
                      ? `e ${formacao}.`
                      : `${formacao}, `
                  )}
            </p>
            <p className="text-slate-50 overflow-hidden">
              Experiência em{" "}
              {experiencias.length > 0 &&
                experiencias
                  .slice(0, 3)
                  .map((experiencia, index) =>
                    experiencias.length > 3 && index === 2
                      ? `${experiencia}...`
                      : experiencias.length === 1
                      ? `${experiencia}.`
                      : index === experiencias.length - 2
                      ? `${experiencia} `
                      : index === experiencias.length - 1
                      ? `e ${experiencia}.`
                      : `${experiencia}, `
                  )}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="border-t border-slate-50 pt-4">
            <p className="text-slate-50">
              <span className="font-semibold">Valor da Consulta:</span> R$
              {formattedValorConsulta}
            </p>
          </div>
          {numeroWhatsapp && (
            <a href="https://wa.me/${numeroWhatsapp}" target="_blank">
              <div className="w-full px-6 py-3 bg-blue-500 text-slate-50 font-semibold rounded-md shadow hover:bg-blue-600 transition-colors text-center">
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
