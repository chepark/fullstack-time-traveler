import os
import random
from decimal import *

from flask import Flask, request, Response, g
from flask_cors import CORS
import mysql.connector
from dotenv import load_dotenv

import config
from models.game import Game
from models.goal import Goal
from models.user import User

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
def get_all_airports():
    try: 
        game = Game()
        data = game.get_airports()
        response = {"data": data, "status": 200}
        return response
    except Exception as e: 
        handleError(e) 


# TESTING URL: 
# http://127.0.0.1:5000/user/sophie
@app.route('/user/<name>')
def get_user(name):
    try: 
        user = User()

        data = user.get_user(name)
        response = {"data": data, "status": 200}
        return response

    except Exception as e: 
        handleError(e)      


# TESTING URL: 
# http://127.0.0.1:5000/newgame?gameId=15&co2benefit=20
@app.route('/newgame')
def newGame():
    args = request.args
    gameId = int(args.get("gameId"))
    co2benefit = int(args.get("co2benefit"))

    game = Game()
    goal = Goal()

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
   


# URL: http://127.0.0.1:5000/result?gameId=15&airport_name=Dublin%20Airport
@app.route('/result')
def draw_result():  
    args = request.args
    gameId = args.get("gameId")
    new_location_name = args.get("airport_name")

    game = Game()

    ### update location and co2 calculation ###
    # 1. update new locatioin coordinate
    game.new_location['name'] = new_location_name
    game.get_coordinate(new_location_name, 'new')

    # 2. get new location time from api
    time_data = game.get_time(game.new_location['latitude'], game.new_location['longitude'])
    current_time = time_data[0]
    current_hour = time_data[1]

    # 3. update new location time in game class
    game.set_current_time(current_time, current_hour)

    # 4. calculate co2
    game.calculate_co2(gameId)

    # 5. update game data in db: co2, current location
    game.update_db(gameId)
   
    # new location NONE , current location - updated


    ### check achievement ###
    goal = Goal()

    # 1. get goal time from db
    goal.get_goal(gameId)

    # 2. check achievement
    goal.is_goal_reached(game.current_time['time'])

    # 3. prepare data for response
    success = goal.is_reached
    game_over = game.game_over
    data = {'current_time':current_time, 'co2budget': game.co2_budget, 'success': success, 'game_over': game_over}
    response = {"data": data, "status": 200}
    
    # send response
    return response
   


# URL: http://127.0.0.1:5000/newgoal?&gameId=15&current_location=Jorge%20Newbery%20Airpark
@app.route('/newgoal')

def generate_new_goal():
    game = Game("name", "current_loc")
    goal = Goal()
    current_loc = {"name", 'longitude', 'latitude'}
    game.get_coordinate = current_loc['name']
    current_loc = {"Helsinki Airport", "", ""}

    args = request.args
    gameid = args.get("gameid")
    current_loc = args.get("current_loc")
    goal.get_time(goal.current_loc['latitude'], goal.current_loc['longitude'])

    data = {"time": goal.time}
    response = {"data": data, "status": 200}
    return response


# create new goal with game.generate_goal
def generate_new_goal():
    args = request.args
    gameId = args.get("gameId")
    user_selection = args.get("current_location")

    game = Game()
    goal = Goal()

    # 1. get coordinates of the current location
    game.get_coordinate(user_selection, 'current')
    longitude = game.current_location['longitude']
    latitude = game.current_location['latitude']

    # 2. generate new goal
    goal.generate_goal(longitude, latitude)
    # 3. save new goal in db
    goal.update_goal_time(gameId)
    # 4. send data (current time, new goal)
    data = {"new_goal": goal.time}
    response = {"data": data, "status": 200}
    return response



if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)