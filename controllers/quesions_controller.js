const Question = require('../models/questionSchema');
const Option = require('../models/optionSchema');

//question creation endpoint
module.exports.create = async function(req, res){
  try {

    //creating question
    const question = await Question.create({title: req.body.title});
    const options = req.body.options;
    const optionIds = [];

    //iterating over given options for creating them in db and pusing their id's in question's option array
    for(let option of options){
      const newOption = await Option.create({text: option.text, question: question._id});
      optionIds.push(newOption._id);
    }
    question.options = optionIds;
    await question.save();

    //sending response
    return res.status(200).json({
      success: true,
      message: 'Question created successfully'
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

//question deletion endpoint
module.exports.delete = function(req, res){

}

//only option deletion enpoint
module.exports.deleteOption = function(req, res){

}

//add votes to the options
module.exports.addVotes = function(req, res){

}

//to view the question
module.exports.view = function(req, res){
    
}
  