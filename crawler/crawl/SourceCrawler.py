from concurrent.futures import ThreadPoolExecutor

class SourceCrawler:
    output_header = ['id', 'link', 'title', 'thumbnail', 'time', 'summary', 'category', 'sub_category', 'full_article']

    def __init__(self, config, executor=ThreadPoolExecutor()) -> None:
        self.config = config
        self.executor = executor
        self.headers = {"user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.96 Safari/537.36"}

    def crawl_all(self) -> None:
        categories = self.config["categories"]
        for category in categories:
            self.crawl(category)
            # self.executor.submit(self.crawl, category)

    def get_output_path(self, category_config):
        return self.config["output"].format(category_config["category"], category_config["sub_category"])

    def crawl(self, category_config) -> None:
        pass

    
