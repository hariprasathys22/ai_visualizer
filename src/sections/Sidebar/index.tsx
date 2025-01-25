import { APPCONSTANTS } from "../../utilities/AppConstants";
import {
  AppstoreOutlined,
  CloseOutlined,
  DesktopOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { RxExit } from "react-icons/rx";
import { Menu, type MenuProps } from "antd";
import { useQueryStore } from "../../store";
type MenuItem = Required<MenuProps>["items"][number];

type SidebarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};
const Sidebar = ({ collapsed, setCollapsed }: SidebarProps) => {
  const { setHeading } = useQueryStore();
  const handleDashBoard = () => {
    setHeading("Dashboard");
  };
  const handleAIChatHelper = () => {
    setHeading("AI Chat Helper");
  };
  const handleProjects = () => {
    setHeading("Projects");
  };
  const handleSettings = () => {
    setHeading("Settings");
  };
  const items: MenuItem[] = [
    {
      key: "1",
      icon: <PieChartOutlined />,
      label: "Dashboard",
      onClick: handleDashBoard,
    },
    {
      key: "2",
      icon: <DesktopOutlined />,
      label: "AI Chat Helper",
      onClick: handleAIChatHelper,
    },
    {
      key: "3",
      icon: <AppstoreOutlined />,
      label: "Projects",
      onClick: handleProjects,
    },
    {
      key: "4",
      icon: <SettingOutlined />,
      label: "Settings",
      onClick: handleSettings,
    },

    // {
    //   key: "sub2",
    //   label: "Navigation Two",
    //   icon: <AppstoreOutlined />,
    //   children: [
    //     { key: "9", label: "Option 9" },
    //     { key: "10", label: "Option 10" },
    //     {
    //       key: "sub3",
    //       label: "Submenu",
    //       children: [
    //         { key: "11", label: "Option 11" },
    //         { key: "12", label: "Option 12" },
    //       ],
    //     },
    //   ],
    // },
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="w-full h-screen py-8 px-6">
      <div className="flex flex-col justify-between h-full">
        <div className="text-secondary flex flex-col gap-5">
          <div className="flex w-full items-center">
            <div className="flex items-center gap-3 ml-3">
              <img
                src={APPCONSTANTS.HOME.logo}
                className="w-8 h-8 rounded-full"
                alt="logo"
              />
              <p
                className={`font-[600] text-[18px]  ${
                  collapsed ? "hidden" : "inline"
                }`}
              >
                QueryGenius
              </p>
            </div>
          </div>
          <div>
            <button
              onClick={toggleCollapsed}
              className="text-primary ml-4 text-xl cursor-pointer"
            >
              {!collapsed ? <CloseOutlined /> : <MenuFoldOutlined />}
            </button>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              style={{
                background: "transparent",
                width: collapsed ? "50px" : "100%",
                marginTop: "5px",
              }}
              theme="dark"
              inlineCollapsed={collapsed}
              items={items}
              className="custom-menu"
            />
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div className="w-full">
            <button className="w-full flex justify-between items-center px-4 py-2 hover:bg-[#33333E] rounded-md cursor-pointer transition delay-150 duration-300 ease-in-out">
              <p
                className={`text-secondary text-[16px] ${
                  collapsed ? "hidden" : "inline"
                }`}
              >
                Log out
              </p>
              <RxExit className="text-primary text-[16px] " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
