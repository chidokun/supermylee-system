import pymongo
from bson.objectid import ObjectId
from datetime import datetime

mongo = pymongo.MongoClient("mongodb://localhost:27017")

mylee_db = mongo["mylee"]

crawler_configs = mylee_db["crawler_configs"]
unlearn_news = mylee_db["unlearn_news"]
news = mylee_db["news"]

def get_all_configs():
    result = []
    for i in crawler_configs.find({}):
        result.append(i)
    
    return result

def save_unlearn_news(entity):
    unlearn_news.insert_one(entity)

def save_news(entity):
    news.insert_one(entity)

def save_latest_update(entity):
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    result = crawler_configs.update_one({ "_id": entity["_id"]}, { "$set": { "latest_crawl_time": now }})