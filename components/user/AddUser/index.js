import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import InputField from "../../shared/InputField";
import styles from "./index.module.css";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import UserService from "../../../services/Users";
import queryClient from "../../../helpers/queryClient";

const ValidationScheme = Yup.object().shape({
  username: Yup.string().required("Please enter a username"),
  password: Yup.string().required("Please enter a password"),
});

const AddUser = ({ open, handleClose }) => {
  const [superPass, setSuperPass] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const { mutate: newUser, isLoading: addingUser } = useMutation(
    UserService.create,
    {
      onError: (err) => {
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      },
      onSuccess: (res) => {
        console.log(res);
        enqueueSnackbar("User Created", { variant: "success" });
        handleClose();
        queryClient.invalidateQueries("users-getall");
      },
    }
  );

  useEffect(() => {
    if (!open) setSuperPass("");
  }, [open]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    boxShadow: 24,
    p: 4,
    borderRadius: 5,
  };

  const handleSubmit = useCallback(
    (values) => {
      if (superPass !== process.env.superKey) {
        enqueueSnackbar("Wrong Superpass", {
          variant: "error",
        });
        return;
      }
      console.log(superPass);
      newUser({ username: values.username, password: values.password });
      handleClose();
    },
    [newUser, enqueueSnackbar, handleClose, superPass]
  );

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className={styles.box}>
        <Typography id="modal-modal-title" variant="h5" component="h2" mb={5}>
          Add User
        </Typography>
        <Formik
          initialValues={{}}
          validationSchema={ValidationScheme}
          onSubmit={handleSubmit}
        >
          <Form autoComplete="off" style={{ width: "100%" }}>
            <InputField name="username" label="Username" sx={{ mb: 1 }} />
            <InputField name="password" label="Password" sx={{ mb: 1 }} />
            <TextField
              name="superpass"
              label="Super Password"
              type="password"
              fullWidth
              color="secondary"
              value={superPass}
              onChange={(e) => setSuperPass(e.target.value)}
              sx={{ mb: 1 }}
            />
            <Button variant="contained" color="secondary" type="submit">
              Create User
            </Button>
          </Form>
        </Formik>
      </Box>
    </Modal>
  );
};

export default AddUser;
