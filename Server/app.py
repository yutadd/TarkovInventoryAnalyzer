from flask import Flask, jsonify, request
from ultralytics import YOLO
from PIL import Image
import io
import json
app=Flask(__name__)
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Assuming YOLO model is already loaded and available as `yolo_model`
    # and a function `analyze_image_with_yolo` is defined to process the image
    # and return detected item names.
    try:
        image = file.read()
        
        # 画像をPILで開く
        image = Image.open(io.BytesIO(image))
        
        # 必要に応じてRGBに変換
        if image.mode != 'RGB':
            image = image.convert('RGB')
        
        # YOLOモデルで使用するためにバイトデータに変換
        image_bytes = io.BytesIO()
        image.save(image_bytes, format='JPEG')
        image_bytes = image_bytes.getvalue()
        item_names = analyze_image_with_yolo(image)
        # TODO: 検出したオブジェクトの位置がわかる画像を一緒に返してもいいかも
        return jsonify(item_names), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/search_hideouts', methods=['GET'])
def get_hideout_items():
    try:
        # リクエストからアイテム名を取得
        item_name = request.args.get('item_name', None)
        
        if not item_name:
            return jsonify({'error': 'No item name provided'}), 400
        
        # JSONファイルを開く
        with open('hideoutItems.json', 'r', encoding='utf-8') as f:
            hideout_data = json.load(f)
        
        # 指定されたアイテムに関連するすべてのhideout情報を収集
        hideout_info_list = []
        for station in hideout_data['data']['hideoutStations']:
            for level in station['levels']:
                for requirement in level['itemRequirements']:
                    if requirement['item']['name'] == item_name:
                        hideout_info_list.append({
                            'station': station['name'],
                            'level': level['level'],
                            'item': item_name,
                            'count': requirement['count']
                        })
        
        if hideout_info_list:
            return jsonify(hideout_info_list), 200
        else:
            return jsonify({}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/search_tasks', methods=['GET'])
def get_task_items():
    try:
        # リクエストからアイテム名を取得
        item_name = request.args.get('item_name', None)
        
        if not item_name:
            return jsonify({'error': 'No item name provided'}), 400
        
        # JSONファイルを開く
        with open('taskItems.json', 'r', encoding='utf-8') as f:
            task_data = json.load(f)
        
        # 指定されたアイテムに関連するすべてのタスク情報を収集
        task_info_list = []
        for task in task_data['data']['tasks']:
            for objective in task['objectives']:
                if 'items' in objective:
                    for item in objective['items']:
                        if item['name'] == item_name:
                            task_info_list.append({
                                'task_id': task['id'],
                                'task_name': task['name'],
                                'item': item_name,
                                'count': objective.get('count', 1)
                            })
        
        if task_info_list:
            return jsonify(task_info_list), 200
        else:
            return jsonify({}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
def analyze_image_with_yolo(image):
    # YOLOモデルをロード
    model = YOLO(r'best.pt')
    
    # 画像を予測
    result = model.predict(image, save=False, conf=0.25)
    
    # 検出されたアイテム名を取得
    item_names = []
    for r in result:
        labels = r.names
        for box in r.boxes:
            item_names.append(labels[int(box.cls[0])])
    item_names = list(set(item_names))
    return item_names
if __name__ == '__main__':
    app.run(debug=False,port=8080)
