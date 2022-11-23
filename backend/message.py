
import user

def success(): 
    success_message=(f"\nHooray! You made it.")
    print(success_message)


def fail(time_gap): 
    failure_message = (f"\nSorry! You are in the wrong time zone." 
                    f"\nThe time gap between {user.current_airport} and {user.new_location} is {time_gap} hour(s)."
                )
    print(failure_message)

def game_over():
    game_over_message = (f"\nNOW THE GAME IS OVER.\n"
                        f"You have visited {user.total_visited_airports} airports.\n")
    print(game_over_message)
