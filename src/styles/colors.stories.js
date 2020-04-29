import { storiesOf } from "@storybook/react";
import classnames from "classnames/bind";
import ColorCheck from "color";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";
import styles from "./colors.module.css";

const cx = classnames.bind(styles);

const {
  theme: { colors },
} = resolveConfig(tailwindConfig);

// eslint-disable-next-line
function Color({ color, hex }) {
  const className = cx(
    "first:rounded-t",
    "last:rounded-b",
    "p-4",
    "flex",
    "justify-between",
    "w-1/3",
    `bg-${color}`,
    {
      "text-white": ColorCheck(hex).isDark(),
      "text-black": ColorCheck(hex).isLight(),
    }
  );
  return (
    <div className={className}>
      <span>{color}</span>
      <span>{hex}</span>
    </div>
  );
}

const stories = storiesOf("Design | Colors", module);

Object.entries(colors)
  .filter(([key]) => !["transparent", "current"].includes(key))
  .forEach(([key, value]) => {
    if (typeof value === "string") {
      stories.add(key, () => <Color color={key} hex={value} />);
    } else {
      stories.add(key, () =>
        Object.entries(value).map(([subkey, subvalue]) => {
          const color = `${key}-${subkey}`;
          return <Color key={color} color={color} hex={subvalue} />;
        })
      );
    }
  });
