"use client";
import React, { useState } from "react";
import type { SVGProps } from "react";
import Navbar from "../components/Navbar";
import Container from "../components/BoxContainer";
import { CarbonNetwork4 } from "../icons";
import Link from "next/link";

const ActionDetailsPage: React.FC = () => {
  const [selectedTrigger, setSelectedTrigger] = useState<number | null>(null);
  const attestationTriggers = [
    "Insurance Company Attestation",
    "User Attestation",
    "Family Member Attestation",
    "Third Party Attestation",
  ];
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
            Conditions
          </h1>
        </div>
        <div className="flex flex-row w-full h-full">
          {/* First Column */}
          <div className="flex flex-col w-1/2 h-full items-center justify-center">
            <Container title="Timing">
              <h3 className="mb-10">Triggers</h3>

              <div className="flex flex-row items-center">
                <div className="flex flex-col items-start">
                  {attestationTriggers.map((trigger, index) => (
                    <div key={index} className="form-control">
                      <label className="label cursor-pointer">
                        <input
                          type="radio"
                          name="radio-2"
                          className="radio radio-primary"
                          defaultChecked={index === 0}
                          onChange={() => setSelectedTrigger(index)}
                        />
                        <span className="label-text ml-12">{trigger}</span>
                      </label>
                      {selectedTrigger === index && (
                        <input
                          type="text"
                          placeholder="Attestation Address"
                          className="input input-bordered w-full max-w-xs ml-20"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </div>
          {/* Second Column */}
          <div className="flex flex-col w-1/2 h-full items-center justify-center">
            <Container title="Descriptions">
              <p className="text-[#FFA400] font-semibold mb-4 ml-2">
                Attestation Details
              </p>
              <p className="font-extralight text-sm mb-4 ml-2">
                Sign Protocol Address
              </p>

              <input
                type="text"
                placeholder="Attestation Address"
                className="input input-bordered w-full max-w-xs ml-2"
              />
              <p className="text-xs text-[#C4C5D0] mt-4 ml-2">
                We will listen to this attestation to trigger your plan
              </p>
              <p className="text-xs  mt-4 ml-2">
                If you do not have an attestation, you can{" "}
                <Link href="/attestation-maker">
                  <span className="text-[#F2CF03] underline cursor-pointer">
                    create one here
                  </span>
                </Link>
              </p>

              <p className="text-[#FFA400] font-semibold mb-4 ml-2 mt-2">
                Nominated Next of Kin
              </p>
              <p className="font-extralight text-sm mb-4 ml-2">Email Address</p>

              <input
                type="text"
                placeholder="Attestation Address"
                className="input input-bordered w-full max-w-xs ml-2"
              />
              <p className="text-xs text-[#C4C5D0] mt-4 ml-2">
                We will send computational proof of your will execution to this
                person
              </p>
              {/* <button className="btn btn-outline mt-2">
                Add Personal Message
              </button> */}
            </Container>
          </div>
          <div className="flex items-end mb-44 mr-12">
            <button className="btn btn-secondary">Continue</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default ActionDetailsPage;
