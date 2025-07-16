# Use composition: Make a Computer class that contains CPU, RAM, HardDrive objects.

class CPU:
    def __init__(self, model, cores, speed):
        """
        Initialize a CPU component.
        
        Args:
            model (str): CPU model name
            cores (int): Number of cores
            speed (float): Clock speed in GHz
        """
        self.model = model
        self.cores = cores
        self.speed = speed
    
    def get_specs(self):
        """Return CPU specifications as a string"""
        return f"CPU: {self.model}, {self.cores} cores, {self.speed}GHz"
    
    def __str__(self):
        return self.get_specs()

class RAM:
    def __init__(self, capacity, type_="DDR4"):
        """
        Initialize a RAM component.
        
        Args:
            capacity (int): Size in GB
            type_ (str): RAM type (DDR3, DDR4, etc.)
        """
        self.capacity = capacity
        self.type = type_
    
    def get_specs(self):
        """Return RAM specifications as a string"""
        return f"RAM: {self.capacity}GB {self.type}"
    
    def __str__(self):
        return self.get_specs()

class HardDrive:
    def __init__(self, capacity, type_="SSD"):
        """
        Initialize a HardDrive component.
        
        Args:
            capacity (int): Size in GB
            type_ (str): Drive type (HDD, SSD, NVMe)
        """
        self.capacity = capacity
        self.type = type_
    
    def get_specs(self):
        """Return HardDrive specifications as a string"""
        return f"Storage: {self.capacity}GB {self.type}"
    
    def __str__(self):
        return self.get_specs()

class Computer:
    def __init__(self, name, cpu, ram, hard_drive):
        """
        Initialize a Computer composed of components.
        
        Args:
            name (str): Computer name/identifier
            cpu (CPU): CPU object
            ram (RAM): RAM object
            hard_drive (HardDrive): HardDrive object
        """
        self.name = name
        self.cpu = cpu
        self.ram = ram
        self.hard_drive = hard_drive
    
    def get_specs(self):
        """Return full computer specifications"""
        specs = [
            f"Computer: {self.name}",
            self.cpu.get_specs(),
            self.ram.get_specs(),
            self.hard_drive.get_specs()
        ]
        return "\n".join(specs)
    
    def upgrade_ram(self, new_ram):
        """Upgrade the RAM component"""
        self.ram = new_ram
        print(f"Upgraded RAM to {new_ram}")
    
    def upgrade_storage(self, new_drive):
        """Upgrade the storage component"""
        self.hard_drive = new_drive
        print(f"Upgraded storage to {new_drive}")
    
    def __str__(self):
        return self.get_specs()


# Example usage
if __name__ == "__main__":
    # Create components
    cpu = CPU("Intel Core i7-12700K", 12, 3.6)
    ram = RAM(32, "DDR5")
    hdd = HardDrive(1000, "NVMe SSD")

    # Build a computer
    my_pc = Computer("Workstation", cpu, ram, hdd)
    
    print("=== My Computer ===")
    print(my_pc)
    
    # Upgrade components
    print("\n=== Upgrading RAM ===")
    new_ram = RAM(64, "DDR5")
    my_pc.upgrade_ram(new_ram)
    
    print("\n=== Upgrading Storage ===")
    new_drive = HardDrive(2000, "NVMe SSD")
    my_pc.upgrade_storage(new_drive)
    
    print("\n=== Upgraded Computer ===")
    print(my_pc)