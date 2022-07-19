import React from "react";
import { useQuery } from "react-query";
import UserService from "../../../services/Users";
import { drawerWidth } from "../../../utils/constants";
import { Box, Chip, MenuItem, Toolbar, Typography } from "@mui/material";
import styles from "./index.module.css";
import StickyHeadTable from "../../../components/shared/Table";
import EllipsesDowpdown from "../../../components/shared/EllipsesDropdown";

const UserList = () => {
  const { data: users, isLoading } = useQuery(
    ["users-getall"],
    () => UserService.getAll(),
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );

  const dropDown = (row) => (
    <>
      <MenuItem>{row.enabled ? "Disable User" : "Enable User"}</MenuItem>
    </>
  );

  const columns = [
    {
      label: "ID",
      id: "id",
      minWidth: 70,
    },
    {
      label: "Username",
      id: "username",
      minWidth: 170,
    },
    {
      label: "Enabled",
      id: "enabled",
      minWidth: 170,
      render: (ele) => (
        <Chip label={ele ? "Yes" : "No"} color={ele ? "success" : "error"} />
      ),
    },

    {
      title: "Action",
      key: "action",
      align: "right",
      render: (_, record) => (
        <>
          <EllipsesDowpdown menu={dropDown(record)} />
        </>
      ),
      minWidth: 50,
    },
  ];

  return (
    <div className={styles.cont}>
      <Toolbar />
      <Box
        sx={{
          width: `calc(100vw - ${drawerWidth}px)`,
          marginLeft: drawerWidth + "px",
          padding: 3,
        }}
      >
        {console.log(users)}
        <Typography variant="h6" component="div" mb={3}>
          All Users
        </Typography>
        {!isLoading ? (
          <div>
            <StickyHeadTable rows={users} columns={columns} />
          </div>
        ) : (
          "Loading"
        )}
      </Box>
    </div>
  );
};

export default UserList;
