from pymongo import MongoClient

import p2p_db

client  = MongoClient()

mydb = client["p2p_chat"]

mycol = mydb["users"]

data = {'name': 'Bruce', 'age': '24'}

data2 = {'name': 'John', 'age': '27'}

mycol.insert_one(data2)