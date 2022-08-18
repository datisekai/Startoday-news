import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LoginIcon from "@mui/icons-material/Login";
import { useQuery } from "@tanstack/react-query";
import categoryAPI from "../actions/category";
import DanhMucItem from "../models/DanhMucItem";
import Link from "next/link";
interface MDrawerProps {
  open: boolean;
  handleClose: () => void;
}

const MDrawer: React.FC<MDrawerProps> = ({ open, handleClose }) => {
  const { data = [] } = useQuery(["danh-muc"], categoryAPI.getCategory);
  return (
    <div>
      <React.Fragment>
        <Drawer anchor={"left"} open={open} onClose={handleClose}>
          <Box sx={{ width: 250 }} role='presentation'>
            <List>
              <ListItem disablePadding>
                <Link href={`/`}>
                  <ListItemButton>
                    <ListItemText
                      primary={"Tất cả"}
                      sx={{ textTransform: "capitalize" }}
                    />
                  </ListItemButton>
                </Link>
              </ListItem>
              {data.map((item: DanhMucItem, index: number) => (
                <ListItem key={item._id} disablePadding>
                  <Link href={`/danh-muc/${item.slug}`}>
                    <ListItemButton>
                      <ListItemText
                        primary={item.name}
                        sx={{ textTransform: "capitalize" }}
                      />
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              <ListItem disablePadding>
                <Link href='/dang-nhap'>
                  <ListItemButton>
                    <ListItemIcon>
                      <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Đăng nhập"} />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default MDrawer;
