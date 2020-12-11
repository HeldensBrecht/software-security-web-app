import React from "react";

const TextArea = ({ name, label, onChange, placeholder, value, error }) => {
  let outerClass = "form-group";
  if (error && error.length > 0) {
    outerClass += " has-error";
  }

  return (
    <div className={outerClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <textarea
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextArea;
