from flask import Flask, request
from datetime import datetime
import json
from flask_cors import CORS, cross_origin
from simulator import perform_simulations
# from confluent_kafka import Producer
import socket
import psycopg2

# kafka_conf = {'bootstrap.servers': 'host1:9092,host2:9092',
#         'client.id': socket.gethostname()}

app = Flask(__name__)
CORS(app)
# producer = Producer(kafka_conf)
db_connection = psycopg2.connect(database = "choices", 
                        user = "choices", 
                        host= 'postgres',
                        password = "password",
                        port = 5432)

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
    # producer.produce('simulation_request', key='key', value='value')
    user_ranking = request.json['data']
    user_id = 1

    # Insert relevant ranking rows in the DB
    ranking_db_insert('test-ranking', user_ranking, user_id)

    places = perform_simulations(user_ranking, 100)
    return places

def ranking_db_insert(ranking_name, user_ranking, user_id):
    cur = db_connection.cursor()

    # Create a new ranking and get its ID
    cur.execute('INSERT INTO RANKING (ranking_name, user_id, created_date) VALUES (%(ranking_name)s, %(user_id)s, %(created_date)s) RETURNING ranking_id', {'ranking_name': ranking_name, 'user_id': user_id, 'created_date': datetime.now()})
    ranking_id = cur.fetchone()[0]

    # Create individual ranking positions attached to main ranking
    for index in range(len(user_ranking)):
        deanery_id = user_ranking[index]
        cur.execute('INSERT INTO RANKING_POSITION (ranking_id, deanery_id, position) VALUES (%(ranking_id)s, %(deanery_id)s, %(position)s)', {'ranking_id': ranking_id, 'deanery_id': deanery_id, 'position': index})
    
    # Commit and close the cursor
    db_connection.commit()
    cur.close()

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)