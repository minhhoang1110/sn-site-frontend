import { TabData } from "@/types/common";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
interface Props {
  data: TabData[];
  currentPath: string;
  currentParamValue: string;
  paramKey: string;
}
const Tabs: React.FC<Props> = ({
  currentPath,
  data = [],
  paramKey,
  currentParamValue,
}) => {
  const getPathWithParam = (param: string) => {
    return `${currentPath}?${paramKey}=${param}`;
  };
  return (
    <div className="text-sm font-medium text-center text-gray-500">
      {data.length > 0 && (
        <ul className="flex flex-wrap -mb-px">
          {data.map((tab, index) => (
            <li key={index} className="mr-2">
              <Link
                href={getPathWithParam(tab.paramValue)}
                className={`inline-block p-3 border-b-2 border-transparent ${
                  currentParamValue === tab.paramValue
                    ? "text-sky-600 border-sky-600 pointer-events-none"
                    : ""
                } rounded-t-lg hover:bg-gray-200 hover:border-gray-400`}
              >
                {tab.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Tabs;
