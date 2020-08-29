import { act, render, screen } from "@testing-library/react";
import { useEffect, useState } from "react";
import { Select } from "../Select";

test("when options and value are both present", () => {
  render(
    <Select
      label="test"
      options={[
        { label: "Hello", value: "one" },
        { label: "World", value: "two" },
      ]}
      value="two"
    />
  );
  expect(screen.getByDisplayValue("World")).not.toBeNull();
});

test("when options is set later", () => {
  jest.useFakeTimers();

  const AsyncSelect = () => {
    const [options, setOptions] = useState([]);
    useEffect(() => {
      setTimeout(() => {
        act(() => {
          setOptions([
            { label: "Hello", value: "one" },
            { label: "World", value: "two" },
          ]);
        });
      }, 1000);
    }, []);
    return <Select label="test" options={options} value="two" />;
  };
  render(<AsyncSelect />);
  expect(screen.getByRole("button")).not.toHaveTextContent();

  jest.runAllTimers();
  expect(screen.getByRole("button")).toHaveTextContent("World");
});
