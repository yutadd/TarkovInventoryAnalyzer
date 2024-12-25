import { useEffect, useState } from "react";
export const AppContext = createContext<contextType>({
    loading: false,
    setLoading: () => { },
    dateKeyedItemGroup: [],
    setDateKeyedItemGroup: () => { },
    selectedTimeStamp: "",
    setSelectedTimeStamp: () => { },
    isSidebarShown: false,
    setIsSidebarShown: () => { },
    isHintShown: false,
    setIsHintShown: () => { },
    selectedLanguage: "en",
    setSelectedLanguage: () => { },
});
import { createContext } from "react";
import "./App.css"
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";
import { Hint } from "./components/Hint";
import { Language } from "./components/Language";
export type TaskItemData = { taskId: string; taskName: string; item: string; count: number };
export type ItemHideoutData = { station: string; level: number; item: string; count: number }
export type ItemData = { id: string, name: string, buyFor: { price: number, source: string, currency: string }[], sellFor: { currency: string, price: number, vendor: { name: string } }[], image512pxLink: string, hideout: ItemHideoutData[], task: TaskItemData[] };
export type DateKeyedItem = { date: string, itemDataList: ItemData[] }
export type contextType = { loading: boolean, setLoading: any, dateKeyedItemGroup: DateKeyedItem[], setDateKeyedItemGroup: any, selectedTimeStamp: string, setSelectedTimeStamp: any, isSidebarShown: boolean, setIsSidebarShown: any, isHintShown: boolean, setIsHintShown: any, selectedLanguage: "en" | "ja", setSelectedLanguage: any, }

export const App = () => {
    useEffect(() => {
        window.electron.ipcRenderer.on('menu-click', (event:any, message:any) => {
            if (event === 'history') {
                // フロントエンド側で行いたい処理をここに記述
                console.log('History menu clicked');
            }
        });

        // クリーンアップ
        return () => {
            window.electron.ipcRenderer.removeAllListeners('menu-click');
        };
    }, []);
    const [loading, setLoading] = useState<boolean>(false);
    const [dateKeyedItemGroup, setDateKeyedItemGroup] = useState<DateKeyedItem[]>([]);
    const [selectedTimeStamp, setSelectedTimeStamp] = useState<string>("")
    const [isSidebarShown, setIsSidebarShown] = useState<boolean>(false)
    const [isHintShown, setIsHintShown] = useState<boolean>(false)
    const [selectedLanguage, setSelectedLanguage] = useState<"en" | "ja">("en")
    return (
        <AppContext.Provider value={{ loading, setLoading, dateKeyedItemGroup, setDateKeyedItemGroup, selectedTimeStamp: selectedTimeStamp, setSelectedTimeStamp: setSelectedTimeStamp, isSidebarShown, setIsSidebarShown, isHintShown, setIsHintShown, selectedLanguage, setSelectedLanguage }}>
            <div className="Container">
                <Sidebar />
                <Main />
                <Hint />
                <Language />
            </div>
        </AppContext.Provider>
    );
};
