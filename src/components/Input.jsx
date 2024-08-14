import React from "react";

export default function Input({
  label,
  value,
  onChange,
  width,
  height,
  type,
  error,
}) {
  return (
    <div
      className="mb-4"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div className="flex items-center justify-between">
        <label className="uppercase block font-montserrat text-[rgb(175,185,200)] text-xs font-text mb-1">
          {label}
        </label>
        {error && (
          <p className="text-red-500 text-xs ml-1 mr-1 mb-1">({error})</p>
        )}
      </div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="font-montserrat w-full p-2.5 border bg-[rgb(240,243,250)] rounded-lg outline-0 text-gray-700"
      />
    </div>
  );
}
