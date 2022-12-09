from datetime import datetime
import os

from apscheduler.schedulers.background import BackgroundScheduler
from scheduler.handler import handle

        
def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(handle, 'interval', minutes=1)
    scheduler.start()