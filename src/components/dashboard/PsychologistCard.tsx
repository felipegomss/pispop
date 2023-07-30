import React from "react";
import { Psychologist } from "../../types/Psychologist";

interface PsychologistCardProps {
  psychologist: Psychologist;
  onEdit: () => void;
  onDelete: () => void;
}

const PsychologistCard: React.FC<PsychologistCardProps> = ({
  psychologist,
  onEdit,
  onDelete,
}) => {
  return (
    <li className="border border-gray-300 rounded p-4 mb-4 flex justify-between items-center">
      <div>
        <span className="font-bold">{psychologist.nome}</span>
        <span className="block text-gray-500">
          {psychologist.regiao} {psychologist.crp}
        </span>
        <span className="block text-gray-500">{psychologist.email}</span>
        {/* Adicione outras informações do psicólogo */}
      </div>
      <div className="flex flex-col md:flex-row gap-2">
        <button
          onClick={onEdit}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 w-full"
        >
          Editar
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 w-full"
        >
          Apagar
        </button>
      </div>
    </li>
  );
};

export default PsychologistCard;
