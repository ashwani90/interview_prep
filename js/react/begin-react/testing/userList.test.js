import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import UserList from "../components/UserList";

// Mock fetch API
beforeAll(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
        ]),
    })
  );
});

afterAll(() => {
  global.fetch.mockClear();
});

describe("UserList Component", () => {
  test("renders user list from API", async () => {
    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByLabelText("user-list")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });
  });

  test("has accessible roles", async () => {
    render(<UserList />);
    await waitFor(() => {
      expect(screen.getByRole("list")).toBeInTheDocument();
      expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
    });
  });
});
