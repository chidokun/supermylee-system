import requests as rq
import json

def predict(title, summary):
    req = {"articles": [{"title": title, "summary": summary}]}
    resp = rq.post("http://localhost:8101/api/predict", json.dumps(req))
    body = json.loads(resp.content)
    print("     >>> Call Predict API: res =", body)
    result = body["data"][0]["result"] or []
    category = max(result, key=lambda e: e["score"])
    return category["category"]