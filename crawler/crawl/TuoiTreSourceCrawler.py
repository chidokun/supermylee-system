from .SourceCrawler import SourceCrawler
from bs4 import BeautifulSoup
import requests
import csv
from time import sleep

class TuoiTreSourceCrawler(SourceCrawler):

    def __init__(self, config, executor) -> None:
        super().__init__(config, executor)
        print("# init tuoitre")
        print("# category: {}".format(len(config["categories"])))
    
    def crawl(self, category_config) -> None:
        with open(self.get_output_path(category_config), "a", encoding="utf-8") as file:
            writer = csv.writer(file, quotechar='"', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(self.output_header)

            for i in range(1, 51):
                self.crawl_page(category_config, writer, i)

    def crawl_page(self, category_config, writer, i):

        category = category_config["category"]
        sub_category = category_config["sub_category"]
        print("crawl tuoitre - {} - {} - page {}".format(category, sub_category, i))

        page_response = requests.get(category_config["src"].format(i), headers=self.headers)
        response_text = page_response.text

        if not response_text:
            print("block tuoitre - {} - {} - page {}".format(category, sub_category, i))
            print("retry tuoitre - {} - {} - page {} after 60s".format(category, sub_category, i))
            sleep(60)
            self.crawl_page(category_config, writer, i)
            return

        page_parser = BeautifulSoup(response_text, 'html.parser')
        articles = page_parser.findAll(class_="list-news-content")
        if articles:
            articles = articles[0]
            articles = articles.findAll(class_="news-item") if articles else []

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
            meta_thumbnail = article_parser.find("meta", { "property": "og:image"}) or None
            if meta_thumbnail:
                r["thumbnail"] = meta_thumbnail["content"] or ""

            datetime = article_parser.findAll(class_="date-time")
            if datetime:
                datetime = datetime[0]
                datetime = datetime.text if datetime else ""
                r["time"] = datetime

            summary = article_parser.findAll(class_="sapo") or []
            summary = summary[0].text if summary else ""
            r["summary"] = summary
            
            article_element = article_parser.findAll(class_="fck")
            if article_element:
                article_element = article_element[0]

            morenews = article_element.findAll(class_="VCSortableInPreviewMode") if article_element else []
            for spare in morenews:
                spare.decompose()

            r["full_article"] = article_element.text.strip() if article_element else ""

            writer.writerow(r.values())
            print("done tuoitre - {} - {} - page {} - link {}".format(category, sub_category, i, r["link"]))
