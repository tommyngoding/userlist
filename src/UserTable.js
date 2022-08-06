import moment from "moment/moment";
export const UserTable = ({ users }) => {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Registered Date</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.login.username}>
              <td>{user.login.username}</td>
              <td>{user.name.first + " " + user.name.last}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{moment(user.registered.date).format("DD-MM-YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
