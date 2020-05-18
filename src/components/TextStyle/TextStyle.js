// @flow
import classNames from "classnames/bind";
import * as React from "react";
import styles from "./TextStyle.module.css";

type Props = {
  /** The content that should get the intended styling */
  children?: React.Node,
  /** Give text additional visual meaning */
  variation?: "subdued" | "positive" | "negative" | "warning",
};

const cx = classNames.bind(styles);

/**
 * Text style enhances text with additional visual meaning. For example, using subdued
 * text to de-emphasize it from its surrounding text.
 */
export const TextStyle = ({
  children,
  variation,
}: Props): React.Element<any> => {
  const className = cx(variation);
  return <span className={className}>{children}</span>;
};
