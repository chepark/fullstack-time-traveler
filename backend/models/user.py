import config

class User():
    def __init__(self):
        self.name = None

    # get exisitng user from db
    def get_user(self, name): 
        sql = "SELECT gameId, userName, max(score) FROM game"
        sql += " WHERE userName='" + name + "'"
       
        cursor = config.connection.cursor()
        cursor.execute(sql)
        result = cursor.fetchone() 

        print('SQL',sql)

        # if user exist, return user's name and user's highest score
        if result[0] != None:
            # create new game table
            create_game = "INSERT INTO game (userName) VALUES ('" + name + "')"
            cursor = config.connection.cursor()
            cursor.execute(create_game)
            config.connection.commit()

            get_gameId = "SELECT LAST_INSERT_ID()"
            cursor = config.connection.cursor()
            cursor.execute(get_gameId)

            gameId = cursor.fetchone()[0]
            max_score = result[2]
            data = {
                "is_new_user": False,
                "game_id": gameId,
                "max_score": max_score, 
                }
            print('data',data)

            return data
            
        # if user does not exist, insert user's name into db (insert both name and score after user finish the game)
        else:
            add_name = "INSERT INTO game (userName) VALUES ('" + name + "')"
            cursor = config.connection.cursor()
            cursor.execute(add_name)
            config.connection.commit()
            
            get_gameId = "SELECT LAST_INSERT_ID()"
            cursor = config.connection.cursor()
            cursor.execute(get_gameId)
            gameId = cursor.fetchone()[0]

            data = {
                    "is_new_user": True,
                    "game_id": gameId,
                    "max_score": None, 
                    }
            
            return data