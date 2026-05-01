# Inception block implementation

class InceptionBlock(nn.Module):
    def __init__(self, in_c):
        super().__init__()
        self.branch1 = nn.Conv2d(in_c, 64, kernel_size=1)
        
        self.branch2 = nn.Sequential(
            nn.Conv2d(in_c, 32, kernel_size=1),
            nn.Conv2d(32, 64, 3, padding=1)
        )

        self.branch3 = nn.Sequential(
            nn.Conv2d(in_c, 32, kernel_size=1),
            nn.Conv2d(32, 64, 3, padding=1),
            nn.Conv2d(64, 64, 3, padding=1)
        )

        self.pool = nn.Sequential(
            nn.MaxPool2d(kernel_size=3, stride=1, padding=1),
            nn.Conv2d(in_c, 32, kernel_size=1)
        )

    def forward(self, x):
        return torch.cat([
            self.branch1(x),
            self.branch2(x),
            self.branch3(x),
            self.pool(x)
        ], dim=1)