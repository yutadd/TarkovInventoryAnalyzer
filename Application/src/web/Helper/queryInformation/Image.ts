import { ItemData } from "../../App";
import { fetchHideoutItem, fetchItemDetails } from "./queryInformation";

export async function upload(lastUploadedImageHash: string, context: any, setUploadedImage: any): Promise<string> {
    const image: Electron.NativeImage = await window.API.getClipboardText();
    if (!image.isEmpty()) {
        const dataUrl = image.toDataURL();
        const response = await fetch(dataUrl);
        const blob = await response.blob();
        const file = new File([blob], "clipboard-image.png", { type: blob.type });
        const fileHash = await calculateHash(file);
        if (fileHash !== lastUploadedImageHash) {
            console.log("querying");
            await handleImageUpload(file, context, setUploadedImage, fileHash,);
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
export const handleImageUpload = async (file: File, context: any, setUploadedImage: any, fileHash?: string,) => {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (validImageTypes.includes(file.type)) {
        const formData = new FormData();
        formData.append('image', file);
        setUploadedImage(file);
        context.setLoading(true);
        const reader = new FileReader();
        reader.onload = function () {
            const base64Data = reader.result?.toString().split(',')[1];

            async function analyze_result() {
                if (base64Data) {
                    const data = await window['analyzeImageWithCv2'](base64Data);
                    console.log("handleImageUpload: received detected item array:", data)
                    let itemDataList: ItemData[] = [];

                    for (const itemName of data) {
                        const exactItemName=itemName.split("§")[0]
                        await Promise.all([
                            fetchItemDetails(exactItemName),
                            //@ts-ignore
                            window.API['getHideoutItems'](exactItemName),
                            //@ts-ignore
                           window.API['getTaskItemFromFile']('taskItems.json', exactItemName)
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
                                console.log("assertion failed: item data(from graph) is null",exactItemName);
                            }
                        });
                    }
                    const _datetime = Date.now() + ".png";
                    context.setDateKeyedItemGroup((before: any) => { return [{ date: _datetime, itemDataList }, ...before] });
                    context.setSelectedTimeStamp(_datetime);
                    console.log("execution setSelectedTimeStamp");
                    context.setLoading(false);
                }
            }
            analyze_result()

        };
        reader.readAsDataURL(file);


    } else {
        console.log('The file is not a valid image.');
    }
};

