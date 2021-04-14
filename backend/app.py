from flask import Flask
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config.from_pyfile('config.py')
socketio = SocketIO(app)

@socketio.on('connect')
def connected():
    print('Connected')

@socketio.on('disconnect')
def disconnected():
    print('Disconnected')
    
@socketio.on('json')
def handle_msg(json):
    print('Received JSON: ' + json)

@app.route('/send')
def send_msg(json):
    print('Sending msg' + json.message)
    send(message=json, json=True)

if __name__ == '__main__':
    socketio.run(app)
