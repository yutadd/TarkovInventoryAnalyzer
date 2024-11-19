# Tarkov inventry Analyzer
![wip](https://img.shields.io/badge/WIP%20-red)
![not released yet](https://img.shields.io/badge/not_released-yet-yellow)
## About
**Note** This repository is only a POC to see if the pattern matching process can be employed for item detection. 
But you might use this repository as framework for item detection tool.
## Supported items
There are 26 items this POC can detects. And you can add dataset easily.  
## Experiment version
As shown in the following images, you can view details of "market value," "task demand," and "hideout demand."  
After launch:  
![image](./resources/1.png)
After past and analyze image:
![image](./resources/2.png)
Result
![image](./resources/3.png)
Result2
![image](./resources/4.png)
## How to use the tool
### Server
1. You need to open the Server directory in the TarkovInventoryAnalyzer directory and start the Python file labeled `app.py`.
```bash
python app.py
```
### Application
1. You need to open the Application directory of the TarkovInventoryAnalyzer directory and install the node package.  
**Note:** If you have installed the node package once, skip this task.
```bash
npm i
```
2. Then you need to launch the application.
```bash
npm run dev
```
## Committers
坂島悠太: Tech Lead, Engineering, Management  
大成輝: UI adjustments  
河野天星: create dataset image  
山根涼: create dataset image  
石橋怜大: create dataset image 

## Schedule plan
The entire process from image upload to displaying analysis results has been completed. However, there are still challenges with the limited number of supported items, the accuracy of item detection, and the UI design.