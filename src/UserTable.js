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

export const UserTable = ({ users, columnHeaderOnClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell onClick={() => columnHeaderOnClick("name")}>
              Name
            </TableCell>
            <TableCell onClick={() => columnHeaderOnClick("email")}>
              Email
            </TableCell>
            <TableCell onClick={() => columnHeaderOnClick("gender")}>
              Gender
            </TableCell>
            <TableCell onClick={() => columnHeaderOnClick("registereddate")}>
              Registered Date
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
