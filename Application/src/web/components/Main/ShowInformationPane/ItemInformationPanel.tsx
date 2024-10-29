import { useContext, useEffect, useState } from "react";
import { AppContext, contextType, ItemData } from "../../../App";
import './ItemInformation.css'

export const ItemInformationPanel = ({ itemData }: { itemData: ItemData}) => {
    const context = useContext(AppContext);
    return (
        <div id={itemData.id} className={"Information"}>
            <h2>{itemData.name}</h2>
                <div>
                    <p>ID: {itemData.id}</p>
                    <h3>Buy For:</h3>
                    <ul>
                        {itemData.buyFor.map((buy: any, index: number) => (
                            <li key={index}>
                                {buy.price} {buy.currency} from {buy.source}
                            </li>
                        ))}
                    </ul>
                    <h3>Sell For:</h3>
                    <ul>
                        {itemData.sellFor.map((sell: any, index: number) => (
                            <li key={index}>
                                {sell.price} {sell.currency} to {sell.vendor.name}
                            </li>
                        ))}
                    </ul>
                    <h3>Image:</h3>
                    <img src={itemData.image512pxLink} alt={`${itemData} image`} />
                </div>
            {itemData.hideout.length > 0 && (
                <div>
                    <h3>Hideout Information:</h3>
                    {itemData.hideout.map((info, index) => (
                        <div key={index}>
                            <p>Station: {info.station}</p>
                            <p>Level: {info.level}</p>
                            <p>Item: {info.item}</p>
                            <p>Count: {info.count}</p>
                        </div>
                    ))}
                </div>
            )}
            {itemData.task.length > 0 && (
                <div>
                    <h3>Task Information:</h3>
                    {itemData.task.map((info, index) => (
                        <div key={index}>
                            <p>Task ID: {info.task_id}</p>
                            <p>Task Name: {info.task_name}</p>
                            <p>Item: {info.item}</p>
                            <p>Count: {info.count}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};