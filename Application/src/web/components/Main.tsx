import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../App";
import './Main.css'
import { UploadImage } from "./Main/UploadImage";
import { ItemInformationPanelList } from "./Main/ItemInformationPanelList";
export const Main = () => {
    const [objectUrl,setObjectUrl]=useState("")
    const context = useContext<contextType>(AppContext);
    useEffect(() => {
        async function getUrl() {
            setObjectUrl(await window.API.getLocalText(context.selectedLanguage==="en"?"assets\\usage_en.png":"assets\\usage_ja.png"))
        }
        console.log(context.dateKeyedItemGroup, context.loading, context.selectedTimeStamp)
        getUrl()
    },[context.selectedLanguage]);
    return (
        <div className="Main">
            <UploadImage/>
            <ItemInformationPanelList/>
            {
                context.dateKeyedItemGroup.length === 0 ? <img className="usageimage" src={objectUrl} alt="" />:<></>
            }
            
        </div>
    );
};