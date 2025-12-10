from paho.mqtt import client as mqtt
import psycopg2
from psycopg2 import pool
import os
import struct
from db_connect import DB

print("working!")

MQTTHOST = os.getenv("MQTT_BROKER")
MQTTPORT = 1883
TOPIC = "test/mitsuijao/24"

# DBHOST = os.getenv("DB_HOST", "localhost")
# DBPORT = 5432
# USER = "nishima"
# PASS = "nishima"
# DBNAME = "biketracker"
# TABLE = "coordinate"

db_pool = None

def on_connect(client, userdata, flg, rc, prop):
    print(f"Connected with result code {rc}")
    client.subscribe(TOPIC)
    print(f"Subscribed to topic: {TOPIC}")

def on_disconnect(client, userdata, rc, prop):
    if rc != 0:
        print(f"Unexpected disconnection with result code {rc}")
        
def on_message(client, userdata, msg):
    payload = msg.payload.decode()
    print(f"Received message on topic {msg.topic}: {payload}")
    latitude, longitude = payload.split(",")
    DB.insertDB(float(latitude), float(longitude))


# def init_pool():
#     global db_pool
#     try:
#         db_pool = pool.SimpleConnectionPool(
#             minconn=1,
#             maxconn=5,
#             host=DBHOST,
#             port=DBPORT,
#             dbname=DBNAME,
#             user=USER,
#             password=PASS
#         )
#     except psycopg2.Error as e:
#         print(f"DB connection error: {e}")
#         raise

# def save_db(latitude, longitude):
#     conn = db_pool.getconn()
    
#     try:
#         cur = conn.cursor()
#         sql = f"INSERT INTO {TABLE} (timestamp, latitude, longitude) VALUES (NOW(), %s, %s)"
#         cur.execute(sql, (latitude, longitude))
#         conn.commit()

#     except Exception as e:
#         conn.rollback()
#         print(f"DBerror: {e}")
#     finally:
#         db_pool.putconn(conn)

def main():
    # init_pool()
    client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
    client.on_connect = on_connect
    client.on_disconnect = on_disconnect
    client.on_message = on_message

    try:
        client.connect(MQTTHOST, MQTTPORT)
        client.loop_forever()
    except KeyboardInterrupt:
        pass
    finally:
        if db_pool:
            db_pool.closeall()

if __name__ == "__main__":
    main()