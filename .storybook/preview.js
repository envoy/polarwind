import { addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import "!style-loader!css-loader!postcss-loader!../src/styles/common.css";

addDecorator(withA11y);
