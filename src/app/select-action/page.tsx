"use client";
import React, { useState } from "react";
import ActionFrame from "../components/ActionFrame";
import type { SVGProps } from "react";

export function IcBaselineMessage(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="black"
        d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-2 12H6v-2h12zm0-3H6V9h12zm0-3H6V6h12z"
      ></path>
    </svg>
  );
}

export function MaterialSymbolsDelete(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="black"
        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zm2-4h2V8H9zm4 0h2V8h-2z"
      ></path>
    </svg>
  );
}

export function MdiAccount(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="black"
        d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
      ></path>
    </svg>
  );
}

export function TablerTransfer(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 10H4l5.5-6M4 14h16l-5.5 6"
      ></path>
    </svg>
  );
}

export function BiRobot(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      {...props}
    >
      <g fill="black">
        <path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183a.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736l.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188a.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785l-.842-1.7a.25.25 0 0 0-.182-.135"></path>
        <path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"></path>
      </g>
    </svg>
  );
}

const SelectActionPage: React.FC = () => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
  };

  const actions = [
    {
      icon: <IcBaselineMessage width="4em" height="4em" />,
      actionText: "Final Post",
    },
    {
      icon: <MaterialSymbolsDelete width="4em" height="4em" />,
      actionText: "Delete Storage",
    },
    {
      icon: <MdiAccount width="4em" height="4em" />,
      actionText: "Delete Account",
    },
    {
      icon: <TablerTransfer width="4em" height="4em" />,
      actionText: "Transfer Crypto",
    },
    {
      icon: <BiRobot width="4em" height="4em" />,
      actionText: "Deploy an AI Agent",
    },
  ];

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="flex-col prose justify-center text-center">
          <h1 className="font-extralight">Select an Action</h1>
          <p>Choose the action you want to perform</p>
        </div>
        <div className="flex flex-wrap justify-center mt-20">
          {actions.map((action, index) => (
            <ActionFrame
              key={index}
              icon={action.icon}
              actionText={action.actionText}
            />
          ))}
        </div>
        <button className="btn btn-primary mt-10">Proceed</button>
      </div>
    </div>
  );
};

export default SelectActionPage;
