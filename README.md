# Super-Mylee News Categorization System

The system that collect and predict news category.

![](/docs/images/interactive-diagram.png)

## How to run the system

Fisrt, clone the repo into your local.

```
git clone https://github.com/chidokun/supermylee-system.git
```

### Online-Training Service

Create `virtualenv`.

```
cd online-training-service
python -m venv .venv
source .venv/bin/activate
```
Install requirements.

```
pip install -r requirements.txt
```

Run project with Python.

```
python manage.py runserver 8100
```

Now you can call Training API.

```
curl -X POST http://localhost:8100/api/train
```

### Classification Service

Create `virtualenv`.

```
cd classification-service
python -m venv .venv
source .venv/bin/activate
```
Install requirements.

```
pip install -r requirements.txt
```

Run project with Python.

```
python manage.py runserver 8101
```

Now you can call Predict API.

```
curl --location --request POST 'http://localhost:8101/api/predict' \
--header 'Content-Type: application/json' \
--data-raw '{
	"articles": [
		{
			"title": "Mãn nhãn '\''hổ mang chúa'\'' Su-30MK2 hợp luyện trên bầu trời Hà Nội",
			"summary": "TTO - Sáng 2-12, các đơn vị máy bay chiến đấu '\''Hổ mang chúa'\'' Su-30MK2 và trực thăng Mi đã tiến hành hợp luyện tổng duyệt cho màn trình diễn tại lễ khai mạc Triển lãm Quốc phòng quốc tế Việt Nam 2022 từ ngày 8 đến 10-12."
		},
		{
			"title": "Đường vành đai 3 TP.HCM: Động lực mới cho các tỉnh phía Nam",
			"summary": "TTO - Để phát huy lợi thế của đường vành đai 3 TP.HCM, các địa phương cần ngồi lại với nhau xem xét tận dụng như thế nào, điều chỉnh quy hoạch ra sao để vừa phát huy thế mạnh của các địa phương vừa khai phá được thế mạnh tổng hợp của cả vùng..."
		}
	]
}'
```

### Crawler Service

Create `virtualenv`.

```
cd crawler-service
python -m venv .venv
source .venv/bin/activate
```
Install requirements.

```
pip install -r requirements.txt
```

Run project with Python.

```
python manage.py runserver 8102
```

### Back-end Service

If you use Yarn PKG, you can run:

```
cd back-end && yarn install && yarn start
```

Or if you use NPM, you can run:

```
cd back-end && npm install && npm start
```

### Front-end Service

If you use Yarn PKG, you can run:

```
cd front-end && yarn install && yarn start
```


Or if you use NPM, you can run:

```
cd front-end && npm install && npm start
```