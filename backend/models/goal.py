
import requests

class Goal: 
    total_goals = 0

    def __init__(self):
        self.gameId = 'goal'+str(Goal.total_goals)
        self.timezone = None # add getTimeZoneName on init?
        self.is_reached  = False
        #self.airport_numbers
    
    def getTimeZoneName(self, latitude, longitude):
        timeApiUrl = f"https://timeapi.io/api/TimeZone/coordinate?latitude={latitude}&longitude={longitude}"

        response = requests.get(timeApiUrl)
        data = response.json()

        timezone_name = data['timeZone']
        self.timezone = timezone_name 