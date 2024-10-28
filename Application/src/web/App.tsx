import { useEffect, useState } from "react";
export const AppContext = createContext<contextType>({
    loading: false,
    setLoading: () => { },
    dateKeyedItemGroup:[],
    setDateKeyedItemGroup:()=>{},
    selectedTimeStamp:0,
    setSelectedTimeStamp:()=>{}
});
import { createContext } from "react";
import "./App.css"
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";
export type ItemData={ id: string,name:string, buyFor: { price: number, source: string, currency: string }[], sellFor: { currency: string, price: number, vendor: { name: string } }[], image512pxLink: string };
export type DateKeyedItem={ date: number,itemDataList:ItemData[]}
export type contextType = { loading: boolean, setLoading: any, dateKeyedItemGroup: DateKeyedItem[], setDateKeyedItemGroup: any,selectedTimeStamp:number,setSelectedTimeStamp:any }
export const App = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dateKeyedItemGroup, setDateKeyedItemGroup] = useState<DateKeyedItem[]>([]);
    const [selectedTimeStamp,setSelectedTimeStamp]=useState<number>(0)
    
    return (
        <AppContext.Provider value={{ loading, setLoading, dateKeyedItemGroup, setDateKeyedItemGroup, selectedTimeStamp: selectedTimeStamp,setSelectedTimeStamp: setSelectedTimeStamp}}>
            <div className="Container">
                <Sidebar />
                <Main />
            </div>
        </AppContext.Provider>
    );
};
