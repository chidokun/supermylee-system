from django.http import JsonResponse
from rest_framework.decorators import api_view
import json

@api_view(["POST"])
def predict_api(request, *args, **kwargs):
    
    req = {}
    try:
        req = json.loads(request.body)
    except:
        return JsonResponse({"status": 400, "message": "Invalid request"}, status=400)

    if not req.get("articles"):
        return JsonResponse({"status": 400, "message": "Invalid request"}, status=400)
    
    result = []
    articles = req.get("articles", [])
    for article in articles:
        result.append({
            "article_data": article,
            "result": [
                {
                    "category": "Thời sự",
                    "category_index": 1,
                    "score": 0.12
                },
                {
                    "category": "Văn hóa",
                    "category_index": 2,
                    "score": 0.01
                },
                {
                    "category": "Sức khỏe",
                    "category_index": 3,
                    "score": 0.02
                },
                {
                    "category": "Giải trí",
                    "category_index": 4,
                    "score": 0.01
                },
                {
                    "category": "Tài chính kinh doanh",
                    "category_index": 5,
                    "score": 0.42
                },
                {
                    "category": "Thế giới",
                    "category_index": 6,
                    "score": 0.11
                },
                {
                    "category": "Giáo dục",
                    "category_index": 7,
                    "score": 0.35
                },
                {
                    "category": "Pháp luật",
                    "category_index": 8,
                    "score": 0.21
                },
                {
                    "category": "Kinh doanh",
                    "category_index": 9,
                    "score": 0.01
                },
                {
                    "category": "Khoa học",
                    "category_index": 10,
                    "score": 0.11
                },
                {
                    "category": "Đời sống",
                    "category_index": 11,
                    "score": 0.25
                },
                {
                    "category": "Du lịch",
                    "category_index": 12,
                    "score": 0.17
                }
            ]
        })


    response = {
        "status": 200, 
        "message": "Predicted successfully.", 
        "data": result,
    }
    return JsonResponse(response, status=200)
