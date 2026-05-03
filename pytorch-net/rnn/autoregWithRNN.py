import torch
import torch.nn as nn

class RNN_AR(nn.Module):
    def __init__(self, input_size=1, hidden_size=32, num_layers=1):
        super().__init__()
        self.rnn = nn.RNN(input_size, hidden_size, num_layers, batch_first=True)
        self.fc = nn.Linear(hidden_size, 1)
    
    def forward(self, x, state=None):
        out, state = self.rnn(x, state)
        out = self.fc(out)
        return out, state
    
model = RNN_AR()
loss_fn = nn.MSELoss()

optimizer = torch.optim.Adam(model.parameters(), lr=0.01)
for X, y in data_loader:
    pred, _ = model(X)
    loss = loss_fn(pred, y)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

def predict(model, init_seq, steps):
    model.eval()
    outputs = []
    x = init_seq

    status = None
    for _ in range(steps):
        y, state = model(x, state)
        next_val = y[:, -1, :]
        outputs.append(next_val)
        x = next_val

    return torch.cat(outputs, dim=1)