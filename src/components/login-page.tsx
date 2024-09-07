"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Navbar from "@/app/components/Navbar";

const logos = [
  "/ama-logo.png",
  "/cfp-mark.jpg",
  "/chartswap-logo.gif",
  "/docusign.png",
  "/equifax.png",
  "/nsc-logo.webp",
  "/truework-logo-vector.png",
];

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Login submitted", { email, password });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-100 flex items-center justify-center overflow-hidden">
          <h1 className="text-4xl font-bold text-center">Our Partners</h1>
          <div className="relative w-full h-64">
            {logos.map((logo, index) => (
              <motion.img
                key={index}
                src={logo}
                alt={`Logo ${index + 1}`}
                className="absolute"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: ["0%", "100%", "0%", "-100%", "0%"],
                  y: ["0%", "0%", "100%", "0%", "-100%"],
                  opacity: [0, 1, 1, 1, 0],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 2,
                }}
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold">
                AfterMe Attestation Registry
              </h2>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
