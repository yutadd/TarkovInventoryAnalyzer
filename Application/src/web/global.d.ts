import { TaskItemData } from "./App";

interface Window {
    API: {
      getClipboardText: () => Promise<any>;
      getLocalText: (filepass: string) => Promise<string>;
      getTemplateImages: () => { name: string, content: string }[];
      getTaskItemFromFile: (fileName:string, itemName:string) => TaskItemData[]
    };
    analyzeImageWithCv2: (image: string) => Promise<string[]>;
          cv: any; // cvプロパティを追加
          getHideoutItems: (image: string) => Promise<string>;
          getTaskItems: (itemName:string) => Promise<JSON>;
  }