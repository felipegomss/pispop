"use client";
import React from "react";
import ModalPopup from "./ModalPopup";
import PsychologistForm from "./PsychologistForm";
import { Psychologist } from "@/types/Psychologist";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Psychologist>) => void;
  initialValues: Partial<Psychologist>;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialValues,
}) => {
  const handleFormSubmit = (data: Partial<Psychologist>) => {
    onSubmit(data);
    onClose();
  };

  return (
    <ModalPopup
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Psicólogo"
    >
      <PsychologistForm
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        onCancel={onClose}
      />
    </ModalPopup>
  );
};

export default EditModal;
