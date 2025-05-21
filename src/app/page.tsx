"use client";
import liff from "@line/liff";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState<{
    displayName: string;
    userId: string;
    pictureUrl?: string;
    statusMessage?: string;
  } | null>(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "LIFF_ID" });
        if (!liff.isLoggedIn()) {
          await liff.login();
        }

        const profile = await liff.getProfile();
        setUser(profile);
      } catch (error) {
        console.error("LIFF initialization failed", error);
      }
    };

    initLiff();
  }, []);

  console.log(user);

  const handleLogout = () => {
    liff.logout();
    window.location.reload();
  };

  return (
    <div>
      {user?.pictureUrl && (
        <Image
          src={user.pictureUrl}
          alt="Profile Picture"
          width={100}
          height={100}
          style={{ borderRadius: "50%" }}
        />
      )}
      <h1>{user ? user.displayName : "hello"}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
