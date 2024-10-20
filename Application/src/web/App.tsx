import { useEffect, useState } from "react";
export const AppContext = createContext<contextType>({
    loading: false,
    setLoading: () => {},
    items: [],
    setItems: () => {}
});
import { createContext } from "react";
import "./App.css"
import { Sidebar } from "./components/Sidebar";

export type contextType={loading:boolean,setLoading:any,items:any[],setItems:any}
export const App = () => {
    const [image, setImage] = useState<Electron.NativeImage>();
    const [loading, setLoading]=useState<boolean>(false);
    const [items,setItems]=useState<any[]>([]);
    useEffect(() => {
        window.API.getClipboardText().then(_image => {
            setImage(_image);
        });
    }, []);
    return (
        <AppContext.Provider value={{loading,setLoading,items,setItems}}>
        <div className="Container">
            <Sidebar />
            <img src={image ? image.toDataURL() : ""} alt="Clipboard Image" />
        </div>
        </AppContext.Provider>
    );
};
