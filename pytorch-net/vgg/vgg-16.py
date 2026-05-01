import torch.nn as nn

def vgg16():
    return nn.Sequential(
        nn.Conv2d(3, 64, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(64, 64, kernel_size=3, padding=1), nn.ReLU(),
        nn.MaxPool2d(kernel_size=2, stride=2),
        # Block 2
        nn.Conv2d(64, 128, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(128, 128, kernel_size=3, padding=1), nn.ReLU(),
        nn.MaxPool2d(kernel_size=2, stride=2),
        # Block 3
        nn.Conv2d(128, 256, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(256, 256, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(256, 256, kernel_size=3, padding=1), nn.ReLU(),
        nn.MaxPool2d(kernel_size=2, stride=2),
        # Block 4
        nn.Conv2d(256, 512, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(512, 512, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(512, 512, kernel_size=3, padding=1), nn.ReLU(),
        nn.MaxPool2d(kernel_size=2, stride=2),
        # Block 5
        nn.Conv2d(512, 512, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(512, 512, kernel_size=3, padding=1), nn.ReLU(),
        nn.Conv2d(512, 512, kernel_size=3, padding=1), nn.ReLU(),
        nn.MaxPool2d(kernel_size=2, stride=2),
        
        nn.Flatten(),
        nn.Linear(512 * 7 * 7, 4096), nn.ReLU(),
        nn.Linear(4096, 4096), nn.ReLU(),
        nn.Linear(4096, 1000)
    )