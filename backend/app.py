import os
import random
from decimal import *

from flask import Flask, request, Response, g
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv

import config
from models.game import Game
from models.user import User
from models.goal import Goal

# HANDLE LOAD .env file
# PLEASE TAKE A LOOK 
# README.md file on the root of the project.

load_dotenv()

# CONNECT TO DB
config.connection = mysql.connector.connect(
    host=os.environ.get('HOST'),
    port=3306,
    database=os.environ.get('DB_NAME'),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASS'),
    autocommit=True
)

def handleError(error_message): 
    response = {"error":error_message, "status": 500}
    return response


app = Flask(__name__)

# HANDLE CORS ISSUE
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# TESTING URL: 
# http://127.0.0.1:5000/airport/all
@app.route('/airport/all')
def getAllAirports():
    try: 
        sql = "SELECT ident, name, iso_country, latitude_deg, longitude_deg FROM airport WHERE type='large_airport'"
        cursor = config.connection.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()
        data = []

        for x in results:
            airport = {"ident": x[0], "name": x[1], "iso_country": x[2], "latitude": x[3], "longitude": x[4]}
            data.append(airport)

        if cursor.rowcount > 0:
            response = {"data": data, "status": 200}
            return response
    except Exception as e: 
        handleError(e)

# TESTING URL: 
# http://127.0.0.1:5000/user/sophie
@app.route('/user/<name>')
def get_user(name):
    # ! issue:
    # Minor:  max(score) result throws ALWAYS ONE result. -> cursor.rowcount result is ONE ALWAYS.
    # Therefore, the logic in the line 96 does not catch new user. | "if cursor.rowcount == 0"
    # Take a look: https://pynative.com/python-cursor-fetchall-fetchmany-fetchone-to-read-rows-from-table/

    # Major:  fetchall() returns 1 row of (None), if there is no data in db. 
    # It returns always more than 1 no matter row exists or not.
    # Better to use fetchone() for cleaner code. 
    # Other possibility: My DB table set is different from Diep's
    
    # Check if user already exist or not?
    try: 
        sql = "SELECT gameId, userName, max(score) FROM game"
        sql += " WHERE userName='" + name + "'"

        cursor = config.connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchone() 

        # if user exist, return user's name and user's highest score
        if result[0] != None:
            gameId = result[0]
            name = result[1]
            max_score = result[2]
            data = {
                "is_new_user": False,
                "game_id": gameId,
                "name": name,
                "max_score": max_score, 
                }
            response = {"data": data, "status": 200}
            return response

        # if user does not exist, insert user's name into db (insert both name and score after user finish the game)
        else:
            add_name = "INSERT INTO game (userName) VALUES ('" + name + "')"
            cursor = config.connection.cursor()
            cursor.execute(add_name)
            config.connection.commit()
            
            get_gameId = "SELECT LAST_INSERT_ID()"
            cursor = config.connection.cursor()
            cursor.execute(get_gameId)
            gameId = cursor.fetchone()[0]

            data = {
                    "is_new_user": True,
                    "game_id": gameId,
                    "name": name,
                    "max_score": None, 
                    }

            response = {"data": data, "status": 200}
            return response
    except Exception as e: 
        handleError(e)      


# TESTING URL: 
# http://127.0.0.1:5000/newgame?gameId=3&co2benefit=20
@app.route('/newgame')
def newGame():
    game = Game()
    goal = Goal()

    args = request.args
    gameId = int(args.get("gameId"))
    co2benefit = int(args.get("co2benefit"))

    game.set_co2benefit(co2benefit)

    # 1. generate random airport to start
    game.set_random_airport()

    longitude = game.current_location['longitude']
    latitude = game.current_location['latitude']
    
    # 2. get initial local time
    current_time = game.get_time(latitude, longitude)
    
    # 3. generate goal
    goal.generate_goal(longitude, latitude)
    goal_time = [goal.time, goal.hour]

    # 4. set necessary data in SQL to start game
    game.set_default_data(gameId, current_time, goal_time)
  
    # 5. get data from db & send response
    data = game.get_game_data(gameId)
    response = {"data": data, "status": 200}
    
    return response
   


# URL: http://127.0.0.1:5000/result?gameId=3&airport_name=Dublin%20Airport
@app.route('/result')
def draw_result():  
    game = Game()
    goal = Goal()

    args = request.args
    gameId = args.get("gameId")
    new_location_name = args.get("airport_name")

    # update new locatioin coordinate
    game.new_location['name'] = new_location_name
    game.get_coordinate(new_location_name, 'new')

    # calculate co2
    game.calculate_co2(gameId)

    # update game data: co2, current location
    game.update_db(gameId)
   
    # check achievement
    goal.is_goal_reached(game.current_location['latitude'], game.current_location['longitude'])  # checks if the time in current_location the same as in goal time
    success = goal.is_reached
    game_over = game.game_over

    data = {"co2budget": game.co2_budget, 'success': success, 'game_over': game_over}
    response = {"data": data, "status": 200}
    return response
   


# URL: http://127.0.0.1:5000/newgoal?userid=user112&gameid=game292&current_loc=helsinki%airport
@app.route('/newgoal')
def generate_newgoal():
    args = request.args
    gameId = args.get('gameid')
    #1. get the longitude, latitude from game class
    #1.1 for testing purpose, create game instance
    game = Game()

    #2. create goal instance
    goal = Goal()
    # use generate_goal
    goal.generate_goal(longitude, latitude)
    data = {"new_goal": goal.time, "status": 200}
    response = {'data': data, 'status': 200}
    return response

def getGameInstance():
    return globalGame

if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)