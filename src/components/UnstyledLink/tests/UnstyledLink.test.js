/* eslint-disable react/prop-types */

import { fireEvent, render, screen } from "@testing-library/react";
import { EmbeddedContext } from "../../../utils/embedded";
import { OriginContext } from "../../../utils/origin";
import { useParent } from "../../../utils/parent";
import { UnstyledLink } from "../UnstyledLink";

const sendMessage = jest.fn();

const external = "https://www.google.com/about";
const host = "https://dashboard.envoy.com/about";
const internal = "/about";
const sendMessageLink = "sendMessageLink";
const popupLink = "popupLink";
const defaultLink = "defaultLink";

// TestComponent is here mostly so that we can use the useParent hook to access setParent
function TestComponent({ children, embedded }) {
  const [, setParent] = useParent();
  setParent({ sendMessage });

  return (
    <EmbeddedContext.Provider value={embedded}>
      <OriginContext.Provider value="https://dashboard.envoy.com">
        {children}
      </OriginContext.Provider>
    </EmbeddedContext.Provider>
  );
}

describe.each`
  url         | externalProp | expected
  ${host}     | ${undefined} | ${sendMessageLink}
  ${host}     | ${true}      | ${popupLink}
  ${host}     | ${false}     | ${sendMessageLink}
  ${external} | ${undefined} | ${popupLink}
  ${external} | ${true}      | ${popupLink}
  ${external} | ${false}     | ${defaultLink}
  ${internal} | ${undefined} | ${defaultLink}
  ${internal} | ${true}      | ${popupLink}
  ${internal} | ${false}     | ${defaultLink}
`(
  "in embedded mode, when url is $url and the external prop is $externalProp",
  ({ expected, externalProp, url }) => {
    test(`will ${expected}`, () => {
      let props = { url };
      if (typeof externalProp === "boolean") {
        props = {
          ...props,
          external: externalProp,
        };
      }

      render(
        <TestComponent embedded>
          <UnstyledLink {...props}>Click here</UnstyledLink>
        </TestComponent>
      );

      switch (expected) {
        case "sendMessageLink":
          fireEvent.click(screen.getByRole("link"));
          expect(sendMessage).toHaveBeenCalledWith({
            event: "navigate",
            url,
          });
          break;
        case "popupLink":
          expect(screen.getByRole("link")).toHaveAttribute(
            "rel",
            "noopener noreferrer"
          );
          expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
          break;
        case "defaultLink":
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
      }
    });
  }
);

describe.each`
  url         | externalProp | expected
  ${host}     | ${undefined} | ${defaultLink}
  ${host}     | ${true}      | ${popupLink}
  ${host}     | ${false}     | ${defaultLink}
  ${external} | ${undefined} | ${defaultLink}
  ${external} | ${true}      | ${popupLink}
  ${external} | ${false}     | ${defaultLink}
  ${internal} | ${undefined} | ${defaultLink}
  ${internal} | ${true}      | ${popupLink}
  ${internal} | ${false}     | ${defaultLink}
`(
  "in standalone mode, when url is $url and the external prop is $externalProp",
  ({ expected, externalProp, url }) => {
    test(`will ${expected}`, () => {
      let props = { url };
      if (typeof externalProp === "boolean") {
        props = {
          ...props,
          external: externalProp,
        };
      }

      render(
        <TestComponent embedded={false}>
          <UnstyledLink {...props}>Click here</UnstyledLink>
        </TestComponent>
      );

      switch (expected) {
        case "sendMessageLink":
          fireEvent.click(screen.getByRole("link"));
          expect(sendMessage).toHaveBeenCalledWith({
            event: "navigate",
            url,
          });
          break;
        case "popupLink":
          expect(screen.getByRole("link")).toHaveAttribute(
            "rel",
            "noopener noreferrer"
          );
          expect(screen.getByRole("link")).toHaveAttribute("target", "_blank");
          break;
        case "defaultLink":
          expect(screen.getByRole("link")).not.toHaveAttribute("rel");
          expect(screen.getByRole("link")).not.toHaveAttribute("target");
      }
    });
  }
);

test("onClick does not interfere with sendMessage", () => {
  const url = "https://dashboard.envoy.com/about";
  const onClick = jest.fn();

  render(
    <TestComponent embedded>
      <UnstyledLink url={url} onClick={onClick}>
        Click here
      </UnstyledLink>
    </TestComponent>
  );

  fireEvent.click(screen.getByRole("link"));
  expect(sendMessage).toHaveBeenCalledWith({
    event: "navigate",
    url,
  });
  expect(onClick).toHaveBeenCalled();
});
