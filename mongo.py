from pymongo import MongoClient


import datetime
from bson.objectid import ObjectId


cluster = "mongodb+srv://DNSNate:2003@cluster0.vu38qju.mongodb.net/test?retryWrites=true&w=majority"

client = MongoClient(cluster)

print(client.list_database_names())

db = client.test

print(db.list_collection_names())


todo1 = {"name": "Patrick", "text": "My first!", "status": "open", "tags": ["python","coding"],\
        "date": datetime.datetime.utcnow()}
    
todos = db.todos

result = todos.insert_one(todo1)

result = todos.find()
print(result)
for results in result:
    print(results)

