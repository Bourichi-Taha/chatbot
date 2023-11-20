import React from "react";

export const Select = (props) => {
  return (
    <div className="sm:col-span-3">
      <label
        htmlFor="country"
        className="block text-lg font-medium leading-6 text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-2">
        <select
          id={props.name}
          name={props.name}
          autoComplete="country-name"
          className="px-2 block w-full rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  focus:ring-2 focus:ring-inset focus:ring-primary outline-0 sm:text-sm sm:leading-6 bg-white"
        >
          {props.items.map((a, i) => (
            <option value={a.value} key={i}>
              {a.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
