import requests
print("Testing Flask API")
print(requests.get('http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=Marcus%20Rashford'))
try:
    response = requests.get('http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=Marcus%20Rashford')
    print(response.json)
except:  
    print(response.status)