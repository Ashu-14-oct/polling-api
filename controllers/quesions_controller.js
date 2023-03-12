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
module.exports.delete = async function(req, res){
  try{
    const deleteQuestion = await Question.findByIdAndDelete(req.params.id);

    //check if question exists
    if(!deleteQuestion){
      return res.status(404).json({ success: false, error: 'Question not found' });
    }

    //Remove the question's id from all the corresponding options
    await Option.updateMany({ question: req.params.id }, { $unset: {question: req.params.id}});
    res.json({ success: true, message: 'Question deleted successfully'});
  } catch(err){
    console.log(err);
    res.status(500).json({ success: false, error: 'Server error'});
  }
}

//only option deletion enpoint
module.exports.deleteOption = async function(req, res){
  console.log(req.params.id);
    try{

      //find the option to be deleted by id
      const option = await Option.findById(req.params.id);
      if(!option){
        return res.status(404).json({ message: 'Option not found' });
      }

      //remove the option from the question's array

      const questionId = option.question;
      const update = { $pull: {options: req.params.id} };
      const udpateQuestion = await Question.findByIdAndUpdate(
        questionId,
        update,
        {new: true}
      );
      if(!udpateQuestion){
        return res.status(404).json({message: 'Question not found'});
      }

      //delete the option document
      await option.deleteOne();
      res.status(200).json({ message: 'Option deleted successfully'});

    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}

//add votes to the options
module.exports.addVotes = async function(req, res){
    try{
      //find the option to add votes using id
      const option = await Option.findById(req.params.id);
      if(!option){
        return res.status(404).json({message: 'option not found'});
      }

      //increment the votes for the options
      option.votes += 1;
      await option.save();

      res.status(200).json({message: 'vote added successgully'});
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'server error'});
    }
}

//to view the question
module.exports.view = async function(req, res){
    try{
      //find the question by ID
      const question = await Question.findById(req.params.id);

      //check if question exists
      if(!question){
        return res.status(404).json({message: 'Question not found'});
      }

      //return the question
      res.status(200).json(question);
    }catch(err){
        console.log(err);
        res.status(500).json({message: 'Server error'});
    }
}
  