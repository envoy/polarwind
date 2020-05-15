import { fireEvent, render, screen } from "@testing-library/react";
import { OriginContext } from "../../../utils/origin";
import { ParentContext } from "../../../utils/parent";
import { StandaloneContext } from "../../../utils/standalone";
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

test("when embedded and clicking a link belonging to the host", () => {
  const sendMessage = jest.fn();
  const url = "https://dashboard.envoy.com/entries";

  render(
    <StandaloneContext.Provider value={false}>
      <OriginContext.Provider value="https://dashboard.envoy.com">
        <ParentContext.Provider value={{ sendMessage }}>
          <Link url={url}>View entries</Link>
        </ParentContext.Provider>
      </OriginContext.Provider>
    </StandaloneContext.Provider>
  );

  fireEvent.click(screen.getByRole("link"));
  expect(sendMessage).toHaveBeenCalledWith({
    event: "navigate",
    url,
  });
});
