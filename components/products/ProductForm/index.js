import { Button, Grid } from "@mui/material";
import InputField from "components/shared/InputField";
import SelectWrapper from "components/shared/Select";
import StickyHeadTable from "components/shared/Table";
import { FieldArray, Form, Formik } from "formik";
import { AiFillDelete } from "react-icons/ai";
import React from "react";
import * as Yup from "yup";

const ValidationScheme = Yup.object().shape({
  name: Yup.string().required("Please enter vendor name"),
  contact: Yup.number()
    .required("Please enter contact number")
    .typeError("Contact number should be a number"),
  address: Yup.string().required("Please enter vendor address"),
});

const columns = (remove) => [
  {
    label: "ID",
    id: "_",
    minWidth: 40,
    render: (_, __, id) => <p>{id + 1}</p>,
  },
  {
    label: "Name",
    id: "_",
    minWidth: 70,
    render: (_, __, idx) => (
      <InputField name={`products.${idx}.name`} label="Product Name" />
    ),
  },
  {
    label: "Purchase Price",
    id: "_",
    minWidth: 70,
    render: (_, __, idx) => (
      <InputField
        name={`products.${idx}.buyPrice`}
        label="Purchase Price (In Rs.)"
      />
    ),
  },
  {
    label: "MRP",
    id: "_",
    minWidth: 70,
    render: (_, __, idx) => (
      <InputField name={`products.${idx}.mrp`} label="MRP (In Rs.)" />
    ),
  },
  {
    label: "Quantity",
    id: "_",
    minWidth: 70,
    render: (_, __, idx) => (
      <InputField
        name={`products.${idx}.quantity`}
        label="Quantity (in units)"
      />
    ),
  },
  {
    label: "Vendor",
    id: "_",
    minWidth: 70,
    render: (_, __, idx) => (
      <InputField
        name={`products.${idx}.quantity`}
        label="Quantity (in units)"
      />
    ),
  },
  {
    label: "Action",
    id: "_",
    minWidth: 40,
    render: (_, __, idx) => (
      <Button color="error" onClick={() => remove(idx)}>
        <AiFillDelete fontSize="20px" />
      </Button>
    ),
  },
];

const initialValues = {
  products: [
    {
      name: "",
      buyPrice: "",
      mrp: "",
      quantity: "",
      vendorID: "",
    },
  ],
};

const ProductForm = ({ initVals, handleSubmit, buttonText }) => {
  return (
    <Formik
      initialValues={{ ...initialValues, ...initVals }}
      validationSchema={ValidationScheme}
      onSubmit={handleSubmit}
    >
      {({ values }) => (
        <Form style={{ width: "100%" }}>
          <Grid container mt={5} columnSpacing={3}>
            <Grid item md={6}>
              <SelectWrapper
                name="modeOfPayment"
                label="Mode Of Payment"
                color="secondary"
                sx={{ mb: 2 }}
                options={[
                  { value: "cash", label: "Cash" },
                  { value: "online", label: "Online" },
                ]}
              />
            </Grid>
            <Grid item md={6}></Grid>
            <Grid item md={12}>
              <InputField
                name="note"
                label="Purchase Note (Optional)"
                sx={{ mb: 2 }}
                multiline
                minRows={2}
              />
            </Grid>
            <Grid item md={12}>
              <FieldArray name="products">
                {({ insert, remove, push }) => (
                  <div>
                    {console.log(values.products)}
                    <StickyHeadTable
                      rows={values.products}
                      columns={columns(remove)}
                    />
                    <Button
                      sx={{ mt: 1 }}
                      color="secondary"
                      onClick={() =>
                        push({
                          name: "",
                          buyPrice: "",
                          mrp: "",
                          quantity: "",
                          vendorID: "",
                        })
                      }
                    >
                      + Add Product
                    </Button>
                  </div>
                )}
              </FieldArray>
            </Grid>
            <Grid item md={12}>
              <Button
                sx={{ mt: 5 }}
                variant="contained"
                color="secondary"
                type="submit"
              >
                {buttonText}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
