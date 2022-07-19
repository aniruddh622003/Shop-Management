import React from "react";
import { useMutation, useQuery } from "react-query";
import UserService from "../../../services/Users";
import { drawerWidth } from "../../../utils/constants";
import {
  Box,
  Button,
  Chip,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import styles from "./index.module.css";
import StickyHeadTable from "../../../components/shared/Table";
import EllipsesDowpdown from "../../../components/shared/EllipsesDropdown";
import AddUser from "../../../components/user/AddUser";
import { useSnackbar } from "notistack";
import queryClient from "../../../helpers/queryClient";

const UserList = () => {
  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { data: users, isLoading } = useQuery(
    ["users-getall"],
    () => UserService.getAll(),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
    }
  );

  const { mutate: changeStatus, isLoading: statusLoading } = useMutation(
    UserService.changeStatus,
    {
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
      onSuccess: (_) => {
        enqueueSnackbar("Status Changes", { variant: "success" });
        queryClient.invalidateQueries("users-getall");
      },
    }
  );

  const changeUserStatus = (row) => {
    console.log(row);
    changeStatus({ id: row.id, body: { enabled: !row.enabled } });
  };

  const dropDown = (row) => (
    <div>
      <MenuItem onClick={() => changeUserStatus(row)}>
        {row.enabled ? "Disable User" : "Enable User"}
      </MenuItem>
    </div>
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
        <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }} mb={3}>
          <Typography variant="h6" component="div">
            All Users
          </Typography>
          <Button
            sx={{ color: "#fff", border: "1px solid #ffffff99" }}
            onClick={() => setAddUserOpen(true)}
          >
            Add User
          </Button>
        </Box>

        {!isLoading ? (
          <div>
            <StickyHeadTable rows={users} columns={columns} />
          </div>
        ) : (
          "Loading"
        )}
      </Box>
      <AddUser open={addUserOpen} handleClose={() => setAddUserOpen(false)} />
    </div>
  );
};

export default UserList;
