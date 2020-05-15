import { render, screen } from "@testing-library/react";
import { Link } from "../Link";
import styles from "../Link.module.css";

test("when external is true", () => {
  render(
    <Link external url="https://www.google.com">
      Google
    </Link>
  );
  expect(screen.getByRole("link")).toHaveAttribute(
    "rel",
    "noopener noreferrer"
  );
  expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
});

test("when external is false", () => {
  render(
    <Link external={false} url="/home">
      Home
    </Link>
  );
  expect(screen.getByRole("link")).not.toHaveAttribute("rel");
  expect(screen.getByRole("link")).not.toHaveAttribute("target");
});

test("when monochrome is true, underline is set automatically", () => {
  render(
    <Link monochrome url="/">
      Home
    </Link>
  );
  expect(screen.getByRole("link")).toHaveClass(styles.underlined);
});

test("when monochrome is true, underline can be disabled explicitly", () => {
  render(
    <Link monochrome underlined={false} url="/">
      Home
    </Link>
  );
  expect(screen.getByRole("link")).not.toHaveClass(styles.underlined);
});
