"use client";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <main
        className="flex min-h-screen flex-col items-center justify-between p-24"
        style={{
          background: "linear-gradient(360deg, #FFF9D6 0%, #FFFFFF 100%)",
        }}
      >
        <div className="flex items-center justify-center flex-col h-1/2 w-full ">
          <Image
            className="mb-10"
            src="/logo.png"
            alt="afterMe Logo"
            width={400}
            height={400}
          />
          <h1
            className="font-semibold"
            style={{
              fontFamily: "DM Serif Text",
              fontSize: "60px",
              lineHeight: "72px",
            }}
          >
            <div style={{ color: "#F2CF03", display: "inline" }}>Tomorrow </div>
            <span style={{ display: "inline" }}>is uncertain, but your</span>
            <div style={{ color: "#FFA400" }}>
              Digital legacy{" "}
              <span style={{ color: "black" }}>does not have to be</span>
            </div>
          </h1>
          <p
            className="mt-10"
            style={{
              fontSize: "1.75rem",
              fontWeight: 300,
              lineHeight: "2.5rem",
            }}
          >
            Set up a plan for{" "}
            <span className="font-semibold italic">after you</span> with{" "}
            <span className="font-semibold italic">AfterMe</span>
          </p>
          <div className="flex flex-row">
            <Link href="select-action">
              <button className="btn btn-secondary mt-10 mx-4">
                Start Now
              </button>
            </Link>
            <Link href="/afterme-registry-login">
              <button className="btn btn-primary mt-10">
                AfterMe Registry
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
