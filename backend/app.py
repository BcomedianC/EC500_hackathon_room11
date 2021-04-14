from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, send
from db.p2p_db import DB

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('config.py')
socketio = SocketIO(app)
db_client = DB()

port_num = 5000

@socketio.on('connect')
def connected():
    print('Connected')

@socketio.on('disconnect')
def disconnected():
    print('Disconnected')

@socketio.on('json')
def handle_msg(json):
    print('Received JSON: ' + json)

@app.route('/login', methods=['POST'])
def login():
    try:
        req_json = request.get_json(force=True)
        email = req_json['email']
        ip = '127.0.0.1'

        if (db_client.is_account_exist(email) == False):
            db_client.register(email)
        if (db_client.is_account_online(email)):
            return "User already logged in.", 400

        db_client.user_login(email, ip, port_num)
        return "response: User successfully logged in.", 200

    except Exception as e:
        print("Exception occurred: ", e)
        return "error: Error logging in user.", 500

@app.route('/logout', methods=['POST'])
def logout():
    try:
        req_json = request.get_json(force=True)
        email = req_json['email']

        if (db_client.is_account_online(email) == False):
            return "Email could not be found. User not logged in.", 400

        db_client.user_logout(email)
        return "response: User successfully logged out.", 200

    except Exception as e:
        print("Exception occurred: ", e)
        return "error: Error logging out user.", 500

@app.route('/send')
def send_msg(json):
    print('Sending msg' + json.message)
    send(message=json, json=True)

if __name__ == '__main__':
    socketio.run(app, port=port_num)
