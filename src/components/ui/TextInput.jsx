import React from "react";

export const TextInput = (props) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor={props.name}
        className="block text-lg font-medium leading-6 text-gray-900"
      >
        {props.label}:
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={props.name}
          id={props.name}
          autoComplete={props.name}
          value={props.value || "NAN"}
          disabled={props.disabled}
          className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-0 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};
