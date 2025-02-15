import Map from "@/components/map.tsx";
import Cookies from "js-cookie";
import { useAuthStore } from "@/store/useAuthStore.ts";
import { useEffect } from "react";
import axios from "axios";

export const Home = () => {
  const { setUser } = useAuthStore((state) => state);

  useEffect(() => {
    const access_token = Cookies.get("access_token");
    if (access_token) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => {
          setUser(res.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [setUser]);
  return <Map />;
};
