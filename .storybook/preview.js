import { addDecorator, addParameters } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import { withPlayroom } from "storybook-addon-playroom";
import "!style-loader!css-loader!postcss-loader!../src/styles/common.css";

addDecorator(withPlayroom);
addDecorator(withA11y);

addParameters({
  playroom: {
    // Because Playroom is built inside Storybook when deployed as a static doc site, we
    // must define the absolute path to it when NODE_ENV is production, otherwise set
    // undefined to use the default Playroom URL (localhost)
    url:
      process.env.NODE_ENV === "production"
        ? "/polarwind/playroom/"
        : undefined,
    reactElementToJSXStringOptions: {
      displayName: (element) => {
        const {
          type: { displayName, name },
          props: { originalType },
        } = element;
        // handle MDX hijacking html elements and converting them to `MDXCreateElement`.
        // Playroom chokes on this as it can't find MDXCreateElement, so we're returning
        // the original html tag it once was
        return displayName === "MDXCreateElement"
          ? originalType
          : displayName || name;
      },
      filterProps: ["mdxType", "originalType"],
    },
  },
});
