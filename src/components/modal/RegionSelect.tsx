// components/RegionSelect.tsx
import React from "react";

const regions = [
  "CRP 01 (DF)",
  "CRP 02 (PE)",
  "CRP 03 (BA)",
  "CRP 04 (MG)",
  "CRP 05 (RJ)",
  "CRP 06 (SP)",
  "CRP 07 (RS)",
  "CRP 08 (PR)",
  "CRP 09 (GO)",
  "CRP 10 (PA/AP)",
  "CRP 11 (CE)",
  "CRP 12 (SC)",
  "CRP 13 (PB)",
  "CRP 14 (MS)",
  "CRP 15 (AL)",
  "CRP 16 (ES)",
  "CRP 17 (RN)",
  "CRP 18 (MT)",
  "CRP 19 (SE)",
  "CRP 20 (AM/RR)",
  "CRP 21 (PI)",
  "CRP 22 (MA)",
  "CRP 23 (TO)",
  "CRP 24 (AC/RO)",
];

interface RegionSelectProps {
  label: string;
  register: any;
  name: string;
}

const RegionSelect: React.FC<RegionSelectProps> = ({
  label,
  register,
  name,
}) => {
  return (
    <div>
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        {...register(name)}
        className="border border-gray-300 rounded-md w-full p-2 mt-1 focus:ring focus:ring-blue-200"
        required
      >
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RegionSelect;
