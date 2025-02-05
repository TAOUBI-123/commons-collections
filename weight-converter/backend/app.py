from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/convert', methods=['POST'])
def convert_weight():
    data = request.get_json()
    lbs = data.get('lbs')
    if lbs is None:
        return jsonify({'error': 'No weight provided'}), 400
    kg = lbs * 0.453592
    return jsonify({'kg': round(kg, 2)})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

