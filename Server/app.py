from flask import Flask, jsonify, request
from PIL import Image
import io
import json
app=Flask(__name__)

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

if __name__ == '__main__':
    app.run(debug=False,port=8080)
