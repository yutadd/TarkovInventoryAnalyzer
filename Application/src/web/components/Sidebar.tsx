import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import './Sidebar.css'
export const Sidebar = () => {
    const context = useContext(AppContext)
    const [itemList, setItemList] = useState<JSX.Element[]>([])
    useEffect(() => {
        setItemList([<span key="all">({context.items.length===0?"NONE":"ALL"})</span>, ...context.items.map((item, index) => {
            return <a className="ItemListLink" key={index} href={"#" + item}>{index === context.items.length - 1 ? "└ " : "├ "}{item}</a>
        }
        )]);
        console.log(context.items)
    }, [context.items]);
    return (
        <div className="Sidebar">
            {itemList}
        </div>
    );
};