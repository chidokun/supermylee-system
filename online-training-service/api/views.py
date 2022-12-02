from django.http import JsonResponse
from rest_framework.decorators import api_view

@api_view(["POST"])
def train_api(request, *args, **kwargs):
    # 1. check if training job is running

    # 1.1. if running then return trigger_training=false

    # 2. run training job

    # 2.1. query unlearn_news from mongodb

    # 2.2. trigger training job

    # 3. return 


    response = {
        "status": 200, 
        "message": "Training request has been received.", 
        "trigger_training": False,
    }
    return JsonResponse(response, status=200)
