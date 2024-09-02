"use client";
import React, { useState } from "react";
import { RiFacebookFill, MdiInstagram, MdiGoogle } from "../icons";
const ChooseMedia: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handleMediaSelect = (media: string) => {
    setSelectedMedia(media);
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex-col items-center">
        <div className="flex-col prose justify-center text-center">
          <h1 className="font-extralight">Choose Social Media Account</h1>
          <p> where you want the action to take place</p>
        </div>
        <div className="flex justify-center mt-20">
          <RiFacebookFill />
          <MdiInstagram />
          <MdiGoogle />

          <RiFacebookFill />
          <MdiInstagram />
          <MdiGoogle />
        </div>
      </div>
    </div>
  );
};

export default ChooseMedia;
