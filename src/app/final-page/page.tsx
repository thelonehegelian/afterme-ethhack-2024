import React from "react";
import Link from "next/link";

const FinalPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center p-4">
        <h1 className="text-2xl font-bold mb-4">Contract Created</h1>
        <p className="mb-2">Legacy Locked</p>
        <p className="mb-2">
          Your AfterMe Contract and Attestation was created
        </p>
        <p className="mb-4">Please go to the Dashboard</p>
        <Link href="/dashboard">
          <button className="btn btn-primary">Go to Dashboard</button>
        </Link>
      </div>
    </div>
  );
};

export default FinalPage;
