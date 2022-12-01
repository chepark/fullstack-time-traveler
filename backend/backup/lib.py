def get_hour(time_string):
    time_array = time_string['time'].split(':')
    hour = int(time_array[0])
    return hour
