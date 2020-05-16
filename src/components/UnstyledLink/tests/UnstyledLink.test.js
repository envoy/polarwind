import { fireEvent, render, screen } from "@testing-library/react";
import { EmbeddedContext } from "../../../utils/embedded";
import { OriginContext } from "../../../utils/origin";
import { ParentContext } from "../../../utils/parent";
import { UnstyledLink } from "../UnstyledLink";

const sendMessage = jest.fn();

const external = "https://www.google.com/about";
const host = "https://dashboard.envoy.com/about";
const internal = "/about";
const sendMessageLink = "sendMessageLink";
const popupLink = "popupLink";
const defaultLink = "defaultLink";

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
        <EmbeddedContext.Provider value={true}>
          <OriginContext.Provider value="https://dashboard.envoy.com">
            <ParentContext.Provider value={{ sendMessage }}>
              <UnstyledLink {...props}>Click here</UnstyledLink>
            </ParentContext.Provider>
          </OriginContext.Provider>
        </EmbeddedContext.Provider>
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
        <EmbeddedContext.Provider value={false}>
          <OriginContext.Provider value="https://dashboard.envoy.com">
            <ParentContext.Provider value={{ sendMessage }}>
              <UnstyledLink {...props}>Click here</UnstyledLink>
            </ParentContext.Provider>
          </OriginContext.Provider>
        </EmbeddedContext.Provider>
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
