import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import './Language.css'
export const Language = () => {
    const context = useContext(AppContext)
    const [itemList, setItemList] = useState<JSX.Element[]>([])

    useEffect(() => {

    }, [context.dateKeyedItemGroup]);
    return (<div className="LanguageContainer">
        <input type="button" value="日本語"/>
        <input type="button" value="English"/>
    </div>
    );
};
