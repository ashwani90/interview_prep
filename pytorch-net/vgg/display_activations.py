import torch
import matplotlib.pyplot as plt 

def visualize_activations(model, image):
    activations = []
    def hook_fn(module, input, output):
        activations.append(output.detach())
    
    hooks = []
    for layer in model.features[:2]:
        hooks.append(layer.register_forward_hook(hook_fn))
    
    model(image.unsqueeze(0))

    # Visualize activations
    for i, activation in enumerate(activations):
        act = act.squeeze()
        fig, axes = plt.subplots(1, min(6, act.shape[0]), figsize=(15, 5))
        for j in range(min(6, act.shape[0])):
            axes[j].imshow(act[j], cmap='gray')
            axes[j].axis('off')
        plt.show()
    
    for h in hooks:
        h.remove()

