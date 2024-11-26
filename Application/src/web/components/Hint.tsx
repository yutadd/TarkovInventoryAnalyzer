import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import './Hint.css'
export const Hint = () => {
    const context = useContext(AppContext)
    const [itemList, setItemList] = useState<JSX.Element[]>([])

    useEffect(() => {
        setItemList([<span key="all">({context.dateKeyedItemGroup.length === 0 ? "NONE" : "ALL"})</span>,
        ...context.dateKeyedItemGroup.map((dateKeyedItemList, index) => {
            //TODO:　コードをわかりやすくする
            return <div key={index} className="ScreenshotNumber">
                {index === context.dateKeyedItemGroup.length - 1 ? "└ " : "├ "}
                <a href="#" onClick={() => context.setSelectedTimeStamp(dateKeyedItemList.date)}>{dateKeyedItemList.date}</a>
                {dateKeyedItemList.itemDataList.map((itemDetail, index) => {
                    return <a className="ItemListLink" key={index} href={"#" + itemDetail.name}>
                        {index === dateKeyedItemList.itemDataList.length - 1 ? "└ " : "├ "}{itemDetail.name}
                    </a>
                })}
            </div>
        }
        )]);
    }, [context.dateKeyedItemGroup]);
    return (<div className="HintContainer">
        {context.isHintShown && <div className="Hint">
            {itemList}
        </div>}<div className="ExpandHint" onClick={()=>context.setIsHintShown((before:boolean)=>!before)}>{context.isHintShown?"hide　⋁":"hint"}</div>
    </div>
    );
};