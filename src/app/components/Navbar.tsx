"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Layout } from "lucide-react";
import Image from "next/image";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3Auth } from "@web3auth/modal";

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

export default function Navbar() {
  const [trimmedAddress, setTrimmedAddress] = useState("");
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [address, setAddress] = useState("");

  const getUserInfo = async () => {
    const user = await web3auth.getUserInfo();
    console.log(user);
  };

  useEffect(() => {
    const init = async () => {
      try {
        await web3auth.initModal();
        const currentProvider = web3auth.provider;
        setProvider(currentProvider);

        if (web3auth.connected && currentProvider) {
          setLoggedIn(true);
          const userAddress = (await currentProvider.request({
            method: "eth_accounts",
          })) as string[];
          setAddress(userAddress[0]);
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
    if (loggedIn) {
      fetchUserInfo();
    }
  }, [loggedIn]);

  useEffect(() => {
    if (address) {
      setTrimmedAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
    }
  }, [address]);

  const login = async () => {
    try {
      const web3authProvider = await web3auth.connect();
      setProvider(web3authProvider);
      if (web3auth.connected && web3authProvider) {
        setLoggedIn(true);
        const userAddress = (await web3authProvider.request({
          method: "eth_accounts",
        })) as string[];
        setAddress(userAddress[0]);
      }
    } catch (error) {
      if (error instanceof Error && error.message !== "User closed the modal") {
        console.error(error);
      }
    }
  };

  const logout = async () => {
    await web3auth.logout();
    setProvider(null);
    setLoggedIn(false);
    setAddress("");
  };

  const [activeLink, setActiveLink] = useState<string | null>("Home");

  return (
    <nav className="flex items-center justify-between p-4 bg-background">
      <Link href="/" className="flex items-center space-x-2">
        <Layout className="h-6 w-6" />
        <Image
          src="/logo-nav.svg"
          alt="afterMe Logo"
          width={100}
          height={100}
        />
      </Link>

      <div className="hidden md:flex space-x-4">
        <Button variant="ghost" asChild>
          <Link href="/">Home</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/dashboard">Dashboard</Link>
        </Button>
        <Button variant="ghost" asChild>
          <Link href="/about">About</Link>
        </Button>
      </div>

      <Button
        onClick={loggedIn ? logout : login}
        variant={loggedIn ? "outline" : "default"}
      >
        {loggedIn ? trimmedAddress : "Connect"}
      </Button>
    </nav>
  );
}
