from flask import Flask, request
import json
from flask_cors import CORS, cross_origin
from simulator import perform_simulations

# Opening JSON file
 
# returns JSON object as 
# a dictionary

app = Flask(__name__)
CORS(app)

@app.route('/api/options/', methods=['GET'])
@cross_origin(supports_credentials=True)
# @cross_origin(origin='*')
def options():
    f = open('data/ranking_options.json')
    options = json.load(f)
    return options

@app.route('/api/simulate/', methods=['POST'])
@cross_origin(supports_credentials=True)
def simulate():
    user_ranking = request.json['data']
    print(user_ranking)
    places = perform_simulations(user_ranking, 20)
    return places

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)