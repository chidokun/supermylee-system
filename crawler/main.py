from concurrent.futures import ThreadPoolExecutor
import json
from crawl.ThanhNienSourceCrawler import ThanhNienSourceCrawler
from crawl.TuoiTreSourceCrawler import TuoiTreSourceCrawler

def load_json_config(file_path):
    with open(file_path, "r") as file:
        return json.load(file)

executor = ThreadPoolExecutor(max_workers=10)

## load config
thanhnien_config = load_json_config("./config/thanhnien.json")
tuoitre_config = load_json_config("./config/tuoitre.json")

# thanhnien = ThanhNienSourceCrawler(thanhnien_config, executor)
# thanhnien.crawl_all()
tuoitre = TuoiTreSourceCrawler(tuoitre_config, executor)
tuoitre.crawl_all()

executor.shutdown(wait=True)