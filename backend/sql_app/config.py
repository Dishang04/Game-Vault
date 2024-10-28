import json
from cryptography.fernet import Fernet

def load_config():
    try:
        with open('config.json', 'r') as config_file:
            file = json.load(config_file)
            file["ENCRYPTION_KEY"]
            return file
    except:
        new_key = Fernet.generate_key().decode()
        file["ENCRYPTION_KEY"] = new_key
        save_config(file)
        print("Generated new encryption key")
        return file
    
    
def save_config(config):
    with open("config.json", 'w') as config_file:
        json.dump(config, config_file, indent=4)

config = load_config()
encryption_key = config["ENCRYPTION_KEY"]