from paho.mqtt import client as mqtt
import os
import struct
from db_connect import DB
import struct

print("working!")

MQTTHOST = os.getenv("MQTT_BROKER")
MQTTPORT = 1883
TOPIC = "test/mitsuijao/24"

db_pool = None

def decode_payload(payload):
    lat_int, lng_int = struct.unpack("<ii", payload)
    latitude = lat_int / 1000000.0
    longitude = lng_int / 1000000.0
    return latitude, longitude
    
def on_connect(client, userdata, flg, rc, prop):
    print(f"Connected with result code {rc}")
    client.subscribe(TOPIC)
    print(f"Subscribed to topic: {TOPIC}")

def on_disconnect(client, userdata, rc, prop):
    if rc != 0:
        print(f"Unexpected disconnection with result code {rc}")
        
def on_message(client, userdata, msg):
    latitude, longitude = decode_payload(msg.payload)
    print(f"Received message on topic {msg.topic}: {msg.payload}")
    print(latitude, longitude)
    DB.insertDB(float(latitude), float(longitude))

def main():
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