import { useContext, useEffect, useState } from "react";
import { AppContext, contextType, ItemData } from "../../App";
import './ShowInformation.css'
import { ItemInformationPanel } from "./ShowInformationPane/ItemInformationPanel";
export const ItemInformationPanelList = () => {
    const context = useContext<contextType>(AppContext)
    const [itemInformationPanelList, setItemInformationPanelList] = useState<JSX.Element[]>([])
    useEffect(() => {
        setItemInformationPanelList([])
        for (const dateKeyedItems of context.dateKeyedItemGroup) {
            if (dateKeyedItems.date === context.selectedTimeStamp) {
                for (const itemData of dateKeyedItems.itemDataList) {
                    const _element = (<ItemInformationPanel key={itemData.name+dateKeyedItems.date} itemName={itemData.name} />)
                    setItemInformationPanelList((before) => [_element, ...before])
                }
            }
        }
    }, [context.selectedTimeStamp]);
    return (
        <div className="ShowInformationPane">
            {itemInformationPanelList}
        </div>
    );
};