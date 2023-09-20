import { VNode } from "preact";
import React from "preact/compat";
import { Children, ReactNode, useState } from "preact/compat";
import { useLoginStore } from "../../store";

type TabProps = {
  children?: ReactNode;
};

const tabs = [
  { name: "Home", value: "0" },
  { name: "Cadastrar", value: "1" },
  { name: "Lista", value: "2" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Tabs({ children }: TabProps) {
  const [activeTab, setActiveTab] = useState("0");

  const setStore = useLoginStore.setState;

  const clonedChildren = Children?.map(children, (child) => {
    return React.cloneElement(child as VNode, { activeValue: activeTab });
  });

  return (
    <div className="w-full max-w-[460px] mb-8 pb-8">
      <nav
        className="isolate flex divide-x divide-gray-400 rounded-lg shadow"
        aria-label="Tabs"
      >
        {tabs.map((tab, tabIdx) => (
          <a
            key={tab.name}
            className={classNames(
              activeTab === tab.value
                ? "text-[#EEEFF2]"
                : "text-[#7989a7] hover:text-[#EEEFF2]",
              tabIdx === 0 ? "rounded-l-lg" : "",
              tabIdx === tabs.length - 1 ? "rounded-r-lg" : "",
              "group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium focus:z-10",
              "bg-[#4E5D78] hover:bg-[#4E5D78]/90 cursor-pointer"
            )}
            aria-current={activeTab === tab.value ? "page" : undefined}
            onClick={() => {
              setActiveTab(tab.value);
              setStore({
                activeTab: tab.value,
              });
            }}
          >
            <span>{tab.name}</span>
            <span
              aria-hidden="true"
              className={classNames(
                activeTab === tab.value ? "bg-[#96a9c8]" : "bg-transparent",
                "absolute inset-x-0 bottom-0 h-1"
              )}
            />
          </a>
        ))}
      </nav>

      <div className="mt-2">{clonedChildren}</div>
    </div>
  );
}
