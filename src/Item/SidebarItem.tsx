import { Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useMemo } from "react";
import { primary, secondary } from "../theme/themeColors";

interface SideBarProps {
  url: string;
  label: string;
  icon: any;
}

const SidebarItem: FC<SideBarProps> = ({ url, label, icon }) => {
  const Icon = icon;
  const router = useRouter();
  const { pathname } = router;

  const active = useMemo(() => {
    const currentRoute = pathname.split("/")[2] || "";
    return url === `/${currentRoute}` ? true : false;
  }, [pathname]);

  return (
    <Link href={`/admin${url}`}>
      <Stack
        direction={"row"}
        spacing={1}
        pl={4}
        py={1}
        borderLeft={
          active ? `5px solid ${secondary.main}` : "5px solid transparent"
        }
        sx={{
          "&:hover": {
            color: secondary.main,
            borderLeft: `5px solid ${secondary.main}`,
            transition: "all",
            cursor: "pointer",
          },
        }}
      >
        <Icon color={active ? "secondary" : primary[500]} />
        <Typography
          color={active ? "secondary" : primary[500]}
          fontWeight={500}
          fontSize={16}
        >
          {label}
        </Typography>
      </Stack>
    </Link>
  );
};

export default SidebarItem;
