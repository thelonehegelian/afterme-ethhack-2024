import { atom } from "jotai";

export const finalPostAtom = atom(
  "Dear friends, the news of my demise is not exaggerated"
);
export const counterAtom = atom(0);
export const attestationAddressAtom = atom(
  "0x1234567890abcdef1234567890abcdef12345678"
);
export const nextToKinAddressAtom = atom(
  "0xcE285c85FC474C3e1A06e62260782766e6DBBd0D"
);
export const selectedTriggerAtom = atom<number>(0);
