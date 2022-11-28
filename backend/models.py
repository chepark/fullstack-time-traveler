# Create User and Game models
# User Class
default_co2 = 5000 

class User: 
    total_user = 0

    def __init__(self, name, game):
        self.id = 'user'+str(User.total_user)
        self.name = name
        self.game = [game.id]
        self.goal_reached = {'highest': None, 'current': None}
        total_user = total_user + 1


# Game Class 
class Game:
    total_game = 0 

    def __init__(self, location):
        self.id = 'game'+str(Game.total_game)
        self.co2_consumed = 0
        self.co2_budget = default_co2
        self.co2_benefit = 0
        #self.location -> set the initial location from the previous code

