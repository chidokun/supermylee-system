from .SourceCrawler import SourceCrawler
from bs4 import BeautifulSoup
import requests
import json
import csv
import sys

class TuoiTreSourceCrawler(SourceCrawler):

    def __init__(self, config, executor) -> None:
        super().__init__(config, executor)
        print("# init tuoitre")
        print("# category: {}".format(len(config["categories"])))
    
    def crawl(self, category_config) -> None:
        with open(self.get_output_path(category_config), "w", encoding="utf-8") as file:
            writer = csv.writer(file, quotechar='"', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(self.output_header)

            for i in range(1,2):
                category = category_config["category"]
                sub_category = category_config["sub_category"]
                print("tuoitre - {} - {} - page {}".format(category, sub_category, i))

                page_response = requests.get(category_config["src"].format(i))
                page_parser = BeautifulSoup(page_response.text, 'html.parser')
                articles = page_parser.findAll(class_="list-news-content")[0]
                articles = articles.findAll(class_="news-item")

                for article in articles:
                    article_elements = list(article)
                    r = {
                        "id": article["data-newsid"],
                        "link": list(article_elements)[1]["href"],
                        "title": list(article_elements)[1]["title"],
                        "thumbnail": "",
                        "time": "",
                        "summary": "",
                        "category": category,
                        "sub_category": sub_category,
                        "full_article": ""
                    }

                    r["link"] = "https://tuoitre.vn" + r["link"]
                    article_response = requests.get(r["link"])
                    article_parser = BeautifulSoup(article_response.text, 'html.parser')
                    r["thumbnail"] = article_parser.find("meta", { "property": "og:image"})["content"]
                    r["time"] = article_parser.findAll(class_="date-time")[0].text
                    r["summary"] = article_parser.findAll(class_="sapo")[0].text
                    
                    article_element = article_parser.findAll(class_="fck")[0]
                    for spare in article_element.findAll(class_="VCSortableInPreviewMode"):
                        spare.decompose()

                    r["full_article"] = article_element.text

                    writer.writerow(r.values())