import React, { MouseEventHandler, useState } from "react";
import HistoryTable from "../../components/dashboard/HistoryTable";
import Link from "next/link";
import { useTheme as useNextTheme } from "next-themes";
import { Link as UiLink } from "@nextui-org/react";

import {
  Avatar,
  Button,
  Dropdown,
  Navbar,
  Switch,
  Text,
  useTheme,
} from "@nextui-org/react";
import { useRouter } from "next/router";
import { Logo } from "../../assets/Logo";
import { useUser } from "@auth0/nextjs-auth0";

type Props = {
  children: React.ReactNode;
};
function DashboardLayout({ children }: Props) {
  const { user, error, isLoading } = useUser();

  const [chosen, setChosen] = useState(0);
  const router = useRouter();
  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
  const onLogout = () => {
    router.push("/api/auth/logout");
  };
  const collapseItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];
  return (
    <div className="flex flex-col sm:h-screen ">
      <Navbar isBordered variant="sticky">
        <Navbar.Toggle showIn="xs" />
        <Link href="/">
          <Navbar.Brand
            className="cursor-pointer flex items-center"
            css={{
              "@xs": {
                w: "12%",
              },
            }}
          >
            <Logo />
            <Text className="cursor-pointer ml-3" b color="inherit" hideIn="xs">
              STACK METRICS
            </Text>
          </Navbar.Brand>
        </Link>

        <Navbar.Content activeColor="success" hideIn="xs" variant="underline">
          <Navbar.Link
            isActive={router.pathname === "/dashboard/send-form"}
            onPress={() => {
              router.push("/dashboard/send-form");
              setChosen(2);
            }}
          >
            Send Form
          </Navbar.Link>
          <Navbar.Link
            isActive={router.pathname === "/dashboard/manage-recruitments"}
            onPress={() => {
              router.push("/dashboard/manage-recruitments");
              setChosen(3);
            }}
          >
            Manage recruitments
          </Navbar.Link>

          <Navbar.Link
            isActive={router.pathname === "/dashboard"}
            onPress={() => {
              router.push("/dashboard");
              setChosen(1);
            }}
          >
            Dashboard
          </Navbar.Link>
        </Navbar.Content>
        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Navbar.Content>
            <Switch
              color="success"
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
            {user ? (
              <Dropdown placement="bottom-right">
                <Navbar.Item>
                  <Dropdown.Trigger>
                    <Avatar
                      bordered
                      as="button"
                      color="primary"
                      size="md"
                      src={user.picture!}
                    />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                  aria-label="User menu actions"
                  color="secondary"
                  onAction={(actionKey) => console.log({ actionKey })}
                >
                  <Dropdown.Item key="profile" css={{ height: "$18" }}>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {user.email}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="settings" withDivider>
                    <div
                      onClick={() => {
                        router.push("/dashboard");
                      }}
                    >
                      Dashboard
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item key="team_settings">
                    Team Settings
                  </Dropdown.Item>
                  <Dropdown.Item key="analytics" withDivider>
                    Analytics
                  </Dropdown.Item>
                  <Dropdown.Item key="system">System</Dropdown.Item>
                  <Dropdown.Item key="configurations">
                    Configurations
                  </Dropdown.Item>
                  <Dropdown.Item key="help_and_feedback" withDivider>
                    Help & Feedback
                  </Dropdown.Item>
                  <Dropdown.Item key="logout" withDivider color="error">
                    <div onClick={onLogout}>Log Out</div>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Navbar.Item>
                  {/*  <SignIn /> */}
                  <Button
                    light
                    bordered
                    size="sm"
                    color="success"
                    onClick={() => {
                      router.push("/api/auth/login");
                    }}
                  >
                    Sign In
                  </Button>
                </Navbar.Item>
              </>
            )}
          </Navbar.Content>
        </Navbar.Content>
        <Navbar.Collapse disableAnimation>
          {collapseItems.map((item, index) => (
            <Navbar.CollapseItem
              key={item}
              activeColor="warning"
              css={{
                color: index === collapseItems.length - 1 ? "$error" : "",
              }}
              isActive={index === 2}
            >
              <UiLink
                color="inherit"
                css={{
                  minWidth: "100%",
                }}
                href="#"
              >
                {item}
              </UiLink>
            </Navbar.CollapseItem>
          ))}
          <Navbar.CollapseItem>
            <Switch
              color="success"
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? "dark" : "light")}
            />
          </Navbar.CollapseItem>
        </Navbar.Collapse>
      </Navbar>
      <div className="col-span-4  flex flex-col justify-around">{children}</div>
    </div>
  );
}

export default DashboardLayout;

/*

 <Button.Group
          size="xl"
          vertical
          className="bg-green-400 text-inherit p-0 m-0 rounded-t-none"
        >
          <Button
            className={`text-black border-0 hover:bg-green-500 ${
              chosen === 1 ? "bg-green-500" : ""
            }`}
            onPress={() => {
              router.push("/dashboard");
              setChosen(1);
            }}
          >
            Manage Forms
          </Button>
          <Button
            className={`text-black border-0 hover:bg-green-500 ${
              chosen === 2 ? "bg-green-500" : ""
            }`}
            onPress={() => {
              router.push("/dashboard/send-form");
              setChosen(2);
            }}
          >
            Send Form
          </Button>
          <Button
            className={`text-black border-0 hover:bg-green-500 ${
              chosen === 3 ? "bg-green-500" : ""
            }`}
            onPress={() => {
              router.push("/dashboard/manage-recruitments");
              setChosen(3);
            }}
          >
            Manage Recruitments
          </Button>
        </Button.Group>


*/
