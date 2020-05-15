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
