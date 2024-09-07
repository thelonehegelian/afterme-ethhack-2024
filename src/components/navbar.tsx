// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { Layout } from "lucide-react";

// // Mock useAccount hook for demonstration
// const useAccount = () => {
//   const [isConnected, setIsConnected] = useState(false);
//   const [address, setAddress] = useState("");

//   const connect = () => {
//     // Simulate connection
//     setIsConnected(true);
//     setAddress("0x1234567890123456789012345678901234567890");
//   };

//   const disconnect = () => {
//     setIsConnected(false);
//     setAddress("");
//   };

//   return { isConnected, address, connect, disconnect };
// };

// export function Navbar() {
//   const { isConnected, address, connect, disconnect } = useAccount();
//   const [trimmedAddress, setTrimmedAddress] = useState("");

//   useEffect(() => {
//     if (address) {
//       setTrimmedAddress(`${address.slice(0, 6)}...${address.slice(-4)}`);
//     }
//   }, [address]);

//   return (
//     <nav className="flex items-center justify-between p-4 bg-background">
//       <Link href="/" className="flex items-center space-x-2">
//         <Layout className="h-6 w-6" />
//         <span className="font-bold text-xl">Logo</span>
//       </Link>

//       <div className="hidden md:flex space-x-4">
//         <Button variant="ghost" asChild>
//           <Link href="/">Home</Link>
//         </Button>
//         <Button variant="ghost" asChild>
//           <Link href="/dashboard">Dashboard</Link>
//         </Button>
//         <Button variant="ghost" asChild>
//           <Link href="/about">About</Link>
//         </Button>
//       </div>

//       <Button
//         onClick={isConnected ? disconnect : connect}
//         variant={isConnected ? "outline" : "default"}
//       >
//         {isConnected ? trimmedAddress : "Connect"}
//       </Button>
//     </nav>
//   );
// }
