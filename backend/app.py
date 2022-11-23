
# SETUP ROUTES
from flask import Flask, request, Response
import mysql
import model.game
import model.user

connection = mysql.connector.connect(
         host='127.0.0.1',
         port= 3306,
         database='flight_game',
         user='root',
         password='',
         autocommit=True
         )

app = Flask(__name__)

# ROUTE EXAMPLES
# @app.route('/user/<name>', methods = ['GET', 'POST'])
# @app.route('/game/<id>')

# USE
# request.args.get("co2benefit")



if __name__ == '__main__':
    app.run(use_reloader=True, host='127.0.0.1', port=5000)