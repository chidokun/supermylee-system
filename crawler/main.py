from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup
import requests
import json
import csv
import sys
from crawl.ThanhNienSourceCrawler import ThanhNienSourceCrawler
from crawl.TuoiTreSourceCrawler import TuoiTreSourceCrawler

def load_json_config(file_path):
    with open(file_path, "r") as file:
        return json.load(file)

executor = ThreadPoolExecutor(max_workers=10)

## thanh nien
thanhnien_config = load_json_config("./config/thanhnien.json")
tuoitre_config = load_json_config("./config/tuoitre.json")

thanhnien = ThanhNienSourceCrawler(thanhnien_config, executor)
thanhnien.crawl_all()
# tuoitre = TuoiTreSourceCrawler(tuoitre_config, executor)
# tuoitre.crawl_all()

executor.shutdown(wait=True)
# listt = []
# for i in range(1,2):
#     print(i)
#     response = requests.get(thanhnien_src.format(i))
#     parser = BeautifulSoup(response.text, 'html.parser')
#     content = parser.find("div", class_="relative")
#     articles = content.findAll(class_="story")
#     for article in articles:
#         l = list(article)
#         r = {
#             "id": l[1]["data-io-canonical-url"],
#             "link": l[1]["href"],
#             "title": l[1]["title"],
#             "time": l[5].findAll(class_="time")[0].contents[0].strip(),
#             "summary": l[7].text.strip(),
#             "category": "",
#             "sub_category": "",
#             "full_article": ""
#         }
#         listt.append(r)

# print(listt[0].keys())
# print(len(listt))

# with open("./data/thanhnien.csv", "w") as f:
#     writer = csv.writer(f)
#     writer.writerow(listt[0].keys())
#     for i in listt:
#         writer.writerow(i.values())


