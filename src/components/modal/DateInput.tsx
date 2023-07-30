// components/DateInput.tsx
import React from "react";

interface DateInputProps {
  label: string;
  register: any;
  name: string;
  required?: boolean;
}

const DateInput: React.FC<DateInputProps> = ({
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
        type="date"
        {...register(name, { required })}
      />
    </label>
  );
};

export default DateInput;
