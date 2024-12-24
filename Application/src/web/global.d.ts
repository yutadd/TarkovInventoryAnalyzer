import { ItemHideoutData } from "./App";

interface Window {
    API: {
      getClipboardText: () => Promise<any>;
      getLocalText: (filepass: string) => Promise<string>;
      getTemplateImages: () => { name: string, content: string }[];
    };
    analyzeImageWithCv2: (image: string) => Promise<string[]>;
          cv: any; // cvプロパティを追加
          getHideoutItems: (itemName: string) => Promise<ItemHideoutData[]>;
  }