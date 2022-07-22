import { Box, Typography } from "@mui/material";
import VendorForm from "components/vendor/VendorForm";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import VendorService from "services/Vendor";

const EditVendorPage = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  console.log(router.query);
  const queryClient = useQueryClient();
  const { id } = router.query;
  const { data: vendor, isLoading } = useQuery(
    ["vendor-getbyid", id],
    () => VendorService.getByID({ id: id }),
    {
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
    }
  );

  const { mutate: updateVendor, isLoading: isUpdateLoading } = useMutation(
    VendorService.update,
    {
      onSuccess: async (res) => {
        console.log(res);
        enqueueSnackbar("Vendor Updated", { variant: "success" });
        await queryClient.invalidateQueries("vendors-getall");
        await queryClient.invalidateQueries("vendor-getbyid");
        router.replace("/protected/vendor");
      },
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
    }
  );

  const handleSubmit = useCallback(
    (values) => {
      updateVendor({
        id: id,
        data: {
          name: values.name,
          contact: values.contact,
          address: values.address,
        },
      });
    },
    [id, updateVendor]
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
      {!isLoading && (
        <VendorForm
          initVals={{ ...vendor }}
          handleSubmit={handleSubmit}
          buttonText="Save Vendor"
        />
      )}
    </Box>
  );
};

export default EditVendorPage;
