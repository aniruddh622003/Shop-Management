import React, { useCallback } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "components/shared/InputField";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import ProductService from "services/Products";
import ProductForm from "components/products/ProductForm";

const AddProductPage = () => {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { mutate: newProduct, isLoading: addingProduct } = useMutation(
    ProductService.create,
    {
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
      onSuccess: (res) => {
        console.log(res);
        enqueueSnackbar(res.message, { variant: "success" });
        router.replace("/protected/products");
        queryClient.invalidateQueries("products-getall");
      },
    }
  );

  const handleSubmit = useCallback((values) => {
    // newVendor({
    //   name: values.name,
    //   contact: values.contact,
    //   address: values.address,
    // });
  }, []);

  return (
    <Box
      sx={{
        padding: 3,
      }}
    >
      <Typography variant="h5" component="div">
        Purchase Product(s)
      </Typography>
      <ProductForm
        initVals={{}}
        handleSubmit={handleSubmit}
        buttonText="Purchase Product(s)"
      />
    </Box>
  );
};

export default AddProductPage;
