import clsx from "clsx";

function Tabs({ tabs, handleSwitchTab }) {
  return (
    <ul className="flex items-center border-b">
      {tabs.map((tab) => (
        <li
          key={tab.id}
          className={clsx(
            {
              "border-[#e5e7eb] bg-white": tab.active,
            },
            "py-1 px-2 cursor-pointer relative -bottom-[1px] border-t border-l border-r rounded-tl rounded-tr border-transparent"
          )}
          onClick={() => handleSwitchTab(tab.id)}
        >
          {tab.value}
        </li>
      ))}
      {/* <li className="border-t border-l border-r rounded-tl rounded-tr py-1 px-2 cursor-pointer bg-white relative -bottom-[1px]">
        Time tracker
      </li>
      <li className="py-1 px-2 cursor-pointer">Todos</li> */}
    </ul>
  );
}

export default Tabs;
