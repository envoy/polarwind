import { fireEvent, render, screen } from "@testing-library/react";
import { OriginContext } from "../../../utils/origin";
import { ParentContext } from "../../../utils/parent";
import { StandaloneContext } from "../../../utils/standalone";
import { UnstyledLink } from "../UnstyledLink";

test("when external is true", () => {
  render(
    <UnstyledLink external url="https://www.google.com">
      Google
    </UnstyledLink>
  );
  expect(screen.getByRole("link")).toHaveAttribute(
    "rel",
    "noopener noreferrer"
  );
  expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
});

test("when external is false", () => {
  render(
    <UnstyledLink external={false} url="/home">
      Home
    </UnstyledLink>
  );
  expect(screen.getByRole("link")).not.toHaveAttribute("rel");
  expect(screen.getByRole("link")).not.toHaveAttribute("target");
});

test("an internal link can be marked as external (to force it to pop up)", () => {
  render(
    <UnstyledLink external url="/home">
      Home
    </UnstyledLink>
  );
  expect(screen.getByRole("link")).toHaveAttribute("rel");
  expect(screen.getByRole("link")).toHaveAttribute("target");
});

test("when embedded and clicking a link belonging to the host", () => {
  const sendMessage = jest.fn();
  const url = "https://dashboard.envoy.com/entries";

  render(
    <StandaloneContext.Provider value={false}>
      <OriginContext.Provider value="https://dashboard.envoy.com">
        <ParentContext.Provider value={{ sendMessage }}>
          <UnstyledLink url={url}>View entries</UnstyledLink>
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

test("when standalone and clicking a link belonging to the host", () => {
  const sendMessage = jest.fn();
  const url = "https://dashboard.envoy.com/entries";

  render(
    <StandaloneContext.Provider value={true}>
      <OriginContext.Provider value="https://dashboard.envoy.com">
        <ParentContext.Provider value={{ sendMessage }}>
          <UnstyledLink url={url}>View entries</UnstyledLink>
        </ParentContext.Provider>
      </OriginContext.Provider>
    </StandaloneContext.Provider>
  );

  // can't actually fireEvent.click here because it will try to navigate to that link
  // which jsdom does not support
  expect(screen.getByRole("link")).not.toHaveAttribute("rel");
  expect(screen.getByRole("link")).not.toHaveAttribute("target");
});

test("when embedded and clicking a link belonging to the host, but external is set", () => {
  const sendMessage = jest.fn();
  const url = "https://dashboard.envoy.com/entries";

  render(
    <StandaloneContext.Provider value={false}>
      <OriginContext.Provider value="https://dashboard.envoy.com">
        <ParentContext.Provider value={{ sendMessage }}>
          <UnstyledLink external url={url}>
            View entries
          </UnstyledLink>
        </ParentContext.Provider>
      </OriginContext.Provider>
    </StandaloneContext.Provider>
  );

  fireEvent.click(screen.getByRole("link"));
  expect(sendMessage).not.toHaveBeenCalledWith({
    event: "navigate",
    url,
  });
});

test("when standalone and URL is external, and external prop wasn't explicitly set", () => {
  render(<UnstyledLink url="https://www.google.com">Google</UnstyledLink>);
  expect(screen.getByRole("link")).not.toHaveAttribute(
    "rel",
    "noopener noreferrer"
  );
  expect(screen.getByRole("link")).not.toHaveAttribute("target", "_blank");
});

test("when embedded and URL is external, and external prop wasn't explicitly set", () => {
  render(
    <StandaloneContext.Provider value={false}>
      <UnstyledLink url="https://www.google.com">Google</UnstyledLink>
    </StandaloneContext.Provider>
  );
  expect(screen.getByRole("link")).toHaveAttribute(
    "rel",
    "noopener noreferrer"
  );
  expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
});
