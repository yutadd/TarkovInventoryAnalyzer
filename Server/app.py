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
                # PIL ImageをNumPy配列に変換
        image_np = np.array(image)
        
        # OpenCVはBGR形式を使用するため、RGBからBGRに変換
        image_cv2 = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)
        
        item_names = analyze_image_with_cv2(image_cv2)
        # TODO: 検出したオブジェクトの位置がわかる画像を一緒に返してもいいかも
        return jsonify(item_names), 200
    except Exception as e:
        import traceback
        print("エラーが発生しました:", e)
        print("トレースバック情報:", traceback.format_exc())
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
import cv2
import numpy as np
import base64
def analyze_image_with_cv2(image):
    # 画像はすでにNumPy配列として渡されているので、cv2.imreadは不要
    screenshot = image
    
    # アイテム名のリストを初期化
    detected_items = []

    # itemImages/ ディレクトリ内のすべてのテンプレート画像を再帰的に処理
    import os
    for root, dirs, files in os.walk('itemImages/'):
        for template_name in files:
            # テンプレート画像を読み込む
            template_path = os.path.join(root, template_name)
            template = cv2.imread(template_path)

            # テンプレートマッチングを実行
            result = cv2.matchTemplate(screenshot, template, cv2.TM_CCOEFF_NORMED)

            # 類似度の閾値を設定して、アイテムの位置を確認
            threshold = 0.77
            locations = np.where(result >= threshold)

            # 検出された位置があれば、アイテム名をリストに追加
            if locations[0].size > 0:
                item_name_encoded = os.path.splitext(template_name)[0]  # 拡張子を除いたファイル名を取得
                item_name = base64.b64decode(item_name_encoded).decode('utf-8')  # base64デコードしてアイテム名を取得
                detected_items.append(item_name)
    # 検出されたアイテム名のリストを返す
    return detected_items

if __name__ == '__main__':
    app.run(debug=False,port=8080)
