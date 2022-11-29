import user
import message
from geopy.distance import geodesic as GD
from current_gps import get_chosen_airport_gps

def calculate_co2(): 
    current_location = get_chosen_airport_gps(user.current_airport)
    new_location = get_chosen_airport_gps(user.new_location)
    chosen_airport = user.new_location

    co2_consumed_per_km = 0.115

    if user.co2_budget > 0:
        user.total_visited_airports += 1

        # CONVERT DECIMAL STR TO NUMBERS.
        current_gps_set = (float(current_location[0]), float(current_location[1]))
        new_gps_set= (float(new_location[0]), float(new_location[1]))

        # CALCULATE DISTANCE BETWEEN TWO AIRPORTS.
        distance = GD(current_gps_set, new_gps_set).km
        print(f"\nThe distance between {chosen_airport} and {user.current_airport} is around: ", round(distance, 2), "km")
       
        # CALCULATED COMSUMED AND AVAILABLE C02.
        co2_consumed_per_flight = distance * co2_consumed_per_km
        user.co2_budget = user.co2_budget - co2_consumed_per_flight

    if user.co2_budget < 0:
        message.game_over()
        
    # UPDATE current_airport AFTER EACH FLIGHT
    user.current_airport = chosen_airport

    # RESET chosen_airport
    user.new_location = ""

    print(f"Your flight from {user.current_airport} to {chosen_airport} consumed around: {round(co2_consumed_per_flight, 2)} kg of CO2.")
    print(f"Current CO2 budget left: {round(user.co2_budget, 2)} kg \n")
    print("""
    
=============================

    """)

























