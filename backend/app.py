import json
import os
import random

from flask import Flask, request, Response
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
# os.envinron.get brings variables from .env file.
config.connection = mysql.connector.connect(
    host=os.environ.get('HOST'),
    port=3306,
    database=os.environ.get('DB_NAME'),
    user=os.environ.get('DB_USER'),
    password=os.environ.get('DB_PASS'),
    autocommit=True
)

app = Flask(__name__)

# HANDLING Cross Origin Resource Sharing ISSUE
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


# http://127.0.0.1:5000/airport/all
# EXAMPLE

# Add TRY-EXCEPT in each method
# add one common errorHandler function

@app.route('/airport/all')
def getAllAirports():
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


# DIEP
# URL: http://127.0.0.1:5000/user?name=sophie
# TRIGGERED WHEN...
# 1. user clicks the submit button after typing her name on the header.

@app.route('/user/<name>')
def getUser(name):
    # Check if user already exist or not?
    sql = "SELECT name, max(score) FROM game_score"
    sql += " WHERE name='" + name + "'"
    cursor = config.connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()
    # if user exist, return user's name and user's highest score
    if cursor.rowcount > 0:
        for row in result:
            name = row[0]
            max_score = row[1]
            response = {
                "name": name.lower(),
                "max_score": max_score
                }
    # if user does not exist, insert user's name into db (insert both name and score after user finish the game)
    if cursor.rowcount == 0:
        add_name = "INSERT INTO user (name) VALUES ('" + name + "')"
        cursor = config.connection.cursor()
        cursor.execute(add_name)
        config.connection.commit()
        #print("ok")

    return response


# DIEP
# URL: http://127.0.0.1:5000/newgame?userid=user112?co2benefit=20
# Arguments: userid, co2benefit
# TRIGGERED WHEN...
# 1. user clicks 'No, Thank' button when she is asked to take a quiz.
# OR
# 2. user clicks 'Start Game' button after finishing quiz 

# if user x takes a quiz -> co2benefit will be set as 0 by default.
@app.route('/newgame')
def newGame():
    # Fetch the list of large airports from DB
        game = Game()
        goal = Goal()
        goal_time = goal.generate_goal((game.current_location['latitude'], game.current_location['longitude']))
        print(goal_time)
        response = {
                "initial airport": game.current_location,
                "co2 budget": config.default_co2,
                "co2 benefit": "get from js",
                "goal time": goal_time
        }
        return response



# ANNA
# URL: http://127.0.0.1:5000/result?gameId=game292?airport_name=Dublin%Airport
# Arguments: gameid, airport_name
# TRIGGERED WHEN...
# 1. user selects a new airport

@app.route('/result')
def draw_result():  

    goal = Goal()  # temporary
    game = Game("name", 5000)  # temporary
    # args = request.args
    # new_location_name = args.get("airport_name")
    new_location_name = "Dublin Airport"  # temporary

    game.get_coordinate(new_location_name, 'new')
    print(f"Coordinates are taken. New location is: {game.new_location}")
    game.calculate_co2()
    print(f"CO2 calculated. CO2 budget: {game.co2_budget}")
    print(f"current location is {game.current_location}")

    # (correct time zone or not)
    goal.is_goal_reached(game)  # checks if the time in current_location the same as in goal time
    success = goal.is_reached
    game_over = game.game_over

    data = {"co2budget": game.co2_budget, 'success': success, 'game_over': game_over}
    response = {"data": data, "status": 200}
    return response


# MAMITA
# URL: http://127.0.0.1:5000/newgoal?userid=user112?gameid=game292?current_loc=helsinki%airport
# Arguments: userid, gameid, current_loc
# TRIGGERED WHEN ...
# user clicks Play Next button or Try Again button after getting results.

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





if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)