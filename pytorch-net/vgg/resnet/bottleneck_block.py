class Bottleneck(nn.Module):
    def __init__(self, in_c, out_c, stride=1):
        super().__init__()
        self.conv1 = nn.Conv2d(in_c, out_c, kernel_size=1, stride=stride)
        self.bn1 = nn.BatchNorm2d(out_c)
        self.conv2 = nn.Conv2d(out_c, out_c, kernel_size=3, stride=1, padding=1)
        self.bn2 = nn.BatchNorm2d(out_c)
        self.conv3 = nn.Conv2d(out_c, out_c * 4, kernel_size=1, stride=1)
        self.bn3 = nn.BatchNorm2d(out_c * 4)

        self.shortcut = nn.Sequential()

        if stride != 1 or in_c != out_c * 4:
            self.shortcut = nn.Sequential(
                nn.Conv2d(in_c, out_c * 4, kernel_size=1, stride=stride),
                nn.BatchNorm2d(out_c * 4)
            )
    
    def forward(self, x):
        out = F.relu(self.bn1(self.conv1(x)))
        out = F.relu(self.bn2(self.conv2(out)))
        out = self.bn3(self.conv3(out))
        out += self.shortcut(x)
        return F.relu(out)