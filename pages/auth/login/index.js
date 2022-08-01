import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { useSnackbar } from "notistack";
import { Box, Button, Grid, TextField } from "@mui/material";
import { useMutation } from "react-query";
import AuthService from "../../../services/Auth";
import { useRouter } from "next/router";
import AddUser from "components/user/AddUser";

const Login = () => {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [addUserOpen, setAddUserOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  useEffect(() => {
    const jwt = localStorage.getItem("shop_auth_key");
    if (jwt) router.push("/protected");
  }, [router]);

  const { mutate: handleLogin, isLoading } = useMutation(AuthService.login, {
    onError: (err) => {
      enqueueSnackbar(err.response.data.message, { variant: "error" });
    },
    onSuccess: (res) => {
      console.log(res);
      enqueueSnackbar("Login Successful", { variant: "success" });

      const { authToken } = res;
      console.log(authToken);
      if (authToken) {
        localStorage.setItem("shop_auth_key", authToken);
        router.push("/protected");
      }
    },
  });

  const { mutate: testApi, isLoading: test12 } = useMutation(AuthService.test, {
    onSuccess: (res) => {
      console.log(res);
    },
  });

  const onTest = () => {
    testApi();
  };

  const onLogin = () => {
    if (username == "" || pass == "") {
      enqueueSnackbar("Please fill in the details properly", {
        variant: "error",
      });
      return;
    }
    const data = {
      username: username,
      password: pass,
    };
    handleLogin(data);
  };

  return (
    <div className={styles.cont}>
      <div className={styles.card}>
        <h1 style={{ borderBottom: "1px solid #fff", lineHeight: "2" }}>
          Shop Name & Logo
        </h1>
        <Box mt={5}>
          <h2 className="mb-3 mt-5">Login</h2>
        </Box>
        <Grid container>
          <Grid item xs={12} mb={2}>
            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              color="secondary"
              fullWidth
            />
          </Grid>
          <Grid item xs={12} mb={2}>
            <TextField
              label="Password"
              value={pass}
              type="password"
              onChange={(e) => setPass(e.target.value)}
              color="secondary"
              fullWidth
            />
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => onLogin()}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setAddUserOpen(true)}
            sx={{ ml: 3 }}
          >
            New User
          </Button>
        </Grid>

        <AddUser open={addUserOpen} handleClose={() => setAddUserOpen(false)} />
      </div>
    </div>
  );
};

export default Login;
