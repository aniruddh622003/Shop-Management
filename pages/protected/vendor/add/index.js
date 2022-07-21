import React, { useCallback } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "components/shared/InputField";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import VendorService from "/services/Vendor";
import { useRouter } from "next/router";

import VendorForm from "components/vendor/VendorForm";

const AddVendorPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { mutate: newVendor, isLoading: addingVendor } = useMutation(
    VendorService.create,
    {
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
      onSuccess: (res) => {
        console.log(res);
        enqueueSnackbar("Vendor Created", { variant: "success" });
        router.replace("/protected/vendor");
        queryClient.invalidateQueries("users-getall");
      },
    }
  );

  const handleSubmit = useCallback(
    (values) => {
      newVendor({
        name: values.name,
        contact: values.contact,
        address: values.address,
      });
    },
    [newVendor]
  );

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Typography variant="h5" component="div">
        Add Vendor
      </Typography>
      <VendorForm initVals={{}} handleSubmit={handleSubmit} />
    </Box>
  );
};

export default AddVendorPage;
