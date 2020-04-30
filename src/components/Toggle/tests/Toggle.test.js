import { render, fireEvent } from "@testing-library/react";
import { Toggle } from "../Toggle";

test("fires the onClick handler when spacebar is pressed", () => {
  expect.assertions(1);

  const handleClick = () => expect(true).toBe(true);
  const { container } = render(<Toggle onClick={handleClick} />);

  fireEvent.keyDown(container.firstChild, { keyCode: 32 });
});

test("does not fire the onClick handler when any other key is pressed", () => {
  expect.assertions(0);

  const handleClick = () => expect(true).toBe(true);
  const { container } = render(<Toggle onClick={handleClick} />);

  fireEvent.keyDown(container.firstChild, { keyCode: 13 });
});
