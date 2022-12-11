import random

# COMMNET: Perhaps need to be modified.
# DUMMI DATA -> CHANGE IN FUTURE
starting_point = ["Berlin Brandenburg Airport","Geneva Cointrin International Airport", "Milan Bergamo Airport"]          

# default setup
default_co2budget = 5000
default_co2consumed = 0
default_co2_benefit = 0
default_airport = random.choice(starting_point)

# sql connection
connection = None