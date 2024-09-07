import React from "react";
import AttestationCard from "./AttestationCard";

const attestation = {
  id: "12345",
  attestationId: "att-12345",
  transactionHash: "0xabcdef",
  schemaId: "schema-12345",
  fullSchemaId: "fullschema-12345",
  attester: "attester-name",
  from: "from-name",
  attestTimestamp: "2023-01-01T00:00:00Z",
  validUntil: "2023-12-31T23:59:59Z",
  recipients: ["recipient1", "recipient2", "recipient3"],
};

function AfterMeRegistry() {
  return (
    <div className="container mx-auto p-4">
      <AttestationCard attestation={attestation} />
    </div>
  );
}

export default AfterMeRegistry;
