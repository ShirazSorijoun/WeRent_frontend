/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/user-service";
import { IUser } from "../../services/user-service";
import { handleRequestWithToken } from "../../services/handleRequestWithToken";
import { DataGrid, GridColDef } from "@mui/x-data-grid";


const AllUsersAdmin: React.FC = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 400 },
    { field: "Name", headerName: "Name", width: 160 },
    { field: "Email", headerName: "Email", width: 300 },
    { field: "Role", headerName: "Role", width: 200 },
  ];

  const [users, setUsers] = useState<IUser[]>([]);


  useEffect(() => {
    const fetchUsers = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        console.error("User ID not found in local storage");
        return;
      }

      const tokenRefreshed = await handleRequestWithToken();

      if (!tokenRefreshed) {
        console.log("Token refresh failed");
        return;
      }

      const token = localStorage.getItem("accessToken");
      try {
        const { req } = getAllUsers(token || "");
        const response = await req;
        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching users");
      }
    };

    fetchUsers();
  }, []);


  const rows = users.map((user) => ({
    id: user._id,
    Name: user.name,
    Email: user.email,
    Role: user.roles,
  }));

  return (
    <div
      style={{
        marginTop: "5%",
        marginBottom: "30%",
        height: 400,
        width: "80%",
        margin: "auto",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        autoPageSize
        checkboxSelection
        pageSizeOptions={[0, 10]}
      />
    </div>
  );
};

export default AllUsersAdmin;
