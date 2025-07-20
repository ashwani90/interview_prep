# Build a Serializer interface and implement JSONSerializer, XMLSerializer.

from abc import ABC, abstractmethod

class Serializer(ABC):
    @abstractmethod
    def serialize(self, data) -> str:
        pass

    @abstractmethod
    def deserialize(self, data: str):
        pass

import json

class JSONSerializer(Serializer):
    def serialize(self, data) -> str:
        return json.dumps(data)

    def deserialize(self, data: str):
        return json.loads(data)

import xml.etree.ElementTree as ET

class XMLSerializer(Serializer):
    def serialize(self, data: dict) -> str:
        root = ET.Element("root")
        for key, value in data.items():
            child = ET.SubElement(root, key)
            child.text = str(value)
        return ET.tostring(root, encoding="unicode")

    def deserialize(self, data: str) -> dict:
        root = ET.fromstring(data)
        return {child.tag: child.text for child in root}

def demo(serializer: Serializer):
    print(f"\nUsing {serializer.__class__.__name__}")
    obj = {"name": "Alice", "age": 30, "city": "Wonderland"}

    serialized = serializer.serialize(obj)
    print("Serialized:", serialized)

    deserialized = serializer.deserialize(serialized)
    print("Deserialized:", deserialized)


demo(JSONSerializer())
demo(XMLSerializer())
