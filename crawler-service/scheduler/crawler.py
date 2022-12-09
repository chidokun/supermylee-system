import feedparser as fp
from bs4 import BeautifulSoup
from datetime import datetime
import requests
import re

def get_list_news(config):

    print(" >>> Get list news from: ", config["rss_link"])

    latest_date = datetime.strptime(config["latest_crawl_time"], "%Y-%m-%d %H:%M:%S")

    rss = fp.parse(config["rss_link"])
    news_list = rss["entries"]
    result = []
    for news in news_list:
        publish_time = datetime.strptime(news["published"][0:25], "%a, %d %b %Y %H:%M:%S")
        if publish_time < latest_date:
            continue

        summary = BeautifulSoup(news["summary"], "html.parser").text
        
        result.append({
            "title": news["title"],
            "link": news["link"],
            "thumbnail": "",
            "summary": summary,
            "full_article": "",
            "category": config["category"],
            "article_id": "",
            "publish_time": publish_time.strftime("%Y-%m-%d %H:%M:%S")
        })
    return result

def get_full_article(news, config):
    if config["news_branch"] == "THANH_NIEN":
        return get_full_article_thanhnien(news)
    elif config["news_branch"] == "TUOI_TRE":
        return get_full_article_tuoitre(news)
    else:
        return None


def get_full_article_thanhnien(news):
    result = news.copy()

    article_response = requests.get(news["link"])
    article_parser = BeautifulSoup(article_response.text, 'html.parser')

    meta_id = article_parser.find("meta", { "property": "og:url"}) or None
    if meta_id:
        result["article_id"] = meta_id["content"][20:] or ""

    meta_thumbnail = article_parser.find("meta", { "property": "og:image"}) or None
    if meta_thumbnail:
        result["thumbnail"] = meta_thumbnail["content"] or ""

    article_element = article_parser.findAll(class_="content-detail-top")
    if article_element:
        article_element = article_element[0]

    if article_element:
        morenews = article_element.find("div", class_="morenews")
        if morenews:
            morenews.decompose()

    if article_element:
        result["full_article"] = re.sub(r"\n*\n", " ", article_element.text)

    return result

def get_full_article_tuoitre(news):
    result = news.copy()

    article_response = requests.get(news["link"])
    article_parser = BeautifulSoup(article_response.text, 'html.parser')

    article_id = article_parser.find("input", { "id": "hdNewsId"}) or None
    if article_id:
        result["article_id"] = article_id["value"] or ""

    meta_thumbnail = article_parser.find("meta", { "property": "og:image"}) or None
    if meta_thumbnail:
        result["thumbnail"] = meta_thumbnail["content"] or ""
    
    article_element = article_parser.findAll(class_="fck")
    if article_element:
        article_element = article_element[0]

    morenews = article_element.findAll(class_="VCSortableInPreviewMode") if article_element else []
    for spare in morenews:
        spare.decompose()

    result["full_article"] = article_element.text.strip() if article_element else ""

    return result
