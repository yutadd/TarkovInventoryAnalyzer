from flask import Flask, jsonify, request
from ultralytics import YOLO
from PIL import Image
import io
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