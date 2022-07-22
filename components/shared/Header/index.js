import {
  AppBar,
  Box,
  Button,
  Card,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./index.module.css";
import { IoPowerSharp } from "react-icons/io5";
import { inventoryLinks, manageLinks } from "utils/drawerLinks";
import Link from "next/link";
import { drawerWidth } from "utils/constants";
import { useRouter } from "next/router";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerOpen(open);
  };

  const logout = () => {
    localStorage.removeItem("shop_auth_key");
    router.push("/auth");
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Link href="/protected">
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, cursor: "pointer" }}
            >
              Shop Name
            </Typography>
          </Link>
          <Button color="inherit" onClick={() => logout()}>
            <IoPowerSharp style={{ marginRight: "10px" }} />
            Log Out
          </Button>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              position: "relative",
              overflow: "auto",
              maxHeight: 300,
              "& ul": { padding: 0 },
            }}
            subheader={<li />}
          >
            <li key={`drawer-inventory`}>
              <ul>
                <ListSubheader>Inventory</ListSubheader>
                {inventoryLinks.map((ele) => (
                  <ListItem key={`drawer-manage-${ele.title}`} disablePadding>
                    <Link href={ele.link}>
                      <ListItemButton>
                        <ListItemIcon>{ele.icon}</ListItemIcon>
                        <ListItemText primary={ele.title} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </ul>
            </li>
            <li key={`drawer-manage`}>
              <ul>
                <ListSubheader>Manage</ListSubheader>
                {manageLinks.map((ele) => (
                  <ListItem key={`drawer-manage-${ele.title}`} disablePadding>
                    <Link href={ele.link}>
                      <ListItemButton>
                        <ListItemIcon>{ele.icon}</ListItemIcon>
                        <ListItemText primary={ele.title} />
                      </ListItemButton>
                    </Link>
                  </ListItem>
                ))}
              </ul>
            </li>
          </List>
        </Box>
        <Divider />
      </Drawer>
    </>
  );
};

export default Header;
