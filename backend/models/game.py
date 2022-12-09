import random
import os, sys

parent = os.path.abspath('.')
sys.path.insert(1, parent)

import config
import requests
from datetime import datetime
from geopy.distance import geodesic as GD
from decimal import Decimal

class Game:
    def __init__(self):  
        self.co2_consumed = config.default_co2consumed
        self.co2_budget = config.default_co2budget
        self.co2_benefit = None

        self.current_location = {'name': None, 'longitude': None, 'latitude': None}
        self.new_location = {"name": None, 'longitude': None, 'latitude': None}
        
        self.current_time = {"time": None, "hour": None}
       
        self.game_over = False
        self.total_try = 0
        self.won = 0

    ### UTILS ###
    def get_airports(self):
        sql = "SELECT ident, name, iso_country, latitude_deg, longitude_deg FROM airport WHERE type='large_airport'"
        cursor = config.connection.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()
        data = []

        for x in results:
            airport = {"ident": x[0], "name": x[1], "iso_country": x[2], "latitude": x[3], "longitude": x[4]}
            data.append(airport)

        if cursor.rowcount > 0:
            print(data)
            return data

    # get coordinate info of the location
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


    # get the time of the location
    def get_time(self, airport_latitude, airport_longitude):
        response = requests.get(
            f'https://timeapi.io/api/Time/current/coordinate?latitude={airport_latitude}&longitude={airport_longitude}').json()

        hour = (response["hour"])
        min = (response["minute"])
        time = datetime.strptime(f"{hour}:{min}:00", "%H:%M:%S")
        time = time.time().strftime("%H:%M")

        return time, hour


    # calculate co2: remaining co2, consumed co2
    def calculate_co2(self, gameId):
        co2_consumed_per_km = 0.115
        data = self.get_game_data(gameId)
        self.co2_consumed = data['co2consumed']
        self.con2_budget = data['co2budget']
        self.current_location['name'] = data['current_location']
        self.current_location['longitude'] = data['current_longitude']
        self.current_location['latitude'] = data['current_latitude']

        if self.co2_budget > 0:
            self.total_try += 1

            current_gps_set = (float(self.current_location['latitude']), float(self.current_location['longitude']))
            new_gps_set = (float(self.new_location['latitude']), float(self.new_location['longitude']))
            distance = GD(current_gps_set, new_gps_set).km

            # CALCULATED COMSUMED AND AVAILABLE C02.
            current_co2_consumed = distance * co2_consumed_per_km
            self.co2_consumed = self.co2_consumed + Decimal(current_co2_consumed)
            self.co2_budget = self.co2_budget - self.co2_consumed

        if self.co2_budget < 0:
            self.game_over = True

        # UPDATE current_airport AFTER EACH FLIGHT
        self.current_location = self.new_location

        # RESET chosen_airport
        self.new_location = {"name": None, 'longitude': None, 'latitude': None}
        
    
    # generate random airport to start game
    def set_random_airport(self):
        sql = "SELECT name, latitude_deg, longitude_deg FROM airport WHERE type='large_airport'"   
        cursor = config.connection.cursor()
        cursor.execute(sql)
        results = cursor.fetchall()

        if len(results) > 0:
        # Generate user's initial airport
            airports = random.choice(results) 
            initial_airport = airports[0]
            self.current_location['name'] = initial_airport
            # update current location coordinate
            self.get_coordinate(initial_airport, 'current')


    ### SETTERS ###
    # set current location in game class
    def set_location(self, name):
        self.current_location['name'] = name
    

    # set current location in game class
    def set_co2benefit(self, co2benefit):
        self.co2_benefit = co2benefit


    # set current time in game class
    def set_current_time(self, time, hour): 
        self.current_time['time'] = time
        self.current_time['hour'] = hour


    ### DATA HANDLERS ###
    # set default data to start game in db
    def set_default_data(self, gameId, current_time, goal_time):
        set_default = "UPDATE game SET "
        set_default += f"co2consumed = {self.co2_consumed}, "
        set_default += f"co2budget={self.co2_budget}, "
        set_default += f"`co2benefit`={self.co2_benefit}, "
        set_default += f"current_location='{self.current_location['name']}', "
        set_default += f"current_longitude='{self.current_location['longitude']}', "
        set_default += f"current_latitude='{self.current_location['latitude']}', "
        set_default += f"`current_time`='{current_time[0]}', "
        set_default += f"current_hour = {current_time[1]}, "
        set_default += f"goal_time='{goal_time[0]}', "
        set_default += f"goal_hour={goal_time[1]} "
        set_default += f"WHERE gameId={gameId}"

        cursor = config.connection.cursor()
        cursor.execute(set_default)

    # get game data from DB
    def get_game_data(self, gameId):
        sql = "SELECT * FROM game"
        sql += f" WHERE gameId={gameId}"

        cursor = config.connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchone()
        
        data = {'gameId': result[0], 'userName': result[1], 'score':result[2], 'co2consumed':result[3],'co2benefit':result[4],'co2budget': result[5], 'current_location': result[6], 'current_longitude': result[7], 'current_latitude': result[8], 'current_time': result[9], 'current_hour':result[10],'goal_time': result[11],'goal_hour':result[12]}
        return data


    # update data in DB
    def update_db(self, gameId):
        print('budget', self.co2_budget)
        set_default = "UPDATE game SET "
        set_default += f"co2consumed = {self.co2_consumed}, "
        set_default += f"co2budget={self.co2_budget}, "
        set_default += f"current_location='{self.current_location['name']}', "
        set_default += f"current_longitude='{self.current_location['longitude']}', "
        set_default += f"current_latitude='{self.current_location['latitude']}', "
        set_default += f"`current_time`='{self.current_time['time']}', "
        set_default += f"current_hour = {self.current_time['hour']} "
        set_default += f"WHERE gameId={gameId}"
        
        cursor = config.connection.cursor()
        cursor.execute(set_default)