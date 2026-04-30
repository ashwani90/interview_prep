# Implementation of average pool

import torch
import torch.nn as nn

avg_pool_as_conv = nn.Conv2d(
    in_channels=1,
    out_channels=1,
    kernel_size=2,
    stride=2,
    bias=False
)

with torch.no_grad():
    avg_pool_as_conv.weight[:] = .25

avg_pool_as_conv.weight.requires_grad = False
