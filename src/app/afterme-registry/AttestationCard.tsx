import React from "react";

interface Attestation {
  id: string;
  attestationId: string;
  transactionHash: string;
  schemaId: string;
  fullSchemaId: string;
  attester: string;
  from: string;
  attestTimestamp: string;
  validUntil: string;
  recipients: string[];
}

interface AttestationCardProps {
  attestation: Attestation;
}

const AttestationCard: React.FC<AttestationCardProps> = ({ attestation }) => {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Attestation Details</h2>
        <div className="flex flex-col space-y-2">
          <div>
            <strong>ID:</strong> {attestation.id}
          </div>
          <div>
            <strong>Attestation ID:</strong> {attestation.attestationId}
          </div>
          <div>
            <strong>Transaction Hash:</strong> {attestation.transactionHash}
          </div>
          <div>
            <strong>Schema ID:</strong> {attestation.schemaId}
          </div>
          <div>
            <strong>Full Schema ID:</strong> {attestation.fullSchemaId}
          </div>
          <div>
            <strong>Attester:</strong> {attestation.attester}
          </div>
          <div>
            <strong>From:</strong> {attestation.from}
          </div>
          <div>
            <strong>Attest Timestamp:</strong> {attestation.attestTimestamp}
          </div>
          <div>
            <strong>Valid Until:</strong> {attestation.validUntil}
          </div>
          <div>
            <strong>Recipients:</strong>
            <ul className="list-disc list-inside space-y-1">
              {attestation.recipients.map((recipient, index) => (
                <li key={index}>{recipient}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttestationCard;
