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
    isLanguageShown: false,
    setIsLanguageShown: () => { },
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
export type contextType = { loading: boolean, setLoading: any, dateKeyedItemGroup: DateKeyedItem[], setDateKeyedItemGroup: any, selectedTimeStamp: string, setSelectedTimeStamp: any, isSidebarShown: boolean, setIsSidebarShown: any, isHintShown: boolean, setIsHintShown: any, isLanguageShown: boolean, setIsLanguageShown: any, }

export const App = () => {
    useEffect(() => {
        const checkOpenCv = setInterval(() => {
            if (window.cv && window.cv.Mat) {
                clearInterval(checkOpenCv);
                window['analyzeImageWithCv2'] = async (image: string) => {
                    // アイテム名のリストを初期化
                    const detectedItems: string[] = [];
                    const files: { name: string, content: string }[] = await window.API.getTemplateImages();
                    console.log("analyzeImageWithCv2: received following template images:", files)
                    const imgElement2 = new Image();
                    imgElement2.src = `data:image/png;base64,${image}`;
                    // すべてのテンプレート画像の処理をPromiseでラップ
                    await new Promise<void>((resolve) => {
                        imgElement2.onload = () => {
                            const promises = files.map(({ name, content }) => {
                                return new Promise<void>((resolve) => {
                                    const imgElement = new Image();
                                    imgElement.src = `data:image/png;base64,${content}`;
                                    imgElement.onload = () => {
                                        const template = window.cv.imread(imgElement);
                                        const result = new window.cv.Mat();
                                        window.cv.matchTemplate(window.cv.imread(imgElement2), template, result, window.cv.TM_CCOEFF_NORMED);

                                        const threshold = 0.77;
                                        const locations = window.cv.minMaxLoc(result);

                                        if (locations.maxVal >= threshold) {
                                            console.log(name);
                                            detectedItems.push(name);
                                        }

                                        result.delete();
                                        template.delete();
                                        resolve(); // このテンプレート画像の処理が完了したことを示す
                                    };
                                });
                            });

                            // すべてのテンプレート画像の処理が完了するのを待つ
                            Promise.all(promises).then(() => {
                                resolve(); // すべての画像の処理が完了したことを示す
                            });
                        };
                    });

                    console.log("analyzeImageWithCv2: returning:", detectedItems);
                    return detectedItems;
                }
                console.log("embeded analyze function in to window")
            }
        }, 100);
    }, []);
    const [loading, setLoading] = useState<boolean>(false);
    const [dateKeyedItemGroup, setDateKeyedItemGroup] = useState<DateKeyedItem[]>([]);
    const [selectedTimeStamp, setSelectedTimeStamp] = useState<string>("")
    const [isSidebarShown, setIsSidebarShown] = useState<boolean>(false)
    const [isHintShown, setIsHintShown] = useState<boolean>(false)
    const [isLanguageShown, setIsLanguageShown] = useState<boolean>(false)
    return (
        <AppContext.Provider value={{ loading, setLoading, dateKeyedItemGroup, setDateKeyedItemGroup, selectedTimeStamp: selectedTimeStamp, setSelectedTimeStamp: setSelectedTimeStamp, isSidebarShown, setIsSidebarShown, isHintShown, setIsHintShown, isLanguageShown, setIsLanguageShown }}>
            <div className="Container">
                <Sidebar />
                <Main />
                <Hint />
                <Language />
            </div>
        </AppContext.Provider>
    );
};
