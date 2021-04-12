import socketio
import requests
import json

sio = socketio.Client()
sio.connect('http://localhost:5000')

msg_json = {
    "message": "Hello World!",
    "from": "Damani"
}

sio.send(json.dumps(msg_json))
