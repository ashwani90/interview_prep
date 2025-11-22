import React from "react";

export default function TimezoneSelector({ timezone, onChange }) {
  const timezones = [
    "UTC",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
    "Australia/Sydney"
  ];

  return (
    <select value={timezone} onChange={(e) => onChange(e.target.value)}>
      {timezones.map((tz) => (
        <option key={tz} value={tz}>
          {tz}
        </option>
      ))}
    </select>
  );
}
