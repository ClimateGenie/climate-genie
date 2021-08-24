from flask import Flask
from flask_restful import Api, Resource, reqparse

application = Flask(__name__)
api = Api(application)

"""
Our debunk statements
"""
debunk_statements = [
    {
        "id": 0,
        "category": "1.1",
        "content": "Penis"
    },
    {
        "id": 1,
        "category": "0.0",
        "content": "All clear"
    }
]

"""
Define a resource class for responses
"""


class Response(Resource):

    # Define a method to get responses based on query
    def get(self, category=None):
        # Check all the debunk statements
        for response in debunk_statements:
            # If the category of the response is that that was queried
            if response["category"] == category:
                # Return the response alongside a HTTP status code 200 to indicate success
                return response, 200
        # Otherwise return no response found and a failure status code
        return "No response found", 404

    # Create a method to add to the statements
    def post(self, id):
        # Request a parser to process the post
        parser = reqparse.RequestParser()
        # Add the category
        parser.add_argument("category")
        # Add the statement content
        parser.add_argument("content")
        # Create a set of parameters from the post
        params = parser.parse_args()

        for response in debunk_statements:
            if response["id"] == id:
                return "Statement with ID: {} already exists".format(id), 400

        statement = {
            "id": int(id),
            "category": params["category"],
            "content": params["content"]
        }

        debunk_statements.append(statement)
        return statement, 201

    # Create a put method to amend existing entries in the repository
    def put(self, id):
        # Request a parser to process the post
        parser = reqparse.RequestParser()
        # Add the category
        parser.add_argument("category")
        # Add the statement content
        parser.add_argument("content")
        # Create a set of parameters from the post
        params = parser.parse_args()

        for response in debunk_statements:
            if response["id"] == id:
                response["category"] = params["category"]
                response["content"] = params["content"]
                return response, 200

        statement = {
            "id": int(id),
            "category": params["category"],
            "content": params["content"]
        }

        debunk_statements.append(statement)
        return statement, 201

    # Create a delete method
    def delete(self, id):
        global debunk_statements
        debunk_statements = [response for response in debunk_statements if response["id"] != id]
        return "Quote with ID {} deleted successfully".format(id), 200


api.add_resource(Response, '/debunk_statements/', '/debunk_statements', '/debunk_statements/<string:category>',
                 '/debunk_statements/<int:id>')


if __name__ == "__main__":
    application.run(debug=True)
