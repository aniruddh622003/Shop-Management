import { Button, Grid } from "@mui/material";
import InputField from "components/shared/InputField";
import { Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";

const ValidationScheme = Yup.object().shape({
  name: Yup.string().required("Please enter vendor name"),
  contact: Yup.number()
    .required("Please enter contact number")
    .typeError("Contact number should be a number"),
  address: Yup.string().required("Please enter vendor address"),
});

const VendorForm = ({ initVals, handleSubmit }) => {
  return (
    <Formik
      initialValues={initVals}
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
  );
};

export default VendorForm;
