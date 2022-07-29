import React from 'react';

interface Props {
  defaultValue: string | number;
  options: { min: number; type: string; time: string }[];
  onChange: () => void;
}
const Select = ({ defaultValue, options, onChange }: Props) => {
  return (
    <select value={defaultValue} onChange={onChange}>
      {options.map((data) => (
        <option value={data.time} key={data.min}>
          {data.type} {data.time}
        </option>
      ))}
    </select>
  );
};

export default Select;
