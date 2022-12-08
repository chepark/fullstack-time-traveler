import os, sys

parent = os.path.abspath('.')
sys.path.insert(1, parent)

import config
import requests
from datetime import datetime
from geopy.distance import geodesic as GD


class Game:
    total_game = 0

    def __init__(self, userId, co2benefit):  # goal argument removed
        self.gameId = 'game' + str(Game.total_game)
        self.userId = userId

        self.co2_consumed = 0
        self.co2_budget = config.default_co2
        self.co2_benefit = co2benefit

        self.current_location = {'name': config.default_airport, 'longitude': None, 'latitude': None}
        self.get_coordinate(self.current_location['name'], 'current')

        self.new_location = {"name": None, 'longitude': None, 'latitude': None}

        self.current_time = {"time": None, "hour": None}
        current_time_result = self.get_time(self.current_location['latitude'], self.current_location['longitude'])
        self.current_time['time'] = current_time_result[0]
        self.current_time['hour'] = current_time_result[1]

        # ? issue: related to Goal rather than Game
        # ! solution: moved to goal class.

        # self.goal_time = goal.time
        # self.generate_goal()

        self.game_over = False
        self.total_try = 0
        self.won = 0

    # ? issue:  X update new_location's coordinates. Only updated current_location's coordinates.
    # ! solution: use the "target" argument to update a targeting location.
    # see the line 57 and 61

    def get_coordinate(self, airport_name, target):
        sql = "SELECT name, latitude_deg, longitude_deg FROM Airport"
        sql += " WHERE name ='" + airport_name + "'"

        cursor = config.connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchall()

        if cursor.rowcount > 0:
            for row in result:
                latitude = round(row[1], 2)
                longitude = round(row[2], 2)

                if target == "new":
                    self.new_location['longitude'] = longitude
                    self.new_location['latitude'] = latitude

                elif target == "current":
                    self.current_location['longitude'] = longitude
                    self.current_location['latitude'] = latitude

    def get_time(self, airport_latitude, airport_longitude):
        response = requests.get(
            f'https://timeapi.io/api/Time/current/coordinate?latitude={airport_latitude}&longitude={airport_longitude}').json()

        hour = (response["hour"])
        min = (response["minute"])
        time = datetime.strptime(f"{hour}:{min}:00", "%H:%M:%S")
        time = time.time().strftime("%H:%M")

        return time, hour

    # ? issue: goal is related to Goal class.
    # !solution: move the function below to Goal class.

    # def generate_goal(self):
    #     # 15 degrees of longitude = 1 hour difference
    #     longitude_degree = 15

    #     no_goal = True

    #     while no_goal:
    #         random_hour_gap = random.randrange(-5,5,1)
    #         random_longitude = self.current_location['longitude'] + (longitude_degree * random_hour_gap)

    #         time_result = self.get_time(self.current_location['latitude'], random_longitude)
    #         self.goal_time['time'] = time_result[0]
    #         self.goal_time['hour'] = time_result[1]

    #         if -180.0 <= random_longitude <= 180.0:
    #             no_goal = False

    # ? issue: There were indentations in the line 126, and 129.
    # ! solution: Removed the indentations.

    def calculate_co2(self):
        co2_consumed_per_km = 0.115

        if self.co2_budget > 0:
            self.total_try += 1

            # STR TO NUMBERS.
            current_gps_set = (float(self.current_location['longitude']), float(self.current_location['latitude']))
            new_gps_set = (float(self.new_location['longitude']), float(self.new_location['latitude']))

            distance = GD(current_gps_set, new_gps_set).km

            # CALCULATED COMSUMED AND AVAILABLE C02.
            co2_consumed_per_flight = distance * co2_consumed_per_km
            self.co2_budget = self.co2_budget - co2_consumed_per_flight

        if self.co2_budget < 0:
            self.game_over = True

        # UPDATE current_airport AFTER EACH FLIGHT
        self.current_location = self.new_location

        # RESET chosen_airport
        self.new_location = {"name": None, 'longitude': None, 'latitude': None}

    # Updates the name of the airport in the new_location variable in class game
    def update_current_location_name(self, airport_name):
        self.new_location['name'] = airport_name