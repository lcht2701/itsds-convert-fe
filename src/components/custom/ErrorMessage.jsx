import React from "react";

const ErrorMessage = ({ errors, name }) => {
  if (!errors[name] || !errors[name].message) {
    return null;
  }

  return (
    <p className="text-sm font-medium text-red-500">{errors[name].message}</p>
  );
};

export default ErrorMessage;
