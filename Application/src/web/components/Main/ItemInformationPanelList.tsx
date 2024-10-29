import { useContext, useEffect, useState } from "react";
import { AppContext, contextType, ItemData } from "../../App";
import './ShowInformation.css'
import { ItemInformationPanel } from "./ShowInformationPane/ItemInformationPanel";
export const ItemInformationPanelList = () => {
    const context = useContext<contextType>(AppContext)
    const [itemInformationPanelList, setItemInformationPanelList] = useState<JSX.Element[]>([])
    useEffect(() => {
        const newPanelList: JSX.Element[] = [];
        for (const dateKeyedItems of context.dateKeyedItemGroup) {
            if (dateKeyedItems.date === context.selectedTimeStamp) {
                for (const itemData of dateKeyedItems.itemDataList) {
                    const _element = (<ItemInformationPanel key={itemData.name + dateKeyedItems.date} itemData={itemData} />);
                    newPanelList.push(_element);
                }
            }
        }
        setItemInformationPanelList(newPanelList);
    }, [context.selectedTimeStamp]);
    return (
        <div className="ShowInformationPane">
            {itemInformationPanelList}
        </div>
    );
};