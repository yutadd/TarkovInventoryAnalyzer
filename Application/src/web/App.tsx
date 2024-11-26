import { useEffect, useState } from "react";
export const AppContext = createContext<contextType>({
    loading: false,
    setLoading: () => { },
    dateKeyedItemGroup:[],
    setDateKeyedItemGroup:()=>{},
    selectedTimeStamp:"",
    setSelectedTimeStamp:()=>{},
    isSidebarShown:false,
    setIsSidebarShown:()=>{},
    isHintShown:false,
    setIsHintShown:()=>{},
});
import { createContext } from "react";
import "./App.css"
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";
import { Hint } from "./components/Hint";
export type TaskItemData={ task_id: string; task_name: string; item: string; count: number };
export type ItemHideoutData={ station: string; level: number; item: string; count: number }
export type ItemData={ id: string,name:string, buyFor: { price: number, source: string, currency: string }[], sellFor: { currency: string, price: number, vendor: { name: string } }[], image512pxLink: string,hideout:ItemHideoutData[],task:TaskItemData[]};
export type DateKeyedItem={ date: string,itemDataList:ItemData[]}
export type contextType = { loading: boolean, setLoading: any, dateKeyedItemGroup: DateKeyedItem[], setDateKeyedItemGroup: any,selectedTimeStamp:string,setSelectedTimeStamp:any,isSidebarShown:boolean,setIsSidebarShown:any, isHintShown:boolean, setIsHintShown:any}
export const App = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [dateKeyedItemGroup, setDateKeyedItemGroup] = useState<DateKeyedItem[]>([]);
    const [selectedTimeStamp,setSelectedTimeStamp]=useState<string>("")
    const[isSidebarShown,setIsSidebarShown]=useState<boolean>(false)
    const[isHintShown,setIsHintShown]=useState<boolean>(false)
    return (
        <AppContext.Provider value={{ loading, setLoading, dateKeyedItemGroup, setDateKeyedItemGroup, selectedTimeStamp: selectedTimeStamp,setSelectedTimeStamp: setSelectedTimeStamp,isSidebarShown,setIsSidebarShown,isHintShown,setIsHintShown}}>
            <div className="Container">
                <Sidebar />
                <Main />
                <Hint/>
            </div>
        </AppContext.Provider>
    );
};
