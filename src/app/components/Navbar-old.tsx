"use client";
import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";

// import { DM_Serif_Text } from "next/font/google";
// const dmSerifText = DM_Serif_Text({ weight: "400", subsets: ["latin"] });

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x1", // Please use 0x1 for Ethereum Mainnet
  rpcTarget: "https://rpc.ankr.com/eth",
  // Avoid using public rpcTarget in production.
  // Use services like Infura, Quicknode etc
  displayName: "Ethereum Mainnet",
  blockExplorerUrl: "https://etherscan.io/",
  ticker: "ETH",
  tickerName: "Ethereum",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3auth = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
  privateKeyProvider,
});

function Navbar() {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    console.log(user);
  };
  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        setProvider(web3auth.provider);

        if (web3auth.connected) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    init();
  }, []);
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        await getUserInfo();
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserInfo();
  }, []);

  const login = async () => {
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    if (web3auth.connected) {
      setLoggedIn(true);
    }
  };
  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    // uiConsole("logged out");
  };
  const [activeLink, setActiveLink] = useState<string | null>("Home");

  return (
    <div className="navbar bg-base-100 w-full">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl m-0 p-0">
          <Image src="/logo-nav.svg" alt="afterMe Logo" width={100} height={100} />
        </a>
      </div>
      <div className="flex-none flex justify-center w-full">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link
              href="/"
              className={`m-2 ${activeLink === "Home" ? "btn btn-primary" : ""}`}
              onClick={() => setActiveLink("Home")}
            >
              Home
            </Link>
          </li>
          <li>
            <a
              className={`m-2 ${activeLink === "Dashboard" ? "btn btn-primary" : ""}`}
              onClick={() => setActiveLink("Dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              className={`m-2 ${activeLink === "About" ? "btn btn-primary" : ""}`}
              onClick={() => setActiveLink("About")}
            >
              About
            </a>
          </li>
        </ul>
        <div className="flex-none ml-auto">
          <button className="btn btn-neutral m-2" onClick={login}>
            {loggedIn ? "Connected" : "Connect"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
