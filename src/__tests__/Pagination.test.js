import { render, screen } from "@testing-library/react";
import { Pagination } from "../Pagination";

describe("Pagination", () => {
  it("renders page numbers", () => {
    render(
      <Pagination
        results={10}
        pageSize={5}
        pageNumberOnClick={jest.fn()}
        currentPage={1}
      />
    );
    expect(screen.getByRole("button", { name: /1/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /2/i })).toBeInTheDocument();
  });
});
