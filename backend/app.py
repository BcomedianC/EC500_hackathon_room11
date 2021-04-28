from flask import Flask, request
from flask_cors import CORS
from flask_socketio import SocketIO, send
from db.p2p_db import DB
import socketio as socket

app = Flask(__name__)
CORS(app)
app.config.from_pyfile('config.py')
socketio = SocketIO(app)
sio = socket.Client()
db_client = DB()

port_num = 5000
isConnected = False
user = ''
contact = ''

@socketio.on('connect')
def connected():
    global isConnected
    isConnected = True
    print('Connected')

@socketio.on('disconnect')
def disconnected():
    global isConnected, contact
    isConnected = False
    contact = ''
    print('Disconnected')

@socketio.on('message')
def handle_msg(message):
    print('Message: ' + message)

@app.route('/login', methods=['POST'])
def login():
    try:
        global user
        req_json = request.get_json(force=True)
        email = req_json['email']
        ip = '127.0.0.1'

        if (db_client.is_account_exist(email) == False):
            db_client.register(email)
        if (db_client.is_account_online(email)):
            return "User already logged in.", 400

        db_client.user_login(email, ip, port_num)
        user = email
        return "User successfully logged in.", 200

    except Exception as e:
        print("Exception occurred: ", e)
        return "Error logging in user.", 500

@app.route('/logout', methods=['POST'])
def logout():
    try:
        global user
        req_json = request.get_json(force=True)
        email = req_json['email']

        if (db_client.is_account_online(email) == False):
            return "Email could not be found. User not logged in.", 400

        db_client.user_logout(email)
        user = ''
        return "User successfully logged out.", 200

    except Exception as e:
        print("Exception occurred: ", e)
        return "Error logging out user.", 500

@app.route('/connect', methods=['POST'])
def connect():
    try:
        req_json = request.get_json(force=True)
        email = req_json['email']
        global isConnected, contact

        if (isConnected):
            return "Already connected to another user.", 400
        if (db_client.is_account_exist(email) == False):
            return "Email could not be found.", 400
        if (db_client.is_account_online(email)):
            (ip, port) = db_client.get_peer_ip_port(email)
            sio.connect('http://'+ip+':'+str(port))
            isConnected = 1
            contact = email
            return "Successfully connected to contact.", 200
        else:
            return "Contact is offline, but can still be messaged.", 200
    except Exception as e:
        print("Exception occurred: ", e)
        return "Error connecting with contact.", 500

@app.route('/disconnect')
def disconnect():
    global isConnected, contact
    try:
        if (isConnected == False):
            return "User not connected to any user.", 400
        else:
            sio.disconnect()
            contact = ''
            return "Successfully disconnected from contact.", 200
    except Exception as e:
        print("Exception occurred: ", e)
        return "Error disconnecting from contact.", 500

@app.route('/send', methods=['POST'])
def send_msg():
    global isConnected
    try:
        req_json = request.get_json(force=True)
        sender = req_json['from']
        receiver = req_json['to']
        msg = req_json['message']
        print(req_json)
        print('Sending msg: ' + msg)

        if (isConnected):
            sio.send(msg)
            return "Message successfully sent.", 200
    except Exception as e:
        print("Exception occurred: ", e)
        return "Error sending message.", 500


if __name__ == '__main__':
    socketio.run(app, port=port_num)
