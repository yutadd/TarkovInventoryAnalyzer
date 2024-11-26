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
            setObjectUrl(await window.API.getLocalText("assets\\usage.png"))
        }
        console.log(context.dateKeyedItemGroup, context.loading, context.selectedTimeStamp)
        getUrl()
    },[context.dateKeyedItemGroup,context.loading,context.selectedTimeStamp]);
    return (
        <div className="Main">
            <UploadImage/>
            <ItemInformationPanelList/>
            {/* TODO:追加した画像を適切な大きさにする */}
            <img className="usageimage" src={objectUrl} alt="" />
        </div>
    );
};