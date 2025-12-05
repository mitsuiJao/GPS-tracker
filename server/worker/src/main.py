from paho.mqtt import client as mqtt

HOST = "broker.emqx.io"
TOPICK = "test/mitsuijao/24"
PORT = 1883

def on_connect(client, userdata, flg, rc, prop):
    print("connect")
    client.subscribe(TOPICK)

def on_desconnect(client, userdata, rc, prop):
    if rc != 0:
        print("discconect")
        
def on_message(client, userdata, msg):
    print(msg)

client = mqtt.Client(callback_api_version=mqtt.CallbackAPIVersion.VERSION2)
client.on_connect = on_connect
client.on_disconnect = on_desconnect
client.on_message = on_message

client.connect(HOST, PORT)
client.loop_forever()