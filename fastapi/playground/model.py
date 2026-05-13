```python
# ============================================
# SIMPLE MUSIC GENERATION TRAINING PIPELINE
# ============================================
#
# Pipeline:
# MIDI -> Tokens -> Dataset -> Transformer
#
# Install:
# pip install miditok pretty_midi torch transformers datasets
#
# ============================================

from pathlib import Path
from miditok import REMI, TokenizerConfig
from torch.utils.data import Dataset, DataLoader
import torch
import torch.nn as nn
from transformers import GPT2Config, GPT2LMHeadModel

# ============================================
# STEP 1 — CONFIGURE TOKENIZER
# ============================================

config = TokenizerConfig(
    num_velocities=32,
    use_chords=True,
    use_programs=True,
    use_tempos=True,
    beat_res={(0, 4): 8}  # quantization
)

tokenizer = REMI(config)

# ============================================
# STEP 2 — TOKENIZE MIDI FILES
# ============================================

midi_folder = "midi_dataset"
token_output_folder = "tokenized"

Path(token_output_folder).mkdir(exist_ok=True)

midi_files = list(Path(midi_folder).glob("*.mid"))

all_token_ids = []

for midi_file in midi_files:
    try:
        tokens = tokenizer(midi_file)

        # save tokenized file
        out_file = Path(token_output_folder) / f"{midi_file.stem}.json"
        tokenizer.save_tokens(tokens, out_file)

        # collect token ids
        ids = tokens.ids
        all_token_ids.extend(ids)

        print(f"Processed: {midi_file.name}")

    except Exception as e:
        print(f"Error processing {midi_file}: {e}")

print("Total tokens:", len(all_token_ids))

# ============================================
# STEP 3 — CREATE TRAINING SEQUENCES
# ============================================

SEQ_LEN = 512

inputs = []
targets = []

for i in range(0, len(all_token_ids) - SEQ_LEN):
    x = all_token_ids[i:i + SEQ_LEN]
    y = all_token_ids[i + 1:i + SEQ_LEN + 1]

    inputs.append(x)
    targets.append(y)

print("Training samples:", len(inputs))

# ============================================
# STEP 4 — PYTORCH DATASET
# ============================================

class MusicDataset(Dataset):
    def __init__(self, inputs, targets):
        self.inputs = inputs
        self.targets = targets

    def __len__(self):
        return len(self.inputs)

    def __getitem__(self, idx):
        return {
            "input_ids": torch.tensor(self.inputs[idx], dtype=torch.long),
            "labels": torch.tensor(self.targets[idx], dtype=torch.long)
        }

dataset = MusicDataset(inputs, targets)

loader = DataLoader(
    dataset,
    batch_size=4,
    shuffle=True
)

# ============================================
# STEP 5 — BUILD GPT MODEL
# ============================================

vocab_size = tokenizer.vocab_size

config = GPT2Config(
    vocab_size=vocab_size,
    n_positions=SEQ_LEN,
    n_embd=512,
    n_layer=6,
    n_head=8
)

model = GPT2LMHeadModel(config)

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model.to(device)

# ============================================
# STEP 6 — TRAINING LOOP
# ============================================

optimizer = torch.optim.AdamW(
    model.parameters(),
    lr=3e-4
)

EPOCHS = 10

model.train()

for epoch in range(EPOCHS):

    total_loss = 0

    for batch in loader:

        input_ids = batch["input_ids"].to(device)
        labels = batch["labels"].to(device)

        outputs = model(
            input_ids=input_ids,
            labels=labels
        )

        loss = outputs.loss

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        total_loss += loss.item()

    avg_loss = total_loss / len(loader)

    print(f"Epoch {epoch+1} Loss: {avg_loss:.4f}")

# ============================================
# STEP 7 — SAVE MODEL
# ============================================

model.save_pretrained("music_model")
tokenizer.save_params("music_model/tokenizer_config.json")

print("Model saved!")

# ============================================
# STEP 8 — GENERATE MUSIC
# ============================================

model.eval()

# random start token
start_tokens = torch.tensor(
    [[tokenizer["Bar_None"]]],
    dtype=torch.long
).to(device)

generated = start_tokens

MAX_NEW_TOKENS = 512

with torch.no_grad():

    for _ in range(MAX_NEW_TOKENS):

        outputs = model(generated)

        logits = outputs.logits[:, -1, :]

        probs = torch.softmax(logits, dim=-1)

        next_token = torch.multinomial(probs, num_samples=1)

        generated = torch.cat(
            [generated, next_token],
            dim=1
        )

generated_ids = generated[0].cpu().tolist()

# ============================================
# STEP 9 — CONVERT TOKENS BACK TO MIDI
# ============================================

tokens = tokenizer._tokens_to_ids(generated_ids)

token_sequence = tokenizer.complete_sequence(tokens)

tokenizer.tokens_to_midi(
    token_sequence,
    output_path="generated_music.mid"
)

print("Generated MIDI saved!")
```
