import React from "react";
import { useMutation, useQuery } from "react-query";
import { FiPhoneCall } from "react-icons/fi";
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
import VendorService from "../../../services/Vendor";
import { useRouter } from "next/router";

const UserList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: vendors, isLoading } = useQuery(
    ["vendors-getall"],
    () => VendorService.getAll(),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
    }
  );

  const dropDown = (row) => (
    <div>
      <MenuItem>View Products</MenuItem>
      <MenuItem onClick={() => router.push(`/protected/vendor/edit/${row.id}`)}>
        Edit Vendor
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
      label: "Name",
      id: "name",
      minWidth: 170,
    },
    {
      label: "Address",
      id: "address",
      minWidth: 250,
    },
    {
      label: "Contact",
      id: "contact",
      minWidth: 170,
      render: (ele) => (
        <a href={`tel:${ele}`}>
          <Button sx={{ color: "#fff" }} color="success" variant="outlined">
            <FiPhoneCall style={{ marginRight: "10px" }} />
            {ele}
          </Button>
        </a>
      ),
    },
    // {
    //   label: "Enabled",
    //   id: "enabled",
    //   minWidth: 170,
    //   render: (ele) => (
    //     <Chip label={ele ? "Yes" : "No"} color={ele ? "success" : "error"} />
    //   ),
    // },

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
      <Box
        sx={{
          padding: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }} mb={3}>
          <Typography variant="h6" component="div">
            All Vendors
          </Typography>
          <Button
            sx={{ color: "#fff", border: "1px solid #ffffff99" }}
            onClick={() => router.push(`/protected/vendor/add`)}
          >
            Add Vendor
          </Button>
        </Box>

        {!isLoading ? (
          <div>
            <StickyHeadTable rows={vendors} columns={columns} />
          </div>
        ) : (
          "Loading"
        )}
      </Box>
    </div>
  );
};

export default UserList;
