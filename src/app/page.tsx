"use client";

import LandingPage from "./components/LandingPage";
import { Provider } from "jotai";

export default function Home() {
  return (
    <>
      <Provider>
        <LandingPage />
      </Provider>
    </>
  );
}
