import requests
print("Testing Flask API")
#Testing All API Endpoints in Python
#Post Request: Add a new Restaurant to User's Portfolio{Works!}
create = requests.post('http://127.0.0.1:5000/api/v1/resources/user/add', data= {'name': 'Childish Gambino'})
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Childish Gambino', 'restaurantID': 4, 'restaurantName': "R1"})
response2 = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Childish Gambino', 'restaurantID': 5, 'restaurantName': "R2"})
response3 = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Childish Gambino', 'restaurantID': 6, 'restaurantName': "R3"})
print(response)
#Process Get Request: Get User Data{Works!}
response = requests.get('http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=Marcus%20Rashford')
if (response.status_code == 200):
    print(response.json())
#Delete Restaurant from User's Portfolio{Works!}
response = requests.delete('http://127.0.0.1:5000/api/v1/resources/delete/restaurant', data = {'name': 'Childish Gambino', 'restaurantName': "Taco Bell"})

#Add a User to the Database
response = requests.post('http://127.0.0.1:5000/api/v1/resources/user/add', data = {'name': 'Kanye West'})
print("HTTP Response Status Code: ", response.status_code)

#Sample GET Request
response = requests.get('http://127.0.0.1:5000/api/v1/resources/restaurants/user?name=Person54')
print(response.json())

#Create a New User{Works!}
response = requests.post('http://127.0.0.1:5000/api/v1/resources/user/add', data= {'name': 'Person54'})
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Person54', 'restaurantID': 0, 'restaurantName': "R1"})

#Deleting User Account{Works!}
usernameList = [f"Person{number}" for number in range(10,20)]
for username in usernameList:
    response = requests.delete('http://127.0.0.1:5000/api/v1/resources/delete/user', data = {'name': username})

#Test for Person54:
response = requests.delete('http://127.0.0.1:5000/api/v1/resources/delete/restaurant', data = {'name': 'Person54', 'restaurantName': "Clinton Street Baking Company"})
response = requests.delete('http://127.0.0.1:5000/api/v1/resources/delete/restaurant', data = {'name': 'Person54', 'restaurantName': "Best Bagel "})
response = requests.delete('http://127.0.0.1:5000/api/v1/resources/delete/restaurant', data = {'name': 'Person54', 'restaurantName': "Doughnut Plant"})
response = requests.delete('http://127.0.0.1:5000/api/v1/resources/delete/restaurant', data = {'name': 'Person54', 'restaurantName': "R1"})


#Add Restaurants for Person 54
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Person54', 'restaurantID': 1, 'restaurantName': "R1"})
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Person54', 'restaurantID': 2, 'restaurantName': "R2"})
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Person54', 'restaurantID': 3, 'restaurantName': "R3"})
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Person54', 'restaurantID': 4, 'restaurantName': "R4"})
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Person54', 'restaurantID': 5, 'restaurantName': "R5"})

#Experimenting with For Loops and API Call
newList = [f'R{num}' for num in range(10,20)]
print(newList)
def requestFunction(count, element):
    response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurants/user', data = {'name': 'Childish Gambino', 'restaurantID': count, 'restaurantName': element})
for count, element in enumerate(newList):
    requestFunction(count, element)


#Testing API Endpoint for Lists
data = {'userName': "Person54",'id': [1,2], "names": ['Burger King', "Taco Bell"]}
response = requests.post('http://127.0.0.1:5000/api/v1/resources/restaurantList/user', data = data)
print(response.status_code)
