import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../App";
import './Main.css'
import { UploadImage } from "./Main/UploadImage";
import { ShowInformation } from "./Main/ShowInformation";
export const Main = () => {
    const context = useContext<contextType>(AppContext)
    useEffect(() => {

    }, []);
    return (
        <div className="Main">
            <UploadImage/>
            <ShowInformation />
        </div>
    );
};