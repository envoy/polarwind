import { render, screen } from "@testing-library/react";
import { Linkable } from "../Linkable";

test("when url prop is present", () => {
  render(<Linkable url="/about">About</Linkable>);
  expect(screen.getByText("About")).toContainHTML('<a href="/about">About</a>');
});

test("when url prop is missing", () => {
  render(<Linkable>About</Linkable>);
  expect(screen.getByText("About")).toContainHTML(
    '<button type="button">About</button>'
  );
});
