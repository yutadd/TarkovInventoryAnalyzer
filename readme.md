# Tarkov inventry Analyzer
## features[wip]
1.Analyze inventory images and suggest selling prices on the flare market.  
...(And also looking for some other ideas)  
# POC flow
1. After fetched this repo, execute `mkdir dataset/InventoryImages/`.  
1. Download images into `dataset/InventoryImages/`.  
1. launch labelme and open `dataset/InventoryImages/` folder.  
1. Also change output directory to `dataset/InventoryImages/`.  
1. Lavel it!  
1. After labelling, execute this command at repo's root directory.(replace {} with your prefered value)  
`labelme2yolo --json_dir ./ --val_size {ValidatePercentage} --test_size {TestPercentage} --output_format bbox`  
1. Try PoC.ipynb out!  