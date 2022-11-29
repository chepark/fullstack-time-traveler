
import json
import os

from flask import Flask, request, Response
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv
import config

from game import Game  

load_dotenv()

config.connection = mysql.connector.connect(
         host=os.environ.get('HOST'),
         port= 3306,
         database=os.environ.get('DB_NAME'),
         user=os.environ.get('DB_USER'),
         password=os.environ.get('DB_PASS'),
         autocommit=True
         )

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

#http://127.0.0.1:5000/user?name=sophie
@app.route('/user/')
def getUser():
    args = request.args
    name = args.get("name")
    #find the user with the name.
    # 1-1 user exists? -> fetch the user data
    # 1-2 NO user? -> create a new user  
 
#http://127.0.0.1:5000/airport/all
@app.route('/airport/all')
def getAllAirports():
    sql = "SELECT * FROM airport WHERE type='large_airport'"
    cursor = config.connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()

    game= Game()
    print(vars(game))
  
    if cursor.rowcount > 0: 
       response = {"data": result, "status": 200}
       return response

#http://127.0.0.1:5000/newgame 
@app.route('/newgame ')
def createGame():
    game = Game()

#http://127.0.0.1:5000/game?id=game1?benefit=20
@app.route('/game/')
def getGame():
    args = request.args
    game_id = args.get('id')
    co2_benefit = args.get('benefit')

if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)



