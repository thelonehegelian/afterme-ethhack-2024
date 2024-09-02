"use client";
import React, { useState } from "react";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle sign-in logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="prose flex flex-col items-center justify-center">
        <h2 className="mb-6 font-light">Sign In to begin</h2>
        <form onSubmit={handleSubmit}>
          <button className="btn btn-primary">Sign in Web3 Auth</button>
        </form>
      </div>
    </div>
  );
};

export default SignInPage;
