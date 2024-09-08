"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";

import { Badge } from "./ui/badge";
import {
  ClipboardIcon,
  CarIcon,
  HomeIcon,
  HeartPulseIcon,
  ShieldIcon,
} from "lucide-react";
import axios from "axios";
import { useState } from "react";

interface Claim {
  claimantId: string;
  policyTypeAndNumber: string;
  claimType: "life" | "health" | "property" | "auto" | "life";
  policyType: string;
  paidStatus: "Paid" | "Pending" | "Denied" | "Open"; // Changed from ClaimStatus to match the component usage
}

interface ClaimCardProps {
  claim: Claim;
}

export default function ClaimCard({ claim }: ClaimCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const getClaimTypeIcon = (type: Claim["claimType"]) => {
    switch (type) {
      case "health":
        return <HeartPulseIcon className="h-5 w-5" />;
      case "property":
        return <HomeIcon className="h-5 w-5" />;
      case "auto":
        return <CarIcon className="h-5 w-5" />;
      case "life":
        return <ShieldIcon className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status: Claim["paidStatus"]) => {
    switch (status) {
      case "Paid":
        return "bg-green-500";
      case "Pending":
        return "bg-yellow-500";
      case "Denied":
        return "bg-red-500";
      case "Open":
        return "bg-blue-500";
    }
  };

  const handleAttestSchema = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const response = await axios.post("/api/attest-schema", {
        // data: claim.claimantId,
        // just gonna hardcode this for now
        // https://scan.sign.global/schema/SPS_PyndP9OQdcGsYqTzYoXHv
        data: "SPS_PyndP9OQdcGsYqTzYoXHv",
      });
      console.log("Response:", response.data);
      setSuccess(true);
    } catch (error) {
      setError("Error attesting schema");
      console.error("Error attesting schema:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Image
          src="/logo-nav.svg"
          alt="Insurance Company Logo"
          width={200}
          height={40}
          className="h-10 w-auto"
        />
        <Badge
          variant="outline"
          className={`${getStatusColor(claim.paidStatus)} text-white`}
        >
          {claim.paidStatus}
        </Badge>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <ClipboardIcon className="h-6 w-6" />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Claimant ID</p>
            <p className="text-sm text-muted-foreground">{claim.claimantId}</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 rounded-md border p-4">
          {getClaimTypeIcon(claim.claimType)}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Claim Type</p>
            <p className="text-sm text-muted-foreground capitalize">
              {claim.claimType}
            </p>
          </div>
        </div>
        <div className="rounded-md border p-4">
          <p className="text-sm font-medium leading-none mb-2">
            Policy Details
          </p>
          <p className="text-sm text-muted-foreground">
            {claim.policyTypeAndNumber}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {claim.policyType}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex space-x-2">
        <Link href={`https://sign.global/`} passHref className="w-full">
          <button className="btn btn-neutral">View Claim</button>
        </Link>
        {success ? (
          <button className="btn btn-success">Attested</button>
        ) : (
          <button
            className={`btn ${
              claim.paidStatus === "Paid"
                ? "btn-active btn-ghost disabled cursor-not-allowed"
                : "btn-active btn-secondary"
            }`}
            onClick={handleAttestSchema}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Attest Schema"
            )}
          </button>
        )}
      </CardFooter>
    </Card>
  );
}
