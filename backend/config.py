import random
import mysql.connector
connection = mysql.connector.connect(
        host='127.0.0.1',
        port=3306,
        database='flight_game2',
        user='root',
        password='manager'

    )

# COMMNET: Perhaps need to be modified.

#starting_point = ["Berlin Brandenburg Airport","Geneva Cointrin International Airport", "Milan Bergamo Airport"]
sql = "SELECT name, latitude_deg, longitude_deg FROM airport WHERE type='large_airport'"
cursor = connection.cursor()
cursor.execute(sql)
results = cursor.fetchall()
if cursor.rowcount > 0:
    # Generate user's initial airport
    airports = random.choice(results)
    initial_airport = airports[0]
    latitude = airports[1]
    longitude = airports[2]
# default setup
default_co2budget = 5000
default_co2consumed = 0
default_co2_benefit = 0
default_airport = random.choice(initial_airport)

# sql connection
#connection = None