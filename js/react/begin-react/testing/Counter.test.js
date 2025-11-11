import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Counter from "../components/Counter";

describe("Counter Component", () => {
  test("renders initial count", () => {
    render(<Counter initialCount={5} />);
    expect(screen.getByLabelText(/count-value/i)).toHaveTextContent("Count: 5");
  });

  test("increments count on button click", () => {
    render(<Counter initialCount={0} />);
    fireEvent.click(screen.getByText(/increment/i));
    expect(screen.getByLabelText(/count-value/i)).toHaveTextContent("Count: 1");
  });

  test("decrements count on button click", () => {
    render(<Counter initialCount={2} />);
    fireEvent.click(screen.getByText(/decrement/i));
    expect(screen.getByLabelText(/count-value/i)).toHaveTextContent("Count: 1");
  });
});
