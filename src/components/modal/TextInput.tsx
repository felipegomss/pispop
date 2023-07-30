// components/TextInput.tsx
import React from "react";

interface TextInputProps {
  label: string;
  register: any;
  name: string;
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  register,
  name,
  required = false,
}) => {
  return (
    <label>
      {label}
      <input
        className="block border w-full p-2 mt-1 rounded-md"
        type="text"
        {...register(name, { required })}
      />
    </label>
  );
};

export default TextInput;
