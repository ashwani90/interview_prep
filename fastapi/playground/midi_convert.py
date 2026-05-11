import json
from mido import MidiFile

def midi_to_json(midi_path, json_path):
    midi = MidiFile(midi_path)

    midi_data = {
        "ticks_per_beat": midi.ticks_per_beat,
        "tracks": []
    }

    for i, track in enumerate(midi.tracks):
        track_data = {
            "track_number": i,
            "messages": []
        }

        for msg in track:
            track_data["messages"].append({
                "type": msg.type,
                "time": msg.time,
                "data": str(msg)
            })

        midi_data["tracks"].append(track_data)

    with open(json_path, "w") as f:
        json.dump(midi_data, f, indent=4)

    print(f"Converted {midi_path} -> {json_path}")


# Example usage
midi_to_json("rot2.mid", "rot2.json")