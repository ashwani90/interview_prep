import React from "react";
import classNames from "classnames";
import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon,
  onClick,
  disabled = false,
  ...props
}) {
  const btnClass = classNames(
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    { "btn-disabled": disabled }
  );

  return (
    <button
      className={btnClass}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      {children}
    </button>
  );
}
