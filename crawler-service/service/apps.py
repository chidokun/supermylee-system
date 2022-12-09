from django.apps import AppConfig

class MainConfig(AppConfig):
    def ready(self):
        from scheduler import start
        
        print("Run the scheduler")
        start()