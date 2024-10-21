import { useEffect, useState } from "react";
export const AppContext = createContext<contextType>({
    loading: false,
    setLoading: () => { },
    items: [],
    setItems: () => { }
});
import { createContext } from "react";
import "./App.css"
import { Sidebar } from "./components/Sidebar";
import { Main } from "./components/Main";

export type contextType = { loading: boolean, setLoading: any, items: any[], setItems: any }
export const App = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [items, setItems] = useState<any[]>([]);
    useEffect(() => {
    }, []);
    return (
        <AppContext.Provider value={{ loading, setLoading, items, setItems }}>
            <div className="Container">
                <Sidebar />
                <Main />
            </div>
        </AppContext.Provider>
    );
};
