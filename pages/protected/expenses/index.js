import React, { useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { FiPhoneCall } from "react-icons/fi";
import {
  Box,
  Button,
  Chip,
  Grid,
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
import TransactionService from "services/Transactions";
import { format } from "date-fns";
import DonutChartWidget from "components/shared/DonutChartWidget";

const ProductList = () => {
  const [totalExpense, setTotalExpense] = useState(0);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: expenses, isLoading } = useQuery(
    ["expenses-getall"],
    () => TransactionService.getAllExpenses(),
    {
      onSuccess: (res) => {
        console.log(res);
        const sum = res.reduce((partialSum, a) => partialSum + a.Amount, 0);
        setTotalExpense(sum);
      },
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
    }
  );

  const randomColor = (index) => {
    return (
      "#" +
      Math.floor(index * 0.0003 * 16777215)
        .toString(16)
        .padStart(6, "0")
        .toUpperCase()
    );
  };

  const chartData = useMemo(() => {
    const modifyData = expenses?.map((data, index) => {
      return { ...data, color: randomColor(index + 1) };
    });

    console.log("modified", modifyData);
    return modifyData;
  }, [expenses]);

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
      label: "Date & Time",
      id: "Date_Time",
      minWidth: 170,
      render: (ele) => <p>{format(new Date(ele), "do-MMM-yy hh:mm aaa")}</p>,
    },
    {
      label: "Purchased By",
      id: "purchase.PurchasedBy.username",
      minWidth: 170,
    },
    {
      label: "Note",
      id: "purchase.Note",
      minWidth: 170,
    },
    {
      label: "Mode Of Payment",
      id: "ModeOfPayment",
      minWidth: 170,
      render: (ele) => (
        <Chip
          label={ele}
          sx={{ textTransform: "uppercase" }}
          color={ele == "cash" ? "success" : "info"}
          variant="outlined"
        />
      ),
    },
    {
      label: "Amount",
      id: "Amount",
      minWidth: 170,
      render: (ele) => <p>₹ {ele}</p>,
    },
    // {
    //   label: "Vendor",
    //   id: "vendor",
    //   minWidth: 170,
    //   render: (ele) =>
    //     ele.map((vendor) => <p key={`vendor-${vendor.name}`}>{vendor.name}</p>),
    // },
    // {
    //   label: "Quantity",
    //   id: "Quantity",
    //   minWidth: 100,
    //   render: (ele) => <p>{ele} units</p>,
    // },
    // {
    //   label: "Buy Price",
    //   id: "BuyPrice",
    //   minWidth: 100,
    //   render: (ele) => <p>₹ {ele}</p>,
    // },
    // {
    //   label: "MRP",
    //   id: "MRP",
    //   minWidth: 100,
    //   render: (ele) => <p>₹ {ele}</p>,
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

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  });

  const series = [
    {
      name: "Height in feet",
      data: [2722, 2080, 2063, 1972, 1516],
    },
  ];

  return (
    <div className={styles.cont}>
      <Box
        sx={{
          padding: 3,
        }}
      >
        <Typography variant="h5" component="div">
          Total Expenditure
        </Typography>

        <Typography variant="h3" component="div" mb={5}>
          {formatter.format(totalExpense)}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: "30px" }} mb={3}>
          <Typography variant="h6" component="div">
            See Your Expenses
          </Typography>
        </Box>

        {!isLoading ? (
          <div>
            <StickyHeadTable rows={expenses} columns={columns} />
          </div>
        ) : (
          "Loading"
        )}
      </Box>
    </div>
  );
};

export default ProductList;
