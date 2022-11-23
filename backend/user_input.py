# TAKE USER'S NAME AND USER'S CHOICE 

import rand_airport

def get_user_name():
    name = (input("Enter your name: ")).title()
    return name

#this part takes user input to know the name of the next airport where the user goes
def choose_your_destination():
    airport_list = rand_airport.generate_answer_options()
    choice = int(input(f"Choose your next destination.\n"
                   f"If you want to fly to {airport_list[0]}, write 1.\n"
                   f"If you want to fly to {airport_list[1]}, write 2.\n"
                   f"If you want to fly to {airport_list[2]}, write 3.\n"
                   f"If you want to fly to {airport_list[3]}, write 4.\n"
                   f"If you want to fly to {airport_list[4]}, write 5.\n"
                   f"Enter your number: "))
    new_location = ""
    
    if choice == 1:
        new_location = airport_list[0];
    elif choice == 2:
        new_location = airport_list[1];
    elif choice == 3:
        new_location = airport_list[2];
    elif choice == 4:
        new_location = airport_list[3];
    elif choice == 5:
        new_location = airport_list[4];
    print("\nYou are now in", new_location,'.')
    return new_location


