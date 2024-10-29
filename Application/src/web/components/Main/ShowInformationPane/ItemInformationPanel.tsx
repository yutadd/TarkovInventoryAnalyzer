import { useContext, useEffect, useState } from "react";
import { AppContext, contextType, ItemData } from "../../../App";
import './ItemInformation.css'

export const ItemInformationPanel = ({ itemData }: { itemData: ItemData }) => {
    const context = useContext(AppContext);
    const [traderValue, setTraderValue] = useState<string>("000,000₽")
    const [flareValue, setFlareValue] = useState<string>("000,000₽")
    useEffect(() => {
        let maxTraderPrice = 0
        let maxTraderName = "???"
        itemData.buyFor.map(buyData => {
            if (buyData.source === "fleaMarket") {
                setFlareValue(`${buyData.price}${buyData.currency === "RUB" ? "₽" : buyData.currency === "USD" ? "USD" : "???"}`)
            }
            if (buyData.price > maxTraderPrice) {
                maxTraderPrice = buyData.price
                maxTraderName = buyData.source
            }
            setTraderValue(`${maxTraderName}: $${buyData.price}${buyData.currency === "RUB" ? "₽" : buyData.currency === "USD" ? "USD" : "???"}`)
        })
    }, [itemData])
    return (
        <div id={itemData.id} className={"Information"}>
            <h2>{itemData.name}</h2>
            <img className="ItemImage" src={itemData.image512pxLink} alt={`${itemData} image`} />
            <div className="TaskAndHideout">
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
                                <p>Task Name: {info.task_name}</p>
                                <p>Item: {info.item}</p>
                                <p>Count: {info.count}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="MarketValue">
                <h3>MarketValue</h3>
                <p>Trader: {traderValue}</p>
                <p>fleaMarket: {flareValue}</p>
            </div>
        </div>
    );
};