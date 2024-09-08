import React from "react";

const FinalPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contract Created</h1>
      <p className="mb-2">Legacy Locked</p>
      <p className="mb-2">Your AfterMe Contract and Attestation was created</p>
      <p className="mb-4">Please go to the Dashboard</p>
      <a href="/dashboard" className="text-blue-500 underline">
        Go to Dashboard
      </a>
    </div>
  );
};

export default FinalPage;
