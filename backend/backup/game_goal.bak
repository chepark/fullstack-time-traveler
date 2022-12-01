# 1) generate game goal
# - time zone limit ± X hours
#use "generate_game_goal" to generate first time goal
#use "generate_random_timegoal" in other cases, later in the game
#actually you can use just "generate_random_timegoal", it is new and should't have issues of
#"generate_game_goal", which is to go out of our range

from datetime import datetime, timedelta, time
import random
import current_time
import user

#take initial time from current_time file
# init_hour = current_time.init_hour
# init_min = current_time.init_min

def list_of_time_goals(airport_time):
    init_time = datetime.strptime(f"{airport_time['hour']}:{airport_time['min']}:00", "%H:%M:%S")

    time1 = init_time + timedelta(hours=2)
    time1 = time1.time().strftime('%H:%M')
    time2 = init_time + timedelta(hours=1)
    time2 = time2.time().strftime('%H:%M')
    time3 = init_time + timedelta(hours=0)
    time3 = time3.time().strftime('%H:%M')
    time4 = init_time - timedelta(hours=1)
    time4 = time4.time().strftime('%H:%M')
    time5 = init_time - timedelta(hours=2)
    time5 = time5.time().strftime('%H:%M')
    list_of_time = [time2,time3,time4,time5]
    return list_of_time

# check whatsapp
def generate_random_timegoal (airport_time):
    time_goal = random.choice (list_of_time_goals(airport_time))
    print(f"Find in which airort the time is: {time_goal}. ")
    return time_goal


def generate_rand_time_dif(airport_time):
    init_time = datetime.strptime(f"{airport_time['hour']}:{airport_time['min']}:00", "%H:%M:%S")
    
    #generate random number to generate the goal
    random_dif =  (random.randint(-2, 1))

#calculating new goal time using datetime, timedelta
    if random_dif>0:
        delta = timedelta(hours=random_dif)
        new_goal = init_time + delta
        new_goal = new_goal.time().strftime('%H:%M')
        print(f"NEW GOAL TIME: {new_goal}. \n")
        return new_goal

    elif random_dif<=0:
        delta = timedelta(hours=random_dif)
        new_goal = init_time - delta
        new_goal = new_goal.time().strftime('%H:%M')
        print(f"NEW GOAL TIME: {new_goal} \n")
        return new_goal


#this function can be used only in the beginning! because +2/-2 can end up out of our current range
def generate_game_goal(airport_time):
    if user.total_trials == 0: 
        goal_time = generate_rand_time_dif(airport_time)
        print(f"Choose the airport where the local time is {goal_time} from the list below.")
    else: 
        goal_time = generate_random_timegoal(airport_time)
    return {'time': goal_time}

