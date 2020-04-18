import styles from "./Button.module.css";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const Button = ({ children, disabled, size = "medium" }) => {
  const className = cx({
    Button: true,
    medium: size === "medium",
    slim: size === "slim",
    large: size === "large",
    disabled,
  });

  return (
    <button className={className} disabled={disabled}>
      {children}
    </button>
  );
};
