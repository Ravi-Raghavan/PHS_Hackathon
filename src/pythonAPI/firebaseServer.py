import flask
from flask import Flask, request, jsonify
from flask_restful import Api, Resource, reqparse
import firebase_admin
from firebase_admin import credentials,firestore

app = flask.Flask(__name__)
app.config["DEBUG"] = True
cred = credentials.Certificate('/Users/raviraghavan/phs-project/src/serverKey.json')
firebaseApp = firebase_admin.initialize_app(cred)
db = firestore.client()
users = [
    {
        "name": "Arun Raghavan",
        "restaurants": ["Burger King", "Wendys"]
    }
]
userList = ['Ravi Raghavan', "Indu Raghavan", "Joshua Finkel", "Marcus Rashford"]
restaurantList = [{'id': 0,
     'name': "Swagat"},
    {'id': 1,
     'name': "KFC"},
    {'id': 2,
     'name': "Wendys"}]
userDictionaries = []
for user in userList:
    string = user
    doc_ref = db.collection(u'users').document(u'{}'.format(string))
    doc_ref.set({
        u'name': user,
        u'restaurants': restaurantList
    })
    initialArray = db.collection(u'users').document(u'{}'.format(string)).get().to_dict()
    print("Initial Data: ", (initialArray))
    userDictionaries.append(initialArray)
books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]
@app.route('/', methods=['GET'])
def home():
    return "<h1>Test Point</h1><p>This site is a prototype API for PHS Project.</p>"

@app.route('/api/v1/resources/restaurants/user', methods = ["GET", "POST"])
def get_user_information():
    if(request.method == "GET"):
        if 'name' in request.args:
            name = (request.args['name'])
        else:
            return "Please Provide the name of the user"
        results = None
        doc_ref = db.collection(u'users').document(u'{}'.format(name)).get().to_dict()
        results = doc_ref
        return jsonify(results) 
    elif(request.method == "POST"):
        req_data = request.form
        print("Test for Object", req_data == None)
        '''if 'name' in request.args:
            name = (request.args['name'])
        else:
            return "Please Provide the name of the user"
        if 'restaurantID' in request.args:
            id = request.args['restaurantID']
        else:
            return "Please Give restaurant ID"
        if 'restaurantName' in request.args:
            restaurantName = request.args['restaurantName']
        else:
            return "Please provide a restaurant Name"'''
        restaurantObject = {'id': req_data['restaurantID'], 'name': req_data['restaurantName']}
        doc_ref = db.collection(u'users').document(u'{}'.format(req_data['name']))
        doc_ref.set({
        u'name': req_data['name'],
        u'restaurants': restaurantObject
    })
        updated_doc_ref = db.collection(u'users').document(u'{}'.format(req_data['name'])).get().to_dict()
        return jsonify(updated_doc_ref)

@app.route('/api/v1/resources/books', methods = ["GET"])
def api_id():
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "NO ID PROVIDED BROOOO"
    results = []
    for book in books:
        if(book['id'] == id):
            results.append(book)
    
    return jsonify(results)

@app.route('/api/v1/resources/user/add', methods = ["POST"])
def add_user():
    name = ""
    if 'name' in request.args:
        name = request.args['name']
    else: 
        return "No name has been included"
    return name
    


app.run()



    
