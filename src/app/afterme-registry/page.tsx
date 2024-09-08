import React from "react";
import ClaimCard from "../../components/claim-card";
import Navbar from "../components/Navbar";

interface Claim {
  claimantId: string;
  policyTypeAndNumber: string;
  claimType: "life" | "health" | "property" | "auto" | "life";
  policyType: string;
  paidStatus: "Paid" | "Pending" | "Denied" | "Open"; // Changed from ClaimStatus to match the component usage
}

const claims: Claim[] = [
  {
    claimantId: "pqr678",
    policyTypeAndNumber: "Health Policy 13579",
    claimType: "health",
    policyType: "Health Insurance",
    paidStatus: "Open",
  },
  {
    claimantId: "stu901",
    policyTypeAndNumber: "Property Policy 24681",
    claimType: "property",
    policyType: "Homeowner's Insurance",
    paidStatus: "Open",
  },
  {
    claimantId: "abc123",
    policyTypeAndNumber: "Health Policy 12345",
    claimType: "health",
    policyType: "Health Insurance",
    paidStatus: "Paid",
  },
  {
    claimantId: "def456",
    policyTypeAndNumber: "Property Policy 67890",
    claimType: "property",
    policyType: "Homeowner's Insurance",
    paidStatus: "Pending",
  },
  {
    claimantId: "ghi789",
    policyTypeAndNumber: "Auto Policy 54321",
    claimType: "auto",
    policyType: "Auto Insurance",
    paidStatus: "Denied",
  },
  {
    claimantId: "jkl012",
    policyTypeAndNumber: "Life Policy 98765",
    claimType: "life",
    policyType: "Life Insurance",
    paidStatus: "Paid",
  },
  {
    claimantId: "mno345",
    policyTypeAndNumber: "Health Policy 24680",
    claimType: "health",
    policyType: "Health Insurance",
    paidStatus: "Pending",
  },
];

function AfterMeRegistry() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-8 text-center">
          AfterMe Insurance
        </h1>

        <button className="btn btn-primary mb-4">
          Create New Policy Schema
        </button>

        <div className="flex flex-row flex-wrap gap-4 justify-center">
          {claims.map((claim, index) => (
            <ClaimCard key={index} claim={claim} />
          ))}
        </div>
      </div>
    </>
  );
}

export default AfterMeRegistry;
