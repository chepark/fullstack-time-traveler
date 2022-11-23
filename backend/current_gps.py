import mysql.connector
import _creds
import user

def get_chosen_airport_gps(airport_name):
    sql = "SELECT name, latitude_deg, longitude_deg FROM Airport"
    sql += " WHERE name ='" + airport_name + "'"

    cursor = connection.cursor()
    cursor.execute(sql)
    result = cursor.fetchall()

    if cursor.rowcount > 0:
        for row in result:
            latitude =  round(row[1], 2)
            longitude = round(row[2], 2)

            if not user.new_location:
                print(f"This is {row[0]} where latitude is {latitude} and longitude is {longitude}. \n")
            
            global airport_latitude
            global airport_longitude

            airport_latitude = row[1]
            airport_longitude = row[2]
          
    return [airport_latitude, airport_longitude]

# CONNECT TO DB
connection = mysql.connector.connect(
         host='127.0.0.1',
         port= 3306,
         database=_creds.db_name,
         user='root',
         password=_creds.db_password,
         autocommit=True
         )