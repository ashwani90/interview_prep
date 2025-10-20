import React from "react";
import { useForm } from "react-hook-form";

export default function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange", // real-time validation
  });

  const onSubmit = (data) => {
    alert("Form submitted!\n" + JSON.stringify(data, null, 2));
  };

  const agreeValue = watch("agree");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {/* Text input */}
      <div className="form-group">
        <label>Name:</label>
        <input
          {...register("name", {
            required: "Name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      {/* Select */}
      <div className="form-group">
        <label>Favorite Fruit:</label>
        <select
          {...register("fruit", { required: "Please select a fruit" })}
          defaultValue=""
        >
          <option value="" disabled>
            -- Select --
          </option>
          <option value="apple">Apple</option>
          <option value="banana">Banana</option>
          <option value="orange">Orange</option>
        </select>
        {errors.fruit && <p className="error">{errors.fruit.message}</p>}
      </div>

      {/* Radio buttons */}
      <div className="form-group">
        <label>Gender:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="male"
              {...register("gender", { required: "Please select a gender" })}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              value="female"
              {...register("gender", { required: "Please select a gender" })}
            />
            Female
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender.message}</p>}
      </div>

      {/* Checkbox */}
      <div className="form-group">
        <label>
          <input
            type="checkbox"
            {...register("agree", { required: "You must agree to continue" })}
          />
          I agree to the terms
        </label>
        {errors.agree && <p className="error">{errors.agree.message}</p>}
      </div>

      {/* Live state preview */}
      <div className="preview">
        <strong>Agree value:</strong> {agreeValue ? "Yes" : "No"}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
