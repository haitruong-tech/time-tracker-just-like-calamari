import clsx from "clsx";
import { useState } from "react";

interface Tab {
  name: string;
  component: React.ReactNode;
}

type ITabs = Record<string, Tab>;

interface TabsProps {
  initialTab: string;
  tabs: ITabs;
}

function Tabs({ initialTab, tabs }: TabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState(initialTab);
  return (
    <div>
      <ul className="flex items-center border-b">
        {Object.entries(tabs).map(([tabID, tab]) => (
          <li
            key={tabID}
            className={clsx(
              {
                "!border-[#e5e7eb] bg-white": activeTab.toString() === tabID,
              },
              "py-1 px-2 cursor-pointer relative -bottom-[1px] border-t border-l border-r rounded-tl rounded-tr border-transparent"
            )}
            onClick={() => {
              setActiveTab(tabID);
            }}
          >
            {tab.name}
          </li>
        ))}
      </ul>
      <div>{tabs[activeTab].component}</div>
    </div>
  );
}

export default Tabs;
