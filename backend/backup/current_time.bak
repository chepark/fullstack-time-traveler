# CALCULATE THE CURRENT TIME OF THE LOCATION

import requests
import json
from datetime import datetime

def get_airport_time(airport_latitude, airport_longitude):
    response = requests.get(f'https://timeapi.io/api/Time/current/coordinate?latitude={airport_latitude}&longitude={airport_longitude}').json()
    init_hour = (response["hour"])
    init_min = (response["minute"])
    init_time = datetime.strptime(f"{init_hour}:{init_min}:00", "%H:%M:%S")
    init_time = init_time.time().strftime("%H:%M")
    print(f"The time of the current airport is {init_time}")
    return {'time': init_time, 'hour': init_hour, 'min': init_min}