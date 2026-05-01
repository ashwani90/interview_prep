class PreActBottleneck(nn.Module):
    expansion = 4

    def __init__(self, in_c, out_c, stride=1):
        super().__init__()

        self.bn1 = nn.BatchNorm2d(in_c)
        self.conv1 = nn.Conv2d(in_c, out_c, kernel_size=1, bias=False)

        self.bn2 = nn.BatchNorm2d(out_c)
        self.conv2 = nn.Conv2d(out_c, out_c, kernel_size=3, stride=stride, padding=1, bias=False)

        self.bn3 = nn.BatchNorm2d(out_c)
        self.conv3 = nn.Conv2d(out_c, out_c * self.expansion, kernel_size=1, bias=False)

        self.shortcut = nn.Sequential()
        if stride != 1 or in_c != out_c * self.expansion:
            self.shortcut = nn.Conv2d(in_c, out_c * self.expansion, kernel_size=1, stride=stride, bias=False)
        
    
    def forward(self, x):
        out = F.relu(self.bn1(x))
        shortcut = self.shortcut(out) if len(self.shortcut) > 0 else x

        out = self.conv1(out)
        out = self.conv2(F.relu(self.bn2(out)))
        out = self.conv3(F.relu(self.bn3(out)))
        out += shortcut
        return out
    
    