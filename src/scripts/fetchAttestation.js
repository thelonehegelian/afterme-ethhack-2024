import { IndexService } from "@ethsign/sp-sdk";

async function getAttestationByID(id) {
  const indexService = new IndexService("testnet");
  const attestations = await indexService.queryAttestationList({ page: 1 });
  const filteredAttestations = attestations.rows.filter(
    (attestation) => attestation.id === id
  );
  return filteredAttestations;
}

async function getAttestationsByAttester(attester) {
  const indexService = new IndexService("testnet");
  const attestations = await indexService.queryAttestationList({ page: 1 });
  const filteredAttestations = attestations.rows.filter(
    (attestation) => attestation.attester === attester
  );
  return filteredAttestations;
}

getAttestationsByAttester("0xe3F292F78B90127Ec3c90850c30388B13EfCFEbb")
  .then((result) => {
    console.log("This is from the Attester", result);
  })
  .catch((error) => {
    console.error("Error fetching attestations by attester:", error);
  });

getAttestationByID("onchain_evm_44787_0x27")
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.error("Error fetching attestation by ID:", error);
  });
