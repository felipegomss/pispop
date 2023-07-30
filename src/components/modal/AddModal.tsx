"use client";
// components/AddModal.tsx
import React from "react";
import ModalPopup from "./ModalPopup";
import PsychologistForm from "./PsychologistForm";
import { Psychologist } from "@/types/Psychologist";

interface AddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Partial<Psychologist>) => void;
}

const AddModal: React.FC<AddModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const handleFormSubmit = (data: Partial<Psychologist>) => {
    onSubmit(data);
    onClose(); // Close the modal after submission
  };

  return (
    <ModalPopup
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Adicionar Psicólogo"
    >
      <PsychologistForm onSubmit={handleFormSubmit} onCancel={onClose} />
    </ModalPopup>
  );
};

export default AddModal;
