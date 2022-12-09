import requests
import random
import config
from models.game import Game

class Goal(Game):
    def __init__(self):
        self.timezone = None  
        self.is_reached = False
        self.time = None
        self.hour = None

    def get_timezone_name(self, latitude, longitude):
        timeApiUrl = f"https://timeapi.io/api/TimeZone/coordinate?latitude={latitude}&longitude={longitude}"

        response = requests.get(timeApiUrl)
        data = response.json()

        timezone_name = data['timeZone']
        self.timezone = timezone_name

    # generate random goal: time gap from -5h to +5h
    def generate_goal(self, current_longitude, current_latitude):
        longitude_degree = 15
        no_goal = True

        while no_goal:
            random_hour_gap = random.randrange(-5, 5, 1)
            random_longitude = current_longitude + (longitude_degree * random_hour_gap)

            time_result = super().get_time(current_latitude, random_longitude)
            self.time = time_result[0]
            self.hour = time_result[1]

            if -180.0 <= random_longitude <= 180.0:
                no_goal = False


    # checks if the goal time is reached and updates is_reached in goal.py
    def is_goal_reached(self, current_time):
        if self.time == current_time:
            self.is_reached = True
        else:
            self.is_reached = False
    
    # get goal from db: goal_time, goal_hour
    def get_goal(self, gameId):
        sql = f"SELECT goal_hour, goal_time FROM game WHERE gameId={gameId}"   
        cursor = config.connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchone()
        self.hour = result[0]
        self.time = result[1]

    # update goal in db: goal_time, goal_hour
    def update_goal_time(self, gameId):
        update_goal = "UPDATE game SET "
        update_goal += f"goal_time = '{self.time}', "
        update_goal += f"goal_hour={self.hour} "
        update_goal += f"WHERE gameId={gameId}"

        cursor = config.connection.cursor()
        cursor.execute(update_goal)

