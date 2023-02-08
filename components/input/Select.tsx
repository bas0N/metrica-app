import { useTheme } from "@nextui-org/react";
import React, { useState } from "react";
export interface SelectProps {
  command: string;
  options: Array<{ value: string; desc: string }>;
  handler?: any;
}
function Select({ command, options, handler }: SelectProps) {
  const { isDark, type } = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
    if (handler) {
      handler(event.target.value);
    }
  };
  return (
    <div className="mt-4">
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400 ">
        {command}
      </label>
      <select
        onChange={handleChange}
        defaultValue={"DEFAULT"}
        id="countries"
        className={` focus:ring-green-500 focus:border-green-500 focus:shadow-xl hover:shadow-lg   w-full p-2.5 text-sm rounded-lg  ${
          isDark ? "bg-zinc-900" : "bg-gray-100"
        }`}
      >
        {options.map((option, index) => (
          <option value={option.value} key={index}>
            {option.desc}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
