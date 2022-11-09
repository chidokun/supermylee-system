import re
from .SourceCrawler import SourceCrawler
from bs4 import BeautifulSoup
import requests
import csv
from time import sleep

class ThanhNienSourceCrawler(SourceCrawler):

    def __init__(self, config, executor) -> None:
        super().__init__(config, executor)
        print("# init thanhnien")
        print("# category: {}".format(len(config["categories"])))
    
    def crawl(self, category_config) -> None:
        with open(self.get_output_path(category_config), "a", encoding="utf-8") as file:
            writer = csv.writer(file, quotechar='"', quoting=csv.QUOTE_MINIMAL)
            writer.writerow(self.output_header)

            for i in range(1, 10):
                self.crawl_page(category_config, writer, i)

            # futures = [self.executor.submit(self.crawl_page, category_config, writer, i) for i in range(1, 50)]
            # done, not_done = wait(futures)
        
    def crawl_page(self, category_config, writer, i):

        category = category_config["category"]
        sub_category = category_config["sub_category"]
        print("crawl thanhnien - {} - {} - page {}".format(category, sub_category, i))

        page_response = requests.get(category_config["src"].format(i), headers=self.headers)
        response_text = page_response.text

        if not response_text:
            print("block thanhnien - {} - {} - page {}".format(category, sub_category, i))
            print("retry thanhnien - {} - {} - page {} after 60s".format(category, sub_category, i))
            sleep(60)
            self.crawl_page(category_config, writer, i)
            return

        page_parser = BeautifulSoup(response_text, 'html.parser')
        articles = page_parser.find("div", class_="relative")

        articles = articles.findAll(class_="story") if articles else []

        for article in articles:
            article_elements = list(article)
            r = {
                "id": article_elements[1]["data-io-canonical-url"],
                "link": article_elements[1]["href"],
                "title": article_elements[1]["title"],
                "thumbnail": "",
                "time": article_elements[5].findAll(class_="time")[0].contents[0].strip(),
                "summary": article_elements[7].text.strip(),
                "category": category,
                "sub_category": sub_category,
                "full_article": ""
            }

            article_response = requests.get(r["link"], headers=self.headers)
            article_parser = BeautifulSoup(article_response.text, 'html.parser')

            meta_thumbnail = article_parser.find("meta", { "property": "og:image"}) or None
            if meta_thumbnail:
                r["thumbnail"] = meta_thumbnail["content"] or ""

            time = article_parser.find("time")
            if time:
                r["time"] = time["datetime"]

            article_element = article_parser.findAll(class_="content-detail-top")
            if article_element:
                article_element = article_element[0]

            if article_element:
                morenews = article_element.find("div", class_="morenews")
                if morenews:
                    morenews.decompose()

            if article_element:
                r["full_article"] = re.sub(r"\n*\n", " ", article_element.text)

            writer.writerow(r.values())
            print("done thanhnien - {} - {} - page {} - link {}".format(category, sub_category, i, r["link"]))