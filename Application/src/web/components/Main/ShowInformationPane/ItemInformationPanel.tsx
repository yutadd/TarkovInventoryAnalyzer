import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../../../App";
import './ItemInformation.css'
import { fetchItemDetails, fetchHideoutItem, fetchTaskItem } from "./queryInformation/queryInformation";

export const ItemInformationPanel = ({ itemName }: { itemName: string }) => {
    const context = useContext<contextType>(AppContext);
    const [itemDetails, setItemDetails] = useState<any>(null);
    const [hideoutInfo, setHideoutInfo] = useState<any[]>([]);
    const [taskInfo, setTaskInfo] = useState<any[]>([]);

    useEffect(() => {
        fetchItemDetails(itemName).then(_itemDetails => {
            setItemDetails(_itemDetails);
        });

        fetchHideoutItem(itemName).then(_hideoutInfo => {
            if(_hideoutInfo){
                setHideoutInfo(_hideoutInfo);
            }
        });

        fetchTaskItem(itemName).then(_taskInfo => {
            if(_taskInfo){
                setTaskInfo(_taskInfo);
            }
            
        });
    }, [itemName]);

    return (
        <div id={itemName} className={"Information"}>
            <h2>{itemName}</h2>
            {itemDetails && (
                <div>
                    <p>ID: {itemDetails.id}</p>
                    <h3>Buy For:</h3>
                    <ul>
                        {itemDetails.buyFor.map((buy: any, index: number) => (
                            <li key={index}>
                                {buy.price} {buy.currency} from {buy.source}
                            </li>
                        ))}
                    </ul>
                    <h3>Sell For:</h3>
                    <ul>
                        {itemDetails.sellFor.map((sell: any, index: number) => (
                            <li key={index}>
                                {sell.price} {sell.currency} to {sell.vendor.name}
                            </li>
                        ))}
                    </ul>
                    <h3>Image:</h3>
                    <img src={itemDetails.image512pxLink} alt={`${itemName} image`} />
                </div>
            )}
            {hideoutInfo.length > 0 && (
                <div>
                    <h3>Hideout Information:</h3>
                    {hideoutInfo.map((info, index) => (
                        <div key={index}>
                            <p>Station: {info.station}</p>
                            <p>Level: {info.level}</p>
                            <p>Item: {info.item}</p>
                            <p>Count: {info.count}</p>
                        </div>
                    ))}
                </div>
            )}
            {taskInfo.length > 0 && (
                <div>
                    <h3>Task Information:</h3>
                    {taskInfo.map((info, index) => (
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