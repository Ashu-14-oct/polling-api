## REST API for making questions with options with votes.

Use "npm install/npm i" to install required libraries.

Live on: http://3.138.117.246:3000

Use postman for testing

1). for creating a question: http://3.138.117.246:3000/questions/create (POST)
  => pass title and options.
  example: 
  
  {
    "title": "What's your favorite singer?",
    "options": [
        { "text": "enrique" },
        { "text": "Joe" },
        { "text": "Selena" },
        { "text": "Whixer" }
    ]
  }
  
2). for deleting a question: http://3.138.117.246:3000/questions/:id/delete (DELETE)

3). for deleting a option: http://3.138.117.246:3000/options/:id/delete (DELETE)

4). for adding a vote to a to option: http://3.138.117.246:3000/options/:id/add_vote (PUT)

5). to view the question and its options: http://3.138.117.246:3000/questions/:id (GET)
