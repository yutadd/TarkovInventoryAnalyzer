import { build } from "electron-builder";

build({
    config: {
        appId: "com.yutadd.TIA",
        productName: "Tarkov Inventory Analyzer",
        artifactName: "${productName}-${version}-${platform}-${arch}.${ext}",
        files: ["dist/**/*"],
        directories: {
            output: "release",
        },
        win:{icon:"assets/win/icon.ico"}
    },
});