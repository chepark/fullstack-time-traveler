class User: 
    total_user = 0

    def __init__(self, name, game):
        self.id = 'user'+str(User.total_user)
        self.name = name
        self.game = [game.id]
        self.goal_reached = {'highest': None, 'current': None}
        total_user = total_user + 1