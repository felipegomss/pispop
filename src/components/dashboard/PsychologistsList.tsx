// components/PsychologistsList.tsx
import React from "react";
import PsychologistCard from "./PsychologistCard";
import { Psychologist } from "@/types/Psychologist";

interface PsychologistsListProps {
  psychologists: Psychologist[];
  onEdit: (psychologist: Psychologist) => void;
  onDelete: (id: string) => void;
  onClick: () => void;
}

const PsychologistsList: React.FC<PsychologistsListProps> = ({
  psychologists,
  onEdit,
  onDelete,
  onClick,
}) => {
  return (
    <div>
      <div className="mb-6 flex justify-between">
        <h3 className="text-2xl font-bold">Psicólogos Ativos</h3>
        <button
          onClick={onClick}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Adicionar
        </button>
      </div>
      <ul>
        {psychologists.map((psychologist) => (
          <PsychologistCard
            key={psychologist.id}
            psychologist={psychologist}
            onEdit={() => onEdit(psychologist)}
            onDelete={() => onDelete(psychologist.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default PsychologistsList;
