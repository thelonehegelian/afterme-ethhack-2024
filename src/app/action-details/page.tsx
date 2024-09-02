import React from "react";
import type { SVGProps } from "react";

export function CarbonNetwork4(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 32 32"
      {...props}
    >
      <circle cx={21} cy={26} r={2} fill="black"></circle>
      <circle cx={21} cy={6} r={2} fill="black"></circle>
      <circle cx={4} cy={16} r={2} fill="black"></circle>
      <path
        fill="black"
        d="M28 12a3.996 3.996 0 0 0-3.858 3h-4.284a3.966 3.966 0 0 0-5.491-2.643l-3.177-3.97A3.96 3.96 0 0 0 12 6a4 4 0 1 0-4 4a4 4 0 0 0 1.634-.357l3.176 3.97a3.924 3.924 0 0 0 0 4.774l-3.176 3.97A4 4 0 0 0 8 22a4 4 0 1 0 4 4a3.96 3.96 0 0 0-.81-2.387l3.176-3.97A3.966 3.966 0 0 0 19.858 17h4.284A3.993 3.993 0 1 0 28 12M6 6a2 2 0 1 1 2 2a2 2 0 0 1-2-2m2 22a2 2 0 1 1 2-2a2 2 0 0 1-2 2m8-10a2 2 0 1 1 2-2a2 2 0 0 1-2 2m12 0a2 2 0 1 1 2-2a2 2 0 0 1-2 2"
      ></path>
    </svg>
  );
}
const ActionDetailsPage: React.FC = () => {
  const detailedActions = [
    "Account Deletion or Deactivation",
    "Final Post",
    "Profile Conversion",
  ];
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <div className="flex flex-row w-full h-full">
        <div className="flex flex-col w-1/2 h-full ">
          <div className="flex items-center m-4 mt-40">
            <CarbonNetwork4 width="2em" height="2em" />
            <h1 className="font-light ml-4 text-3xl">Social Media Plan</h1>
          </div>
          <p className="ml-20 mt-8 text-xl font-light">Actions</p>
          {detailedActions.map((action, index) => (
            <div key={index} className="form-control w-1/2 ml-14 mt-12">
              <label className="label cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked
                  className="checkbox checkbox-primary"
                />
                <span className="label-text ml-2 text-sm font-light">
                  {action}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center w-1/2 h-full bg-green-500">
          <h1 className="font-extralight">Description</h1>
          <p>More details or actions can be placed here.</p>
        </div>
      </div>
    </div>
  );
};

export default ActionDetailsPage;
