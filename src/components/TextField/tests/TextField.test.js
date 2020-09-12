import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { TextField } from "../TextField";

test("can type in an uncontrolled text field", () => {
  render(<TextField label="test" />);
  const input = screen.getByLabelText("test");
  fireEvent.change(input, { target: { value: "uncontrolled" } });
  expect(input).toHaveValue("uncontrolled");
  fireEvent.change(input, { target: { value: "more" } });
  expect(input).toHaveValue("more");
});

test("can type in a controlled text field", () => {
  function ControlledTextField() {
    const [value, setValue] = useState();
    return <TextField label="test" value={value} onChange={setValue} />;
  }
  render(<ControlledTextField />);
  const input = screen.getByLabelText("test");
  fireEvent.change(input, { target: { value: "controlled" } });
  expect(input).toHaveValue("controlled");
  fireEvent.change(input, { target: { value: "more" } });
  expect(input).toHaveValue("more");
});
