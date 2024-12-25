import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import './Sidebar.css'

export const Sidebar = () => {
    const context = useContext(AppContext);
    const [itemList, setItemList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setItemList([
            <details key="all" open>
                <summary>({context.dateKeyedItemGroup.length === 0 ? "NONE" : "ALL"})</summary>
                {context.dateKeyedItemGroup.map((dateKeyedItemList, index) => (
                    <details key={index} open>
                        <summary>
                            {index === context.dateKeyedItemGroup.length - 1 ? "└ " : "├ "}
                            <a
                                href="#"
                                onClick={() => context.setSelectedTimeStamp(dateKeyedItemList.date)}
                            >
                                {dateKeyedItemList.date}
                            </a>
                        </summary>
                        <ul className="ItemList">
                            {dateKeyedItemList.itemDataList.map((itemDetail, idx) => (
                                <li key={idx}>
                                    <a
                                        className="ItemListLink"
                                        href={"#" + itemDetail.name}
                                    >
                                        {idx === dateKeyedItemList.itemDataList.length - 1 ? "└ " : "├ "}
                                        {itemDetail.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </details>
                ))}
            </details>
        ]);
    }, [context.dateKeyedItemGroup]);

    return (
        <div className="SidebarContainer">
            {context.isSidebarShown && (
                <>
                <div className="Sidebar">
                    {itemList}
                </div>
            
            <div
                className="ExpandSidebar"
                onClick={() => context.setIsSidebarShown((before: boolean) => !before)}
            >
                {"X"}
            </div>
            </>
            )}
        </div>
    );
};
