from django.http import JsonResponse
from rest_framework.decorators import api_view
import json
from .superMyleeModel import superMyLeeClassifier, superMyLeeClassifier2

@api_view(["POST"])
def predict_api(request, *args, **kwargs):
    
    req = {}
    try:
        req = json.loads(request.body)
    except:
        return JsonResponse({"status": 400, "message": "Invalid request"}, status=400)

    if not req.get("articles"):
        return JsonResponse({"status": 400, "message": "Invalid request"}, status=400)
    inputs=[]
    for article in req.get("articles"):
        title=artcile["title"][:-1] if article["title"][-1]=="." else article["title"]
        summary=article["summary"]
        inputs.append(title + ". " + summary)

    classifier=superMyLeeClassifier2(
        checkpoint_path="C:/Users/VTU3HC/Desktop/superMylee/classification-service/api/checkpoints/model.bin",
        labels_file="C:/Users/VTU3HC/Desktop/superMylee/classification-service/api/data/labels.json",
        batch_size=32
    )
    results = classifier.predict(inputs)

    response = {
        "status": 200, 
        "message": "Predicted successfully.", 
        "data": results,
    }
    return JsonResponse(response, status=200)
