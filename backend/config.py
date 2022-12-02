import random

# COMMNET: Perhaps need to be modified.
starting_point = ["Berlin Brandenburg Airport","Geneva Cointrin International Airport", "Milan Bergamo Airport"]          

# default setup
default_co2 = 5000
default_airport = random.choice(starting_point)

# sql connection
connection = None