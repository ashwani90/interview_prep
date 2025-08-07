Great! Here's a **step-by-step implementation guide** for the mini project:

---

## 🛠️ Project: Real-Time Order Processing & Inventory Tracking with Kafka, Faust, FastAPI

---

## 🔧 Step 1: Setup Project Structure

```
kafka-inventory-system/
├── docker-compose.yml
├── fastapi-producer/
│   └── main.py
├── faust-consumer/
│   └── app.py
├── alerts-handler/
│   └── alert.py
├── requirements.txt
└── README.md
```

---

## 📦 Step 2: Docker Compose Environment

Create `docker-compose.yml`:

```yaml
version: '3.7'

services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.3.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.3.0
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://kafka:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
    depends_on:
      - zookeeper

  postgres:
    image: postgres:13
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: inventory
    ports:
      - "5432:5432"
```

---

## 📦 Step 3: FastAPI Order Producer (`fastapi-producer/main.py`)

```python
from fastapi import FastAPI
from pydantic import BaseModel
from kafka import KafkaProducer
import json

app = FastAPI()

producer = KafkaProducer(
    bootstrap_servers="kafka:9092",
    value_serializer=lambda v: json.dumps(v).encode("utf-8")
)

class Order(BaseModel):
    order_id: str
    product_id: str
    quantity: int

@app.post("/order")
def send_order(order: Order):
    producer.send("orders", order.dict())
    return {"status": "sent", "order": order}
```

---

## 📦 Step 4: Faust Consumer & Processor (`faust-consumer/app.py`)

Install:

```bash
pip install faust
```

```python
import faust

class Order(faust.Record):
    order_id: str
    product_id: str
    quantity: int

class Alert(faust.Record):
    product_id: str
    stock_left: int

app = faust.App(
    'order-processor',
    broker='kafka://kafka:9092',
    store='memory://',
)

order_topic = app.topic('orders', value_type=Order)
inventory_topic = app.topic('inventory-events')
alert_topic = app.topic('alerts', value_type=Alert)

inventory_table = app.Table('inventory', default=int)
inventory_table['P-567'] = 5
inventory_table['P-568'] = 2

@app.agent(order_topic)
async def process(orders):
    async for order in orders:
        stock = inventory_table[order.product_id]
        if order.quantity <= stock:
            inventory_table[order.product_id] -= order.quantity
            await inventory_topic.send(value={
                "order_id": order.order_id,
                "product_id": order.product_id,
                "status": "fulfilled"
            })
            if inventory_table[order.product_id] < 2:
                await alert_topic.send(value=Alert(
                    product_id=order.product_id,
                    stock_left=inventory_table[order.product_id]
                ))
        else:
            await inventory_topic.send(value={
                "order_id": order.order_id,
                "product_id": order.product_id,
                "status": "rejected"
            })

```

Run it with:

```bash
faust -A app worker -l info
```

---

## 📦 Step 5: Alert Logger (`alerts-handler/alert.py`)

```python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'alerts',
    bootstrap_servers='kafka:9092',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

print("Listening for alerts...")
for message in consumer:
    alert = message.value
    print(f"🚨 ALERT: Low stock for {alert['product_id']}. Only {alert['stock_left']} left!")
```

---

## ✅ Step 6: Run Everything

1. Start services:

```bash
docker-compose up -d
```

2. Run FastAPI app:

```bash
uvicorn fastapi-producer.main:app --reload --host 0.0.0.0 --port 8000
```

3. Run Faust app:

```bash
cd faust-consumer
faust -A app worker -l info
```

4. Run alert logger:

```bash
python alerts-handler/alert.py
```

---

## 🧪 Step 7: Test

Send a POST request:

```bash
curl -X POST http://localhost:8000/order -H "Content-Type: application/json" \
-d '{"order_id": "ORD-1001", "product_id": "P-567", "quantity": 2}'
```

You should see:

* Order sent
* Faust processes it
* Inventory updates
* Alerts printed in alert handler if stock < 2

---

Would you like:

* ✅ Dockerized version of all apps?
* ✅ Add PostgreSQL inventory persistence?
* ✅ Extend with Kafka Schema Registry or Avro?
* ✅ UI dashboard with real-time inventory?

Let me know what you'd like next!
