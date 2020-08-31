import { act, fireEvent, render, screen, within } from "@testing-library/react";
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

test("when value is not set, it defaults to the first item", () => {
  render(
    <Select
      label="test"
      options={[
        { label: "Hello", value: "one" },
        { label: "World", value: "two" },
      ]}
    />
  );
  expect(screen.getByRole("button")).toHaveTextContent("Hello");
});

test("supports options as an array of strings", () => {
  render(
    <Select label="test" options={["Red", "Green", "Blue"]} value="Blue" />
  );
  expect(screen.getByRole("button")).toHaveTextContent("Blue");
});

test("supports options as an array of label and value objects", () => {
  render(
    <Select
      label="test"
      options={[
        { label: "Red", value: "r" },
        { label: "Green", value: "g" },
        { disabled: true, label: "Blue", value: "b" },
      ]}
      value="g"
    />
  );
  expect(screen.getByRole("button")).toHaveTextContent("Green");

  fireEvent.click(screen.getByRole("button"));

  const listbox = screen.getByRole("listbox");
  let items = within(listbox).getAllByRole("option");
  expect(items).toHaveLength(3);
  expect(items[2]).toHaveAttribute("aria-disabled", "true");
});

test("supports grouped options", () => {
  render(
    <Select
      label="test"
      options={[
        {
          options: [
            { label: "Red", value: "r" },
            { disabled: true, label: "Green", value: "g" },
            { label: "Blue", value: "b" },
          ],
          title: "Color",
        },
        {
          options: ["Small", "Medium", "Large"],
          title: "Size",
        },
      ]}
    />
  );
  const button = screen.getByRole("button");
  expect(button).toHaveTextContent("Red");

  fireEvent.click(button);

  const listbox = screen.getByRole("listbox");
  const optionGroups = within(listbox).getAllByRole("presentation");
  expect(optionGroups).toHaveLength(2);
  expect(optionGroups[0]).toHaveTextContent("Color");
  expect(optionGroups[1]).toHaveTextContent("Size");
  let items = within(listbox).getAllByRole("option");
  expect(items).toHaveLength(6);
  expect(items[0]).toHaveTextContent("Red");
  expect(items[1]).toHaveTextContent("Green");
  expect(items[1]).toHaveAttribute("aria-disabled", "true");
  expect(items[2]).toHaveTextContent("Blue");
  expect(items[3]).toHaveTextContent("Small");
  expect(items[4]).toHaveTextContent("Medium");
  expect(items[5]).toHaveTextContent("Large");
});
