import DashboardIcon from "@mui/icons-material/Dashboard";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import CategoryIcon from "@mui/icons-material/Category";
import NewspaperIcon from "@mui/icons-material/Newspaper";

export interface sidebarItem {
  url: string;
  label: string;
  icon: any;
}

const sidebar: sidebarItem[] = [
  {
    url: "/",
    label: "Trang chủ",
    icon: DashboardIcon,
  },
  {
    url: "/nguoi-dung",
    label: "Người dùng",
    icon: SupervisedUserCircleIcon,
  },
  {
    url: "/danh-muc",
    label: "Danh mục",
    icon: CategoryIcon,
  },
  {
    url: "/tin-tuc",
    label: "Tin tức",
    icon: NewspaperIcon,
  },
];

export default sidebar;
