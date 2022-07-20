import React, { useCallback } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import { Formik, Form } from "formik";
import InputField from "../../../../components/shared/InputField";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import VendorService from "../../../../services/Vendor";
import { useRouter } from "next/router";
import * as Yup from "yup";

const ValidationScheme = Yup.object().shape({
  name: Yup.string().required("Please enter vendor name"),
  contact: Yup.number()
    .required("Please enter contact number")
    .typeError("Contact number should be a number"),
  address: Yup.string().required("Please enter vendor address"),
});

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
      <Formik
        initialValues={{}}
        validationSchema={ValidationScheme}
        onSubmit={handleSubmit}
      >
        <Form style={{ width: "100%" }}>
          <Grid container mt={5} columnSpacing={3}>
            <Grid item md={6}>
              <InputField name="name" label="Vendor Name" sx={{ mb: 1 }} />
            </Grid>
            <Grid item md={6}>
              <InputField name="contact" label="Contact" sx={{ mb: 1 }} />
            </Grid>
            <Grid item md={12}>
              <InputField
                name="address"
                label="Vendor Address"
                sx={{ mb: 1 }}
                multiline
                minRows={4}
              />
              <Button variant="contained" color="secondary" type="submit">
                Create Vendor
              </Button>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Box>
  );
};

export default AddVendorPage;
