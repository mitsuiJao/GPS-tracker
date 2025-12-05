from paho.mqtt import client as mqtt

print("working!")
HOST = "broker.emqx.io"
TOPIC = "test/mitsuijao/24"
PORT = 1883

def on_connect(client, userdata, flg, rc, prop):
    print(f"Connected with result code {rc}")
    client.subscribe(TOPIC)
    print(f"Subscribed to topic: {TOPIC}")

def on_disconnect(client, userdata, rc, prop):
    if rc != 0:
        print(f"Unexpected disconnection with result code {rc}")
        
def on_message(client, userdata, msg):
    print(f"Received message on topic {msg.topic}: {msg.payload.decode()}")

client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
client.on_connect = on_connect
client.on_disconnect = on_disconnect
client.on_message = on_message

client.connect(HOST, PORT)
client.loop_forever()
