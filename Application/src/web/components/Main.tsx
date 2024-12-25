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
            setObjectUrl(await window.API.getLocalText("assets\\usage_en.png"))
        }
        console.log(context.dateKeyedItemGroup, context.loading, context.selectedTimeStamp)
        getUrl()
    },[context.selectedLanguage]);
    return (
        <div className="Main">
            <UploadImage/>
            <ItemInformationPanelList/>
            <img className="usageimage" src={objectUrl} alt="" />
        </div>
    );
};