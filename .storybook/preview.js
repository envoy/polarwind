import { addDecorator } from "@storybook/react";
import { withA11y } from "@storybook/addon-a11y";
import "../src/styles/common.css";

addDecorator(withA11y);
