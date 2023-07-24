import * as React from "react";

import Link from "next/link";

import { AccountBox, Article, Flag, Logout, Star, TrendingUp } from "@mui/icons-material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";

export const mainListItems = (
  <>
    <Link href={"/home"}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItemButton>
    </Link>
    <Link href={"/blog"}>
      <ListItemButton>
        <ListItemIcon>
          <Article />
        </ListItemIcon>
        <ListItemText primary="Blog" />
      </ListItemButton>
    </Link>
    <Link href={"/vision"}>
      <ListItemButton>
        <ListItemIcon>
          <Star />
        </ListItemIcon>
        <ListItemText primary="Vision" />
      </ListItemButton>
    </Link>
    <Link href={"/profile"}>
      <ListItemButton>
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItemButton>
    </Link>
    <Link href={"/career"}>
      <ListItemButton>
        <ListItemIcon>
          <TrendingUp />
        </ListItemIcon>
        <ListItemText primary="Career" />
      </ListItemButton>
    </Link>
    <Link href={"/objective"}>
      <ListItemButton>
        <ListItemIcon>
          <Flag />
        </ListItemIcon>
        <ListItemText primary="Objective" />
      </ListItemButton>
    </Link>
  </>
);

export const secondaryListItems = (
  <>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <Logout />
      </ListItemIcon>
      <ListItemText primary="logout" />
    </ListItemButton>
  </>
);
