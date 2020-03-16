import os
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

from model.predictor import Predictor

app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_word():
    return predict("xin chao")


@app.route('/api', methods=['POST'])
def get_prediction():
    text = request.json['text']
    pred = predict(text)
    res = {
        "input": text,
        "predict": pred
    }
    return jsonify(res)


def init_predictor(config_path):
    with open(config_path) as f:
        config = json.load(f)
    dir_name = os.path.abspath(os.path.dirname(config_path))
    config['src_vocab'] = os.path.join(dir_name, config['src_vocab'])
    config['tgt_vocab'] = os.path.join(dir_name, config['tgt_vocab'])
    config['model_weight'] = os.path.join(dir_name, config['model_weight'])
    if config['lm_path']:
        config['lm_path'] = os.path.join(dir_name, config['lm_path'])
    
    Predictor(config)

def predict(text):
    predictor = Predictor()
    return predictor.predict(text)

if __name__ == "__main__":
    init_predictor("weight/config.json")
    app.run('0.0.0.0', port=5000)