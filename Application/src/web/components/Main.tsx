import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../App";
import './Main.css'
import { UploadImage } from "./UploadImage";
export const Main = () => {
    const context = useContext<contextType>(AppContext)
    useEffect(() => {

    }, []);
    return (
        <div className="Main">
            <UploadImage/>
            
        </div>
    );
};