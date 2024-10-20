import { useContext, useEffect} from "react";
import { AppContext } from "../App";
import './Sidebar.css'
export const Sidebar = () => {
    const context=useContext(AppContext)
    useEffect(() => {
        
    }, []);
    return (
        <div className="Sidebar">
            
        </div>
    );
};