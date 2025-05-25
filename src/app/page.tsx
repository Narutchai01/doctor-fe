"use client";
import liff from "@line/liff";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card, { Acne } from "./components/card";

const LIFF_ID = String(process.env.NEXT_PUBLIC_LIFF_ID);

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
        await liff.init({ liffId: LIFF_ID });
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

  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest(".relative")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const [card, setCard] = useState<Acne[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      setCard(mockData);
    };
    fetchData();
  }, []);

  return (
    <div className="mx-6 my-3">
      <div className="flex flex-row justify-between items-center">
        <div className="text-[30px] font-bold"><span className="text-[30px] text-[#f94119]">Illegal</span> Doctor</div>

        <div className="relative pt-3">
          <div className="hover:cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {user?.pictureUrl && (
              <Image
                src={user.pictureUrl}
                alt="Profile Picture"
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />
            )}
            <h1 className="text-center text-sm text-gray-500">{user ? user.displayName : "hello"}</h1>
          </div>

          {menuOpen && (
            <div className="absolute mt-2 right-0 w-25 bg-white rounded-md shadow-lg z-10">
              <ul className="py-1">
                <li className="text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer">Profile</li>
                <li className="text-sm px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="pt-10 pl-5">
        <div className="text-xl font-bold pb-5">History</div>
        <div className="flex flex-col">
          {card.map((acne) => (
            <Card key={acne.id} acne={acne} />
          ))}
        </div>
      </div>
    </div>
  );
}


const mockData = [
  {
    id: '1',
    acne_type: "pustule",
    image_url: "https://picsum.photos/200",
    created_at: "2023-10-01T12:00:00Z",
  },
  {
    id: '2',
    acne_type: "pustule",
    image_url: "https://picsum.photos/200",
    created_at: "2023-10-02T12:00:00Z",
  },
  {
    id: '3',
    acne_type: "pustule",
    image_url: "https://picsum.photos/200",
    created_at: "2023-10-03T12:00:00Z",
  },
  {
    id: '4',
    acne_type: "pustule",
    image_url: "https://picsum.photos/200",
    created_at: "2023-10-04T12:00:00Z",
  },
  {
    id: '5',
    acne_type: "pustule",
    image_url: "https://picsum.photos/200",
    created_at: "2023-10-05T12:00:00Z",
  },
]
