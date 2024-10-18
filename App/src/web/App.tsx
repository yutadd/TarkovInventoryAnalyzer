import { useEffect, useState } from "react";
export const App = () => {
    const [image, setImage] = useState<Electron.NativeImage>();
    useEffect(() => {
        window.API.getClipboardText().then(_image => {
            setImage(_image);
        });
    }, []);
    return (
        <div className="container">
            <h1>Hello.</h1>
            <img src={image ? image.toDataURL() : ""} alt="Clipboard Image" />
        </div>
    );
};
