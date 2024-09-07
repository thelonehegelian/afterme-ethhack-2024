"use client";
import React from "react";
import Navbar from "../components/Navbar";
import Container from "../components/BoxContainer";
import { CarbonNetwork4 } from "../icons";
import Link from "next/link";
import { useAtom } from "jotai";
import {
  finalPost,
  attestationAddressAtom,
  nextToKinAddressAtom,
} from "../store";

const FinalStepsPage: React.FC = () => {
  const [finalPostValue] = useAtom(finalPost);
  const [attestationAddress] = useAtom(attestationAddressAtom);
  const [nextToKinAddress] = useAtom(nextToKinAddressAtom);

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
            Final Steps
          </h1>
        </div>
        <div className="flex flex-row w-full h-full">
          {/* First Column */}
          <div className="flex flex-col w-1/2 h-full items-center justify-center">
            <Container title="Summary">
              <p className="text-[#FFA400] font-semibold mb-4 ml-2">
                Review your actions and conditions
              </p>
              <p className="font-extralight text-sm mb-4 ml-2">
                Ensure everything is set up correctly before proceeding.
              </p>
              <p className="p-2">
                <span className="font-semibold">Final Post:</span>{" "}
              </p>
              <div className="p-2">{finalPostValue}</div>
              <p className="p-2">
                <span className="font-semibold">Attestation Address:</span>{" "}
              </p>
              <div className="p-2">{attestationAddress}</div>
              <p className="p-2">
                <span className="font-semibold">Next to Kin:</span>{" "}
              </p>
              <div className="p-2">{nextToKinAddress}</div>
            </Container>
          </div>
          {/* Second Column */}
          <div className="flex flex-col w-1/2 h-full items-center justify-center">
            <Container title="Confirmation">
              <p className="text-[#FFA400] font-semibold mb-4 ml-2">
                Confirm and Execute
              </p>
              <p className="font-extralight text-sm mb-4 ml-2">
                Once you confirm, the plan will be executed as per your
                settings.
              </p>
              <Link href="/confirmation">
                <button className="btn btn-secondary">Confirm</button>
              </Link>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinalStepsPage;
