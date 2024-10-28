import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../App";
import './Main.css'
import { UploadImage } from "./Main/UploadImage";
import { ItemInformationPanelList } from "./Main/ItemInformationPanelList";
export const Main = () => {
    const context = useContext<contextType>(AppContext);
    useEffect(() => {
        console.log(context.dateKeyedItemGroup,context.loading,context.selectedTimeStamp)
    },[context.dateKeyedItemGroup,context.loading,context.selectedTimeStamp]);
    return (
        <div className="Main">
            <UploadImage/>
            <ItemInformationPanelList/>
        </div>
    );
};