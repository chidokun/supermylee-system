from datetime import datetime
import scheduler.db as db
import scheduler.crawler as crawler
import scheduler.api as api

def handle():
    print("\n>>> Start scheduler: ", datetime.now())
    
    # 1. get configs
    configs = db.get_all_configs()
    print(">>> Get all config: ", len(configs), " configs")

    # 2. for each config
    for config in configs:
        print(">>> Handle config: ", config)
        handle_config(config)

        print(">>> Save latest crawl time config!")
        db.save_latest_update(config)
        print(">>> Done scheduler!")

def handle_config(config): 
    
    # 2.1. get rss data
    news_list = crawler.get_list_news(config)

    print(" >>> List news has: ", len(news_list), " later news.")
    # 2.2. for each news
    for news in news_list:
        print(" >>> Handle news: ", news)
        handle_news(news, config)

    print(" >>> Done handle config!")


def handle_news(news, config):
    
    # 2.2.1. get full news
    full_news = crawler.get_full_article(news, config)
    print("     >>> Get full article: ", full_news) 

    # 2.2.2. save unlearn_news
    db.save_unlearn_news(full_news)
    print("     >>> Save to unlearned_news!")

    # 2.2.3. predict
    half_news = full_news.copy()
    predicted_category = api.predict(half_news["title"], half_news["summary"] + " " + half_news["full_article"])
    print("     >>> Predicted news category: ", predicted_category)

    half_news["predicted_category"] = predicted_category
    del half_news["full_article"]
    # 2.2.4. save news
    db.save_news(half_news)
    print("     >>> Save to news: ", half_news)
    print("     >>> Done handle news!")