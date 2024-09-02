"use client";
import React, { useState } from "react";
import {
  RiFacebookFill,
  MdiInstagram,
  IcBaselineWhatsapp,
  RiLinkedinFill,
  MdiGoogle,
  IcBaselineSnapchat,
  IconParkTelegram,
} from "../icons";

// RiFacebookFill, MdiInstagram, IcBaselineWhatsapp, RiLinkedinFil,  MdiGoogle, IcBaselineSnapchat, IconParkTelegram
const iconSize = {
  height: "4em",
  width: "4em",
};

const ChooseMedia: React.FC = () => {
  const [selectedMedia, setSelectedMedia] = useState<string | null>(null);

  const handleMediaSelect = (media: string) => {
    setSelectedMedia(media);
  };

  const icons = [
    { Component: MdiInstagram, name: "Instagram" },
    { Component: IcBaselineWhatsapp, name: "Whatsapp" },
    { Component: IcBaselineSnapchat, name: "Snapchat" },
    { Component: MdiGoogle, name: "Google" },
    { Component: RiFacebookFill, name: "Facebook" },
    { Component: IconParkTelegram, name: "Telegram" },
    { Component: RiLinkedinFill, name: "Linkedin" },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex-col prose justify-center text-center">
          <h1 className="font-extralight">Choose Social Media Account</h1>
          <p> where you want the action to take place</p>
        </div>
        <div className="flex flex-wrap justify-center mt-20">
          {icons.slice(0, 4).map(({ Component, name }) => (
            <div
              key={name}
              className={`p-2 cursor-pointer ${
                selectedMedia === name ? "border-2 border-black" : ""
              } flex-basis-50`}
              onClick={() => handleMediaSelect(name)}
            >
              <Component width={iconSize.width} height={iconSize.height} />
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center mt-4">
          {icons.slice(4).map(({ Component, name }) => (
            <div
              key={name}
              className={`p-2 cursor-pointer ${
                selectedMedia === name ? "border-2 border-black" : ""
              } flex-basis-50`}
              onClick={() => handleMediaSelect(name)}
            >
              <Component width={iconSize.width} height={iconSize.height} />
            </div>
          ))}
        </div>
        <button className="btn btn-primary mt-10">Verify</button>
      </div>
    </div>
  );
};

export default ChooseMedia;
