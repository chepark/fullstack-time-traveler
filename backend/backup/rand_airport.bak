# GET A RANDOM AIRPORT TO START 
# GENERATE AIRPORTS TO PROVIDE AS ANSWER OPTIONS 

import random

airports = ["Amsterdam Airport Schiphol", "Berlin Brandenburg Airport", "Charles de Gaulle International Airport",
            "Copenhagen Kastrup Airport", "Dublin Airport", "Funchal Heliport", "Geneva Cointrin International Airport", "Gran Canaria Airport",
            "Helsinki Vantaa Airport", "Ittoqqortoormiit Heliport", "Jan Mayensfield","Lennart Meri Tallinn Airport", "Lviv International Airport",
            "London Gatwick Airport",  "Luxembourg-Findel International Airport", "Milan Bergamo Airport","Minsk National Airport",  "Oslo Airport, Gardermoen",
            "João Paulo II Airport", "Pulkovo Airport", "Gardermoen", "Riga International Airport", "Sheremetyevo International Airport", "Vilnius International Airport",
            "Warsaw Chopin Airport", "Zagreb Airport"]

# AIRPORT LIST TO START GAME
starting_point = ["Berlin Brandenburg Airport","Geneva Cointrin International Airport", "Milan Bergamo Airport"]

# 3 LISTS OF AIRPORTS FOR A USER TO CHOOSE FROM
# EACH LIST CONSISTS OF 5 AIRPORTS​
# ANE EACH AIRPORT IS IN DIFFERENT TIME ZONE.
airport_list1 = ["Ittoqqortoormiit Heliport", "London Gatwick Airport","Oslo Airport, Gardermoen","Helsinki Vantaa Airport", "Sheremetyevo International Airport"]
airport_list2 = ["Jan Mayensfield", "Funchal Heliport","Amsterdam Airport Schiphol", "Lennart Meri Tallinn Airport","Minsk National Airport" ]
airport_list3 =["Ittoqqortoormiit Heliport", "Gran Canaria Airport","Warsaw Chopin Airport","Lviv International Airport", "Pulkovo Airport"]
lists_of_airports = ([airport_list1],[airport_list2],[airport_list3])

# RETURN A STARTING POINT AIRPORT
def get_random_airport():
    current_airport = random.choice(starting_point)
    return current_airport

# GENERATE LISTS OF AIRPORTS TO CHOOSE FROM
def generate_answer_options():
    random_num =  (random.randint(1, 3))
    answer_options = 1
    if random_num == 1:
        answer_options = airport_list1
    elif random_num == 2:
        answer_options = airport_list2
    elif random_num == 3:
        answer_options = airport_list3
    return answer_options



