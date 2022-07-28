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
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import ProductService from "services/Products";

const ProductList = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: vendors, isLoading } = useQuery(
    ["products-getall"],
    () => ProductService.getAll(),
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
      label: "Vendor",
      id: "vendor",
      minWidth: 170,
      render: (ele) =>
        ele.map((vendor) => <p key={`vendor-${vendor.name}`}>{vendor.name}</p>),
    },
    {
      label: "Quantity",
      id: "Quantity",
      minWidth: 100,
      render: (ele) => <p>{ele} units</p>,
    },
    {
      label: "Buy Price",
      id: "BuyPrice",
      minWidth: 100,
      render: (ele) => <p>₹ {ele}</p>,
    },
    {
      label: "MRP",
      id: "MRP",
      minWidth: 100,
      render: (ele) => <p>₹ {ele}</p>,
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
      <Box
        sx={{
          padding: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }} mb={3}>
          <Typography variant="h6" component="div">
            All Products
          </Typography>
          <Button
            sx={{ color: "#fff", border: "1px solid #ffffff99" }}
            onClick={() => router.push(`/protected/products/add`)}
          >
            Add Product
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

export default ProductList;
