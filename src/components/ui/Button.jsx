import React from "react";

export const Button = (props) => {
  return (
    <button
      variant="outlined"
      className="text-primary border border-primary px-3 py-1"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
