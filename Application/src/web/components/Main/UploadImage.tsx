import { useContext, useEffect, useState, useRef } from "react";
import { AppContext, contextType } from "../../App";
import './UploadImage.css'
export const UploadImage = () => {
    const context = useContext<contextType>(AppContext)
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [autoPaste, setAutoPaste] = useState<boolean>(false);
    const [refleshTime,setRefleshTime]=useState(2000);
    const calculateHash = async (file: File): Promise<string> => {
        const arrayBuffer = await file.arrayBuffer();
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    };

    useEffect(() => {
        let intervalId: NodeJS.Timeout;
        if (autoPaste) {
            let isProcessing = false;
            let lastUploadedImageHash = "";
            intervalId = setInterval(async () => {
                console.log("処理前" + isProcessing)
                if (!isProcessing) {
                    isProcessing = true;
                    (async () => {
                        const image: Electron.NativeImage = await window.API.getClipboardText();
                        if (!image.isEmpty()) {
                            
                            const dataUrl = image.toDataURL();
                            const response = await fetch(dataUrl);
                            const blob = await response.blob();
                            const file = new File([blob], "clipboard-image.png", { type: blob.type });
                            const fileHash = await calculateHash(file);
                            if (fileHash !== lastUploadedImageHash) {
                                console.log("querying");
                                await handleImageUpload(file, fileHash);
                                if (fileHash) {
                                    lastUploadedImageHash = fileHash;
                                }
                            } else {
                                console.log('The clipboard image is the same as the last uploaded image.');
                            }
                        }

                        console.log("処理後")
                        isProcessing = false;
                    })();
                }
            }, refleshTime);
        }
        return () => clearInterval(intervalId);
    }, [autoPaste]);

    const handleImageUpload = async (file: File, fileHash?: string) => {
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (validImageTypes.includes(file.type)) {
            const formData = new FormData();
            formData.append('image', file);
            setUploadedImage(file);
            context.setLoading(true);
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            console.log('Upload successful:', data);
            context.setItems(data);
            context.setLoading(false);

        } else {
            console.log('The file is not a valid image.');
        }
    };

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
                            handleImageUpload(file, fileHash);
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
                    <p>uploadedImage</p>
                    <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Preview" />
                </div>
            )}
        </div>
    );
};