import { ItemData } from "../../App";
import { fetchHideoutItem, fetchItemDetails, fetchTaskItem } from "./queryInformation";

export async function upload(lastUploadedImageHash: string,context:any,setUploadedImage:any): Promise<string> {
    const image: Electron.NativeImage = await window.API.getClipboardText();
    if (!image.isEmpty()) {
        const dataUrl = image.toDataURL();
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], "clipboard-image.png", { type: blob.type });
        const fileHash = await calculateHash(file);
        if (fileHash !== lastUploadedImageHash) {
            console.log("querying");
            await handleImageUpload(file, context,setUploadedImage,fileHash,);
            if (fileHash) {
                lastUploadedImageHash = fileHash;
            }
        } else {
            console.log('The clipboard image is the same as the last uploaded image.');
        }
    }
    return lastUploadedImageHash
}

export const calculateHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};
export const handleImageUpload = async (file: File, context:any,setUploadedImage:any,fileHash?: string,) => {
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
        var itemDataList: ItemData[] = [];
        
        for (const itemName of data) {
            await Promise.all([
                fetchItemDetails(itemName),
                fetchHideoutItem(itemName),
                fetchTaskItem(itemName)
            ]).then(([itemDetails, hideoutData, taskData]) => {
                if (itemDetails) {
                    itemDataList.push({ 
                        id: itemDetails.id, 
                        buyFor: itemDetails.buyFor, 
                        image512pxLink: itemDetails.image512pxLink, 
                        name: itemName, 
                        sellFor: itemDetails.sellFor,
                        hideout: hideoutData || [],
                        task: taskData || []
                    });
                } else {
                    alert("assertion failed: item data(from graph) is null");
                }
            });
        }
        
        const _datetime = Date.now()+".png";
        context.setDateKeyedItemGroup((before: any) => { return [{ date: _datetime, itemDataList }, ...before] });
        context.setSelectedTimeStamp(_datetime);
        console.log("execution setSelectedTimeStamp");
        context.setLoading(false);
    } else {
        console.log('The file is not a valid image.');
    }
};