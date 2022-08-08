import "antd/dist/antd.css";
import { CaretUpOutlined, CaretDownOutlined } from "@ant-design/icons";
import {
  Table,
  Paper,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import moment from "moment/moment";

export const UserTable = ({ users, columnHeaderOnClick, ascendingSort }) => {
  const CaretIcons = ({ isAscending }) => {
    const isLightOnUp = isAscending === null ? false : isAscending;
    const isLightOnDown = isAscending === null ? false : !isAscending;
    return (
      <span>
        <CaretUpOutlined
          style={{ color: isLightOnUp ? "#1890FF" : "#dbdbdb" }}
        />
        <CaretDownOutlined
          style={{ color: isLightOnDown ? "#1890FF" : "#dbdbdb" }}
        />
      </span>
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell
              onClick={() => columnHeaderOnClick("name")}
              className="column-header"
              data-testid="columnheader-name"
            >
              Name <CaretIcons isAscending={ascendingSort.name} />
            </TableCell>
            <TableCell
              onClick={() => columnHeaderOnClick("email")}
              className="column-header"
              data-testid="columnheader-email"
            >
              Email
              <CaretIcons isAscending={ascendingSort.email} />
            </TableCell>
            <TableCell
              onClick={() => columnHeaderOnClick("gender")}
              className="column-header"
              data-testid="columnheader-gender"
            >
              Gender
              <CaretIcons isAscending={ascendingSort.gender} />
            </TableCell>
            <TableCell
              onClick={() => columnHeaderOnClick("registereddate")}
              className="column-header"
              data-testid="columnheader-registereddate"
            >
              Registered Date
              <CaretIcons isAscending={ascendingSort.registereddate} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.login.username}>
              <TableCell>{user.login.username}</TableCell>
              <TableCell>{user.name.first + " " + user.name.last}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.gender}</TableCell>
              <TableCell>
                {moment(user.registered.date).format("DD-MM-YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

UserTable.defaultProps = {
  ascendingSort: {
    email: false,
    name: false,
    gender: false,
    registereddate: false,
  },
};
