import { useContext, useEffect, useState } from "react";
import { AppContext, contextType } from "../App";
import './Main.css'
export const Main = () => {
    const context = useContext<contextType>(AppContext)
    const [uploadedImage, setUploadedImage] = useState<File | null>(null)
    const [autoPaste, setAutoPaste] = useState<boolean>(false);
    useEffect(() => {

    }, []);
    return (
        <div className="Main">
            <label>
                <input
                    type="checkbox"
                    checked={autoPaste}
                    onChange={(e) => setAutoPaste(e.target.checked)}
                />
                <span className="AskAutoPasteText">Paste image from clipboard automatically</span>
            </label>
            <div
                className="ImageSelectionPane"
                onDrop={(e) => {
                    e.preventDefault();
                    if (!context.loading) {
                        const files = e.dataTransfer.files;
                        if (files.length > 0) {
                            const file = files[0];
                            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
                            if (validImageTypes.includes(file.type)) {
                                const formData = new FormData();
                                formData.append('image', file);
                                setUploadedImage(file)
                                context.setLoading(true)
                                fetch('http://localhost:8080/upload', {
                                    method: 'POST',
                                    body: formData
                                })
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        console.log('Upload successful:', data);
                                        context.setItems(data)
                                        context.setLoading(false)
                                    })
                                    .catch(error => {
                                        context.setLoading(false)
                                        console.error('Error uploading image:', error);
                                    });
                                console.log('The file is a valid image.');
                            } else {
                                console.log('The file is not a valid image.');
                            }
                            console.log('File uploaded:', files[0]);
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
                    <img src={URL.createObjectURL(uploadedImage)} alt="Uploaded Preview" />
                </div>
            )}
        </div>
    );
};