import React from "react";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { Button } from "@/components/ui/button.tsx";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { ModeToggle } from "@/components/mode-toggle.tsx";
import axios from "axios";

export const Navbar = (): React.JSX.Element => {
  const { user, logout, setUser } = useAuthStore((state) => state);

  const handleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      toast.success("Login Successful!");
      const access_token = codeResponse.access_token;
      Cookies.set("access_token", access_token, { expires: 7 });

      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
            },
          },
        );
        setUser(data);
      } catch (error) {
        toast.error("Failed to fetch user data.");
        console.error("Error fetching user:", error);
      }
    },
    onError: (error) => {
      toast.error("Login Failed! Please try again later.");
      console.error("Login Failed:", error);
    },
  });

  const handleLogout = () => {
    googleLogout();
    logout();
    toast.success("Logged out successfully!");
  };

  return (
    <nav className={"max-h-[10vh] border-b border-dotted border-blue-800 p-4"}>
      <div className={"container flex items-center justify-between"}>
        <div className={"flex items-center gap-x-4"}>
          <img
            className={
              "rounded-full p-0.5 hover:shadow-xl hover:shadow-gray-100"
            }
            src={"/logo.webp"}
            alt={"mind sparks logo"}
            height={40}
            width={40}
          />
          <p
            className={
              "text-xl font-semibold text-slate-900 dark:text-slate-300"
            }
          >
            Health Spot
          </p>
        </div>
        <div className={"flex items-center gap-x-6"}>
          {!user ? (
            <Button
              onClick={() => handleLogin()}
              className={"bg-blue-700 hover:bg-blue-900 dark:text-white"}
            >
              Login
            </Button>
          ) : (
            <div className={"flex items-center gap-x-4"}>
              <Avatar>
                <AvatarImage
                  className={"rounded-full border-4 border-blue-600"}
                  src={user.picture}
                />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button
                onClick={handleLogout}
                className={"bg-blue-700 hover:bg-blue-900 dark:text-white"}
              >
                Logout
              </Button>
            </div>
          )}
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};
