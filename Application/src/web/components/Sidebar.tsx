import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import './Sidebar.css'
export const Sidebar = () => {
    const context = useContext(AppContext)
    const [itemList, setItemList] = useState<JSX.Element[]>([])
    useEffect(() => {
        setItemList([<span key="all">({context.dateKeyedItemGroup.length === 0 ? "NONE" : "ALL"})</span>,
        ...context.dateKeyedItemGroup.map((dateKeyedItemList, index) => {
            //TODO:　コードをわかりやすくする
            return <div key={index} className="ScreenshotNumber">
                {index === context.dateKeyedItemGroup.length - 1 ? "└ " : "├ "}
                <a href="#" onClick={()=>context.setSelectedTimeStamp(dateKeyedItemList.date)}>{dateKeyedItemList.date}</a>
                {dateKeyedItemList.itemDataList.map((itemDetail, index) => {
                    return <a className="ItemListLink" key={index} href={"#" + itemDetail.name}>
                        {index === dateKeyedItemList.itemDataList.length - 1 ? "└ " : "├ "}{itemDetail.name}
                    </a>
                })}
            </div>
        }
        )]);
    }, [context.dateKeyedItemGroup]);
    return (
        <div className="Sidebar">
            {itemList}
        </div>
    );
};