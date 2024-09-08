"use client";
import React, { useState } from "react";
import { useAtom } from "jotai";
import Navbar from "../components/Navbar";
import Container from "../components/BoxContainer";
import { CarbonNetwork4 } from "../icons";
import Link from "next/link";
import { IcBaselineSnapchat, MdiGoogle } from "../icons";
import { finalPostAtom } from "../store"; // Import the atom

const RemoveStorage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const detailedActions = [
    "Update Data",
    "Delete Data",
    "Move Data to Another Storage",
  ];

  const [textareaValue, setTextareaValue] = useAtom(finalPostAtom);

  return (
    <>
      <Navbar />

      <div className="flex justify-center items-center w-full h-screen bg-[#F5F5F5]">
        <div className="flex items-center p-10 ml-10 absolute top-24 left-0 w-full ">
          <CarbonNetwork4 width="2em" height="2em" />
          <h1
            className="font-semibold ml-4 text-[48px] leading-[54px] text-left"
            style={{ fontFamily: "DM Serif Text" }}
          >
            Cloud Storage Management
          </h1>
        </div>
        <div className="flex flex-row w-full h-full">
          {/* First Column */}
          <div className="flex flex-col w-1/2 h-full items-center justify-center">
            <Container title="Actions">
              {detailedActions.map((action, index) => (
                <div key={index} className="form-control">
                  <label className="label cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={index === 0}
                      className="checkbox checkbox-primary"
                    />
                    <span className="label-text ml-10">{action}</span>
                  </label>
                </div>
              ))}
              <h1 className="font-extralight text-2xl ml-2 mb-4 mt-4">
                Platforms
              </h1>
              <div className="flex flex-row items-center">
                <input
                  type="radio"
                  name="radio-2"
                  className="radio radio-primary"
                  defaultChecked
                />
                <span className="label-text ml-12">Selected accounts</span>
              </div>
              <div className="mt-4 flex w-full">
                <IcBaselineSnapchat width="2em" height="2em" className="ml-4" />
                <MdiGoogle width="2em" height="2em" className="ml-4" />
              </div>
            </Container>
          </div>
          {/* Second Column */}
          <div className="flex flex-col w-1/2 h-full items-center justify-center">
            <Container title="Descriptions">
              <p className="text-[#FFA400] font-semibold mb-4 ml-2">
                Update Data
              </p>
              <p className="font-extralight text-sm mb-4 ml-2">Username</p>
              <input
                type="text"
                className="input input-bordered ml-2 mb-4"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{
                  width: "482px",
                }}
              />
              <p className="font-extralight text-sm mb-4 ml-2">Password</p>
              <input
                type="password"
                className="input input-bordered ml-2 mb-4"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: "482px",
                }}
              />
              <div className="flex items-center ml-2 mb-4">
                <input
                  type="radio"
                  name="encryption"
                  className="radio radio-primary"
                  defaultChecked
                />
                <span className="label-text ml-2">
                  Enable onchain encryption
                </span>
              </div>
            </Container>
          </div>
          <div className="flex items-end mb-44 mr-12">
            <Link href="/triggers">
              <button className="btn btn-secondary">Continue</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default RemoveStorage;
