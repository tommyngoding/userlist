import { render, screen } from "@testing-library/react";
import App from "../App";
import { users as dummyUsers } from "../dummyUsers";
import user from "@testing-library/user-event";

describe("App", () => {
  const fetchResponseOk = (body) =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(body),
    });

  beforeEach(() => {
    jest.spyOn(window, "fetch").mockReturnValue(fetchResponseOk(dummyUsers));
  });

  afterEach(() => {
    window.fetch.mockRestore();
  });

  it("renders users", async () => {
    const { results } = dummyUsers;
    render(<App />);
    expect(window.fetch).toHaveBeenCalledTimes(1);
    expect(window.fetch).toHaveBeenCalledWith(
      "https://randomuser.me/api/?page=1&pageSize=10&results=10"
    );
    expect(
      await screen.findByRole("cell", {
        name: results[0].name.first + " " + results[0].name.last,
      })
    ).toBeInTheDocument();
  });

  it("calls api again when filter gender on select", async () => {
    render(<App />);
    user.selectOptions(screen.getByRole("combobox"), ["male"]);
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenLastCalledWith(
      "https://randomuser.me/api/?page=1&pageSize=10&results=10&gender=male"
    );
  });

  it("calls api again when filter search button on click", async () => {
    render(<App />);
    user.type(screen.getByRole("textbox", { name: /search/i }), "susan");
    user.click(screen.getByTestId("filter-keyword"));
    expect(window.fetch).toHaveBeenCalledTimes(2);
    expect(window.fetch).toHaveBeenLastCalledWith(
      "https://randomuser.me/api/?page=1&pageSize=10&results=10&keyword=susan"
    );
  });

  it("calls api when reset filter is clicked", async () => {
    render(<App />);
    user.type(screen.getByRole("textbox", { name: /search/i }), "susan");
    user.click(screen.getByTestId("filter-keyword"));
    user.click(screen.getByRole("button", { name: /reset filter/i }));
    expect(window.fetch).toHaveBeenCalledTimes(3);
    expect(window.fetch).toHaveBeenLastCalledWith(
      "https://randomuser.me/api/?page=1&pageSize=10&results=10"
    );
  });
});
