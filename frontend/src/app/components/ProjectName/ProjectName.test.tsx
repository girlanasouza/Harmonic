import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ProjectName from "./ProjectName";
import React from "react";

test("Mostrar introdução do projeto", () => {
  render(<ProjectName />);

  expect(screen.getByRole("heading")).toHaveTextContent(
    /Frontend do projeto Harmoniq/
  );
});
