import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../../App";
import './ShowInformation.css'
import { Information } from "./ShowInformationPane/Information";
export const ShowInformation = () => {
    const context = useContext<contextType>(AppContext)
    const [informations,setInformations]=useState<JSX.Element[]>([])
    useEffect(() => {
        console.log(context.items);
    const newInformations = context.items.map((item, index) => (
        <Information key={index} itemName={item} />
    ));
    setInformations(newInformations);
    }, [context.items]);
    return (
        <div className="ShowInformationPane">
            {informations}
        </div>
    );
};