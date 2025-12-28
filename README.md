バイクに着けたGPSトラッカーのリポジトリです

```
docker-compose up --build
```

server/.env に設定する必要がある変数
```
MQTT_USER 
MQTT_PASS
DB_USER
DB_PASS
DB_NAME=biketracker 
DB_PORT=5432
DB_TABLE
GCP_APIKEY
```