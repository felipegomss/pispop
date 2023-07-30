// components/PsychologistForm.tsx
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Psychologist } from "@/types/Psychologist";
import RegionSelect from "./RegionSelect";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import { X } from "lucide-react";

interface PsychologistFormProps {
  onSubmit: (data: Partial<Psychologist>) => void;
  initialValues?: Partial<Psychologist>;
  onCancel: () => void;
}

const PsychologistForm: React.FC<PsychologistFormProps> = ({
  onSubmit,
  onCancel,
  initialValues = {},
}) => {
  const { handleSubmit, register, setValue } = useForm<Partial<Psychologist>>({
    defaultValues: initialValues,
  });

  const [formacoes, setFormacoes] = useState<string[]>(
    initialValues.formacoes || []
  );
  const [experiencias, setExperiencias] = useState<string[]>(
    initialValues.experiencias || []
  );

  const handleAddFormacao = () => {
    setFormacoes([...formacoes, ""]);
  };

  const handleRemoveFormacao = (index: number) => {
    setFormacoes((prevFormacoes) =>
      prevFormacoes.filter((_, idx) => idx !== index)
    );
  };

  const handleAddExperiencia = () => {
    setExperiencias([...experiencias, ""]);
  };

  const handleRemoveExperiencia = (index: number) => {
    setExperiencias((prevExperiencias) =>
      prevExperiencias.filter((_, idx) => idx !== index)
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-2 max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg"
    >
      <TextInput label="Nome" register={register} name="nome" required />
      <TextInput label="Email" register={register} name="email" required />
      <div className="flex gap-2">
        <TextInput label="CRP" register={register} name="crp" required />
        <RegionSelect label="Região" register={register} name="regiao" />
      </div>
      <div className="flex gap-2">
        <TextInput label="Instagram" register={register} name="instagram" />
        <TextInput
          label="WhatsApp"
          name="numeroWhatsapp"
          register={register}
          required
        />
      </div>
      <div className="flex gap-2">
        <DateInput
          label="Data de Nascimento"
          register={register}
          name="dataNascimento"
          required
        />
        <TextInput
          label="Abordagem"
          register={register}
          name="abordagem"
          required
        />
      </div>

      <TextInput label="CPF" name="cpf" register={register} required />
      <div>
        <label>
          Formações
          {formacoes.map((formacao, index) => (
            <div className="flex gap-2" key={index}>
              <input
                className="border w-full p-2 mt-1 rounded-md"
                type="text"
                {...register(`formacoes.${index}`, { required: true })}
                value={formacao}
                onChange={(e) => {
                  const updatedFormacoes = [...formacoes];
                  updatedFormacoes[index] = e.target.value;
                  setFormacoes(updatedFormacoes);
                }}
              />
              <button type="button" onClick={() => handleRemoveFormacao(index)}>
                <X />
              </button>
            </div>
          ))}
          <button
            className="mt-4 w-full px-4 py-2 font-semibold border border-blue-500 my-4 rounded hover:bg-blue-200 focus:outline-none focus:ring focus:border-blue-300"
            type="button"
            onClick={handleAddFormacao}
          >
            Adicionar Formação
          </button>
        </label>
      </div>
      <div>
        <label>
          Experiências
          {experiencias.map((experiencia, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                className="block border w-full p-2 mt-1 rounded-md"
                {...register(`experiencias.${index}`, { required: true })}
                value={experiencia}
                onChange={(e) => {
                  const updatedExperiencias = [...experiencias];
                  updatedExperiencias[index] = e.target.value;
                  setExperiencias(updatedExperiencias);
                }}
              />
              <button
                type="button"
                onClick={() => handleRemoveExperiencia(index)}
              >
                <X />
              </button>
            </div>
          ))}
          <button
            className="mt-4 w-full px-4 py-2 font-semibold border border-blue-500 my-4 rounded hover:bg-blue-200 focus:outline-none focus:ring focus:border-blue-300"
            type="button"
            onClick={handleAddExperiencia}
          >
            Adicionar Experiência
          </button>
        </label>
      </div>
      <div className="flex gap-2">
        <TextInput
          label="Ano de Graduação"
          register={register}
          name="anoGraduacao"
          required
        />
        <TextInput
          label="Valor da Consulta"
          register={register}
          name="valorConsulta"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Salvar
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="mt-4 w-full px-4 py-2 font-semibold text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PsychologistForm;
