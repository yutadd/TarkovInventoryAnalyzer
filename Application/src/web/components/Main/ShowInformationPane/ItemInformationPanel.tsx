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
        })
        itemData.sellFor.map(sellData => {
            if (sellData.price > maxTraderPrice) {
                if (sellData.vendor.name !== "Flea Market"){
                    maxTraderPrice = sellData.price
                    maxTraderName = sellData.vendor.name
                }
            }
            if (maxTraderName !== "???"){
            setTraderValue(`${maxTraderName}: ${sellData.price}${sellData.currency === "RUB" ? "₽" : sellData.currency === "USD" ? "USD" : "???"}`)
            }
        })
    }, [itemData])
    return (<>
    <hr />
    {/** 
     * ・context.selectedLanguageには"en"か"ja"のどちらかが格納されている
     * ・itemData(型:ItemData)のnameプロパティにはアイテムの名前が次のように格納されている：
     * 　英語名+"§"+日本語名 例：Pack of sugar§角砂糖
     * 
     * TODO: ↓三項演算子を使った実装例
    */}
        <h2>{itemData.name.split("§")[context.selectedLanguage==="en"?0:1]}</h2>
        
        <div id={itemData.name} className={"Information"}>

            <img className="ItemImage" src={itemData.image512pxLink} alt={`${itemData} image`} />
            <div className="TaskAndHideout">
                {itemData.hideout.length > 0 && (
                    <div>
                        <h3>Hideout Information:</h3>
                        {itemData.hideout.map((info, index) => (
                            <div key={index} >
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
                                <p>Task Name: {info.taskName}</p>
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
    </>
    );
};