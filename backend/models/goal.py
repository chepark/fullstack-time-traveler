
import requests
import random

class Goal: 
    total_goals = 0

    def __init__(self):
        self.gameId = 'goal'+str(Goal.total_goals)
        self.timezone = None # add getTimeZoneName on init?
        self.is_reached  = False
        self.time = None 
        self.hour = None

    
    def getReachedTimeZoneName(self, latitude, longitude):
        timeApiUrl = f"https://timeapi.io/api/TimeZone/coordinate?latitude={latitude}&longitude={longitude}"

        response = requests.get(timeApiUrl)
        data = response.json()

        timezone_name = data['timeZone']
        self.timezone = timezone_name
    
    def generate_goal(self, current_longitude, current_latitude):
        longitude_degree = 15

        no_goal = True
        
        while no_goal: 
            random_hour_gap = random.randrange(-5,5,1)
            random_longitude = current_longitude + (longitude_degree * random_hour_gap)

            time_result = self.get_time(current_latitude, random_longitude)
            self.time = time_result[0]
            self.hour = time_result[1]

            if -180.0 <= random_longitude <= 180.0:
                no_goal = False