import { type FC } from "react";

import Link from "next/link";

import {
  AccountBox,
  Article,
  Dashboard,
  Flag,
  Logout,
  Settings,
  Star,
  TrendingUp,
} from "@mui/icons-material";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SvgIconTypeMap,
  Toolbar,
  ToolbarProps,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface DrawerItemProps {
  currentPathname: string;
}

const SToolbar = styled(Toolbar)<ToolbarProps>(() => ({
  background: "#1976d2",
  boxShadow:
    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
}));

function capitalFirst(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

type ListItemType = {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  href: string;
};

const listItems: ListItemType[] = [
  {
    icon: Dashboard,
    href: "home",
  },
  {
    icon: Article,
    href: "blog",
  },
  {
    icon: Star,
    href: "vision",
  },
  {
    icon: AccountBox,
    href: "profile",
  },
  {
    icon: TrendingUp,
    href: "career",
  },
  {
    icon: Flag,
    href: "objective",
  },
  {
    icon: Settings,
    href: "config",
  },
];

const DrawerItem: FC<DrawerItemProps> = ({ currentPathname }) => {
  const ListItem = ({ icon: Icon, href }: ListItemType) => {
    return (
      <Link href={`/${href}`}>
        <ListItemButton selected={currentPathname.split("/")[1] === href}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={capitalFirst(href)} />
        </ListItemButton>
      </Link>
    );
  };
  return (
    <div>
      <SToolbar>
        <Typography component="h1" fontWeight="900" fontSize={20} color="white" fontStyle="italic">
          asadatomoya.com
        </Typography>
      </SToolbar>
      <Divider />
      <List>
        {listItems.map((listItem) => (
          <ListItem key={listItem.href} {...listItem} />
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>
      </List>
    </div>
  );
};

export default DrawerItem;
