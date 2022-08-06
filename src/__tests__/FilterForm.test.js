import { render, screen } from "@testing-library/react";
import { FilterForm } from "../FilterForm";
import user from "@testing-library/user-event";

describe("FilterForm", () => {
  it("renders search field, gender option and reset filter button", () => {
    render(<FilterForm filterOnChange={jest.fn()} />);
    expect(
      screen.getByRole("textbox", { name: /search/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("combobox", { name: /gender/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: /all/i })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Male" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Female" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /reset filter/i })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search.../i)).toBeInTheDocument();
    expect(screen.getByTestId("filter-keyword")).toBeInTheDocument();
  });

  it("resets search box and combobox when reset button is clicked", () => {
    render(<FilterForm filterOnChange={jest.fn()} />);
    user.type(screen.getByRole("textbox", { name: /search/i }), "susan");
    expect(screen.getByDisplayValue("susan")).toBeInTheDocument();
    user.click(screen.getByRole("button", { name: /reset filter/i }));
    expect(screen.queryByDisplayValue("susan")).not.toBeInTheDocument();
    expect(screen.getByRole("option", { name: "All" }).selected).toBe(true);
    user.selectOptions(screen.getByRole("combobox"), ["male"]);
    expect(screen.getByRole("option", { name: "Male" }).selected).toBe(true);
    user.click(screen.getByRole("button", { name: /reset filter/i }));
    expect(screen.getByRole("option", { name: "All" }).selected).toBe(true);
  });
});
