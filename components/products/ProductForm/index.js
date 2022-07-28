import { Button, Grid } from "@mui/material";
import InputField from "components/shared/InputField";
import SelectWrapper from "components/shared/Select";
import StickyHeadTable from "components/shared/Table";
import { FieldArray, Form, Formik } from "formik";
import { AiFillDelete } from "react-icons/ai";
import React from "react";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import VendorService from "services/Vendor";

const ValidationScheme = Yup.object().shape({
  modeOfPayment: Yup.string().required("Enter mode of payment"),
  products: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Enter product name"),
      buyPrice: Yup.number()
        .typeError("Buy Price must be a number")
        .min(0, "Postive values allowed")
        .required("Enter buy price"),
      mrp: Yup.number()
        .typeError("MRP must be a number")
        .min(0, "Postive values allowed")
        .required("Enter MRP"),
      quantity: Yup.number()
        .typeError("Quantity must be a number")
        .min(0, "Postive values allowed")
        .required("Enter Quantity"),
      vendorID: Yup.number().required("Please Select a vendor"),
    })
  ),
});

const columns = (remove, vendorOptions) => [
  {
    label: "ID",
    id: "id",
    minWidth: 40,
    render: (_, __, id) => <p>{id + 1}</p>,
  },
  {
    label: "Name",
    id: "name",
    minWidth: 70,
    render: (_, __, idx) => (
      <InputField name={`products.${idx}.name`} label="Product Name" />
    ),
  },
  {
    label: "Purchase Price",
    id: "buy",
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
    id: "mrp",
    minWidth: 70,
    render: (_, __, idx) => (
      <InputField name={`products.${idx}.mrp`} label="MRP (In Rs.)" />
    ),
  },
  {
    label: "Quantity",
    id: "quantity",
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
    id: "vendor",
    minWidth: 200,
    render: (_, __, idx) => (
      <SelectWrapper
        name={`products.${idx}.vendorID`}
        label="Select Vendor"
        color="secondary"
        options={[
          ...vendorOptions.map((ele) => ({ value: ele.id, label: ele.name })),
        ]}
      />
    ),
  },
  {
    label: "Action",
    id: "action",
    minWidth: 40,
    render: (_, __, idx) => (
      <Button color="error" onClick={() => remove(idx)}>
        <AiFillDelete fontSize="20px" />
      </Button>
    ),
  },
];

const initialValues = {
  modeOfPayment: "",
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
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { data: vendors, isLoading } = useQuery(
    ["vendors-getall"],
    () => VendorService.getAll(),
    {
      onSuccess: (res) => {},
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
    }
  );

  return (
    <div style={{ overflowX: "hidden" }}>
      <Formik
        initialValues={{ ...initialValues, ...initVals }}
        validateOnChange={false}
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
                      {!isLoading ? (
                        <StickyHeadTable
                          rows={values.products}
                          columns={columns(remove, vendors)}
                          maxHeight={380}
                        />
                      ) : (
                        <p>Loading...</p>
                      )}
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
    </div>
  );
};

export default ProductForm;
