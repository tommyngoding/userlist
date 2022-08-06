import moment from "moment/moment";
import { users as dummyUsers } from "../dummyUsers";
const { render, screen } = require("@testing-library/react");
const { UserTable } = require("../UserTable");

describe("UserTable", () => {
  it("renders table header", () => {
    render(<UserTable users={[]} />);
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getAllByRole("rowgroup")).toHaveLength(2);
    expect(
      screen.getByRole("columnheader", { name: /username/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: "Name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /email/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /gender/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("columnheader", { name: /registered date/i })
    ).toBeInTheDocument();
  });

  it("renders users", () => {
    const { results } = dummyUsers;
    const users = results;
    render(<UserTable users={users} />);
    expect(
      screen.getByRole("cell", { name: users[0].login.username })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: users[0].name.first + " " + users[0].name.last,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: users[0].email })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", { name: users[0].gender })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("cell", {
        name: moment(users[0].registered.date).format("DD-MM-YYYY"),
      })
    ).toBeInTheDocument();
  });
});
