import requests
print("Testing Flask API")

#Post Request
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Gabriel Jesus', 'restaurantID': 0, 'restaurantName': "KFC"})
print(response)
#Process Get Request
response = requests.get('http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=Marcus%20Rashford')
if (response.status_code == 200):
    print(response.json())