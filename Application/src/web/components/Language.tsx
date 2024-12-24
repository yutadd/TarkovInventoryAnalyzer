import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import './Language.css'
export const Language = () => {
    const context = useContext(AppContext);
    const [itemList, setItemList] = useState<JSX.Element[]>([]);

    useEffect(() => {
        
    }, [context.dateKeyedItemGroup]);

    return (
        <div className="LanguageContainer">
            <select className="Language" value={context.selectedLanguage} onChange={(e) => context.setSelectedLanguage(e.target.value)}>
                <option value="ja">日本語</option>
                <option value="en">English</option>
            </select>
        </div>
    );
};
