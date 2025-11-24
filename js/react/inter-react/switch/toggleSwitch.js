import React, { useState, useEffect, forwardRef } from "react";
import PropTypes from "prop-types";
import "./ToggleSwitch.css";

/**
 * ToggleSwitch
 * - controlled if `checked` prop is provided
 * - uncontrolled if `checked` is undefined (uses internal state)
 */
const ToggleSwitch = forwardRef(function ToggleSwitch(
  { checked, onToggle, disabled = false, id, name, ariaLabel, className = "" },
  ref
) {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(Boolean(checked));

  useEffect(() => {
    if (isControlled) {
      setInternalChecked(checked);
    }
  }, [checked, isControlled]);

  const currentChecked = isControlled ? checked : internalChecked;

  const handleToggle = (evt) => {
    if (disabled) return;
    const newValue = !currentChecked;
    if (!isControlled) setInternalChecked(newValue);
    if (typeof onToggle === "function") onToggle(newValue, evt);
  };

  const handleKeyDown = (evt) => {
    if (disabled) return;
    if (evt.key === " " || evt.key === "Spacebar" || evt.key === "Enter") {
      // prevent page scroll on space
      evt.preventDefault();
      handleToggle(evt);
    }
  };

  // keep an id for input/label association
  const inputId = id || `toggle-${name || Math.random().toString(36).slice(2, 9)}`;

  return (
    <label
      className={`ts-toggle ${currentChecked ? "ts-on" : "ts-off"} ${disabled ? "ts-disabled" : ""} ${className}`}
      htmlFor={inputId}
      role="switch"
      aria-checked={currentChecked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        // if click on label, toggle (but will also let input's onChange handle it)
        // prevent double-calling when clicking the actual input element
        if (e.target.tagName.toLowerCase() === "input") return;
        handleToggle(e);
      }}
    >
      {/* Hidden real checkbox for accessibility & forms */}
      <input
        id={inputId}
        ref={ref}
        className="ts-input"
        type="checkbox"
        checked={currentChecked}
        onChange={handleToggle}
        disabled={disabled}
        name={name}
        aria-label={ariaLabel}
      />
      <span className="ts-track" aria-hidden="true">
        <span className="ts-knob" />
      </span>
    </label>
  );
});

ToggleSwitch.propTypes = {
  checked: PropTypes.bool,
  onToggle: PropTypes.func,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
};

ToggleSwitch.defaultProps = {
  checked: undefined,
  onToggle: undefined,
  disabled: false,
  id: undefined,
  name: undefined,
  ariaLabel: "toggle",
  className: "",
};

export default ToggleSwitch;
