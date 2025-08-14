import struct
from typing import Any, Dict, List, Tuple, Union

class BinarySerializer:
    # Type markers
    TYPE_NULL = 0
    TYPE_INT = 1
    TYPE_FLOAT = 2
    TYPE_BOOL = 3
    TYPE_STR = 4
    TYPE_LIST = 5
    TYPE_DICT = 6
    
    def __init__(self):
        self._version = 1  # Format version

    def serialize(self, obj: Any) -> bytes:
        """Serialize Python object to binary format"""
        return self._serialize_value(obj)

    def deserialize(self, data: bytes) -> Any:
        """Deserialize binary data back to Python object"""
        return self._deserialize_value(data)

    def _serialize_value(self, obj: Any) -> bytes:
        """Handle serialization based on object type"""
        if obj is None:
            return struct.pack('>B', self.TYPE_NULL)
        elif isinstance(obj, bool):
            return struct.pack('>BB', self.TYPE_BOOL, int(obj))
        elif isinstance(obj, int):
            return struct.pack('>Bq', self.TYPE_INT, obj)
        elif isinstance(obj, float):
            return struct.pack('>Bd', self.TYPE_FLOAT, obj)
        elif isinstance(obj, str):
            encoded = obj.encode('utf-8')
            return struct.pack(f'>BI{len(encoded)}s', self.TYPE_STR, len(encoded), encoded)
        elif isinstance(obj, list):
            return self._serialize_list(obj)
        elif isinstance(obj, dict):
            return self._serialize_dict(obj)
        else:
            raise TypeError(f"Unsupported type: {type(obj)}")

    def _serialize_list(self, lst: List) -> bytes:
        """Serialize a list"""
        parts = [struct.pack('>BI', self.TYPE_LIST, len(lst))]
        for item in lst:
            parts.append(self._serialize_value(item))
        return b''.join(parts)

    def _serialize_dict(self, dct: Dict) -> bytes:
        """Serialize a dictionary"""
        parts = [struct.pack('>BI', self.TYPE_DICT, len(dct))]
        for key, value in dct.items():
            if not isinstance(key, str):
                raise TypeError("Dictionary keys must be strings")
            parts.append(self._serialize_value(key))
            parts.append(self._serialize_value(value))
        return b''.join(parts)

    def _deserialize_value(self, data: bytes, pos: int = 0) -> Tuple[Any, int]:
        """Deserialize a value from binary data"""
        type_marker = data[pos]
        pos += 1
        
        if type_marker == self.TYPE_NULL:
            return None, pos
        elif type_marker == self.TYPE_BOOL:
            val = struct.unpack_from('>B', data, pos)[0]
            return bool(val), pos + 1
        elif type_marker == self.TYPE_INT:
            val = struct.unpack_from('>q', data, pos)[0]
            return val, pos + 8
        elif type_marker == self.TYPE_FLOAT:
            val = struct.unpack_from('>d', data, pos)[0]
            return val, pos + 8
        elif type_marker == self.TYPE_STR:
            length = struct.unpack_from('>I', data, pos)[0]
            pos += 4
            val = struct.unpack_from(f'>{length}s', data, pos)[0]
            return val.decode('utf-8'), pos + length
        elif type_marker == self.TYPE_LIST:
            return self._deserialize_list(data, pos)
        elif type_marker == self.TYPE_DICT:
            return self._deserialize_dict(data, pos)
        else:
            raise ValueError(f"Unknown type marker: {type_marker}")

    def _deserialize_list(self, data: bytes, pos: int) -> Tuple[List, int]:
        """Deserialize a list"""
        length = struct.unpack_from('>I', data, pos)[0]
        pos += 4
        lst = []
        for _ in range(length):
            item, pos = self._deserialize_value(data, pos)
            lst.append(item)
        return lst, pos

    def _deserialize_dict(self, data: bytes, pos: int) -> Tuple[Dict, int]:
        """Deserialize a dictionary"""
        length = struct.unpack_from('>I', data, pos)[0]
        pos += 4
        dct = {}
        for _ in range(length):
            key, pos = self._deserialize_value(data, pos)
            value, pos = self._deserialize_value(data, pos)
            dct[key] = value
        return dct, pos

# Example usage
if __name__ == "__main__":
    serializer = BinarySerializer()

    # Test data
    data = {
        "name": "Alice",
        "age": 30,
        "scores": [95.5, 88.0, 92.3],
        "metadata": {
            "active": True,
            "tags": ["user", "premium"],
            "settings": None
        }
    }

    # Serialize
    binary_data = serializer.serialize(data)
    print(f"Serialized size: {len(binary_data)} bytes")
    print(f"Binary representation: {binary_data[:50]}...")  # Show first 50 bytes

    # Deserialize
    reconstructed = serializer.deserialize(binary_data)
    print("\nReconstructed data:")
    print(reconstructed)

    # Verify
    assert reconstructed == data, "Serialization/deserialization failed"
    print("\nVerification successful!")