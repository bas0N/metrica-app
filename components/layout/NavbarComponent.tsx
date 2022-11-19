import React, { useState } from "react";
import { Logo } from "../../assets/Logo";
import {
  Navbar,
  Button,
  Text,
  Card,
  Radio,
  Avatar,
  Dropdown,
  Switch,
  useTheme,
} from "@nextui-org/react";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset, login } from "../../features/auth/authSlice";
import { Link as UiLink } from "@nextui-org/react";
import { useTheme as useNextTheme } from "next-themes";
import { useRouter } from "next/router";
import SignIn from "../modals/SignIn";
import SignUp from "../modals/SignUp";
import Link from "next/link";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import { GetServerSidePropsContext } from "next";

function NavbarComponent() {
  const dispatch = useDispatch<AppDispatch>();
  const [userState, setUserState] = useState({});
  //const { user } = useSelector((state: any) => state.auth);
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    // console.log(user);
    // if (error) {
    //   console.log("error in navbar");
    //   router.replace("/");
    // }
    if (user) {
      setUserState(user);
    }
  }, [user, error]);
  const router = useRouter();

  const { setTheme } = useNextTheme();
  const { isDark, type } = useTheme();
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
  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    setUserState(false);
    router.push("/api/auth/logout");
  };
  // useEffect(() => {
  //   fetch("/api/auth/getAccessToken")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //     });
  //   console.log(user);
  // }, []);

  return (
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
        <Navbar.Link isActive={router.pathname === "/"} href="/">
          Main
        </Navbar.Link>
        <Navbar.Link isActive={router.pathname === "/offer"} href="/offer">
          Offer
        </Navbar.Link>
        <Navbar.Link isActive={router.pathname === "/pricing"} href="/pricing">
          Pricing
        </Navbar.Link>
        <Navbar.Link isActive={router.pathname === "/company"} href="/company">
          Company
        </Navbar.Link>
        <Navbar.Link isActive={router.pathname === "/faq"} href="/faq">
          FAQ
        </Navbar.Link>
        <Navbar.Link
          isActive={
            router.pathname === "/dashboard" ||
            router.pathname === "/dashboard/send-form" ||
            router.pathname === "/dashboard/manage-recruitments"
          }
          href="/dashboard"
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
                <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
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
  );
}

export default NavbarComponent;
