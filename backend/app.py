
import json
import os

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
         port= 3306,
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

    goal = Goal()
    goal.getTimeZoneName(38.9, -77.03)

    for x in results:
        airport = {"ident": x[0], "name": x[1], "iso_country":x[2], "latitude": x[3], "longitude": x[4]}
        data.append(airport)

    if cursor.rowcount > 0: 
       response = {"data": data, "status": 200}
       return response
 
 


# DIEP
# URL: http://127.0.0.1:5000/user?name=sophie
# TRIGGERED WHEN...
# 1. user clicks the submit button after typing her name on the header.

@app.route('/user')
def getUser():
    args = request.args
    name = args.get("name")
    # TODO:
    # Find the user with the name in the database SQL.
    # 1-1 user exists? -> fetch the existing user data from SQL
    # 1-2 NO user? -> create a new user with class 
    # insert new user data in SQL.
    # 2. send response(userdata, status: 200).





# DIEP
# URL: http://127.0.0.1:5000/newgame?userid=user112?co2benefit=20
# Arguments: userid, co2benefit
# TRIGGERED WHEN...
# 1. user clicks 'No, Thank' button when she is asked to take a quiz.
# OR
# 2. user clicks 'Start Game' button after finishing quiz 

# if user x takes a quiz -> co2benefit will be set as 0 by default.
@app.route('/newgame', defaults={'co2benefit':0})
def createGame():
    print('handle new game data')
    # TODO:
    # 0. 
    # 1. create a new game data with userId, and co2benefit
    # 2. UPDATE co2benefit: check co2benefit argument in URL
    # 2-1. if co2benefit is greater than 0 
    # -> update co2benefit value in the game data.
    # 2-2. if co2benefit is 0
    # -> do nothing
    # 3. send response (current location, co2budget, goaltime)
    #** There is a chance that some data are missing. 



# ANNA
#URL: http://127.0.0.1:5000/getresult/gameId=game292?airport_name=helsinki%airport
# Arguments: gameid, airport_name
# TRIGGERED WHEN...
# 1. user selects a new airport

@app.route('/result') 
def drawResult():
    print('game result')
    # TODO:
    # calculate co2budget (game.calculate_co2)
    # check success or failure
    # creaet reached_goal data in SQL depending on success or failure
    # send response (co2budget, game result, game over)



# MAMITA
#URL: http://127.0.0.1:5000/newgoal?gameid=game292?current_loc=helsinki%airport
# Arguments: userid, gameid, current_loc
# TRIGGERED WHEN ...
# user clicks Play Next button or Try Again button after getting results.


@app.route('/newgoal')
def generate_new_goal():
        game = Game("name", "current_location")
        goal = Goal()
        game.current_location = {"name= Helsinki Airport", 'longitude=60.19 ', 'latitude=24.94 '}
        game.get_coordinate("current_location_name")
        game.current_location = game.new_location
        print(f"Current location is: {game.current_location}")

        args = request.args
        gameid = args.get("gameid")
        current_loc = args.get("current_loc")


        goal = Goal()
        game.current_time_result = game.current_location
        goal.generate_goal('latitude''longitude')

        data = {"new_goal": goal.time, "status":200}
        response = {"data": data, "status": 200}
        return response
print('new goal')


if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)



