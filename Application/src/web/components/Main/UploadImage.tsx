import { useContext, useEffect, useState, useRef } from "react";
import { AppContext, contextType, ItemData } from "../../App";
import './UploadImage.css'
import { calculateHash, handleImageUpload, upload } from "../../Helper/queryInformation/Image";
export const UploadImage = () => {
    const context = useContext<contextType>(AppContext)
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [autoPaste, setAutoPaste] = useState<boolean>(false);
    const [refleshTime,setRefleshTime]=useState(2000);
    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (autoPaste) {
            let isProcessing = false;
            let lastUploadedImageHash = "";
            intervalId = setInterval(async () => {
                console.log("処理前" + isProcessing)
                if (!isProcessing) {
                    isProcessing = true;
                    lastUploadedImageHash=await upload(lastUploadedImageHash,context,setUploadedImage);
                    isProcessing=false;
                }
            }, refleshTime);
        }
        return () => clearInterval(intervalId);
    }, [autoPaste]);
    return (
        <div className="UploadImagePane">
            <label>
                <input
                    type="checkbox"
                    checked={autoPaste}
                    onChange={(e) => setAutoPaste(e.target.checked)}
                />
                <span className="AskAutoPasteText">Paste image from clipboard automatically</span>
            </label>
            <div className="RefleshTimeBar">
                <label>
                    <span>Retrive Clipboard between (ms): </span>
                    <input
                        type="range"
                        min="100"
                        max="5000"
                        step="100"
                        value={refleshTime}
                        onChange={(e) => setRefleshTime(Number(e.target.value))}
                    />
                    <span>{refleshTime} ms</span>
                </label>
            </div>
            <div
                className="ImageSelectionPane"
                onDrop={async (e) => {
                    e.preventDefault();
                    if (!context.loading) {
                        const files = e.dataTransfer.files;
                        if (files.length > 0) {
                            const file = files[0];
                            const fileHash = await calculateHash(file);
                            handleImageUpload(file, context,setUploadedImage,fileHash);
                            console.log('The dropped image is the same as the last uploaded image.');
                        }
                    } else {
                        console.log("There is a uploading image.")
                    }
                }}
                onDragOver={(e) => e.preventDefault()}
            >
                <p>Drag & Drop your file here</p>
            </div>
            {uploadedImage && (
                <div className="UploadedImagePreview">
                    <p className="AskAutoPasteText">uploadedImage</p>
                    <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Preview" />
                </div>
            )}
        </div>
    );
};