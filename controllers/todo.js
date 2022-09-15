const ToDoSchema = require('../models/ToDoSchema');
const UserSchema = require('../models/UserSchema');

const getAllToDo = async (req, res) => {
  const { _id: id_user } = req.user; // ?
  const toDoes = await ToDoSchema.find({id_user});
  res.status(200).json(toDoes)
}

const createToDo = async (req, res) => {
  const { title, description } = req.body
  const { _id: id_user } = req.user; // ?
  if(!( title && description )) {
    res.status(400).send('Enter all inputs')
  }
  const toDo = await ToDoSchema.create({
    title,
    description,
    id_user
  });
  res.status(201).json(toDo);
};

const deleteToDo = async (req, res) => {
  const { _id: id_user } = req.user;
  const { id } = req.params;
  const toDo = await ToDoSchema.findById(id);
  if(toDo && (toDo.id_user === id_user)) {
    await ToDoSchema.findByIdAndDelete(id)
    res.status(200).send('Deleted success')
  } else {
    res.status(400).send('Something wrong!')
  }
}


module.exports = {
  getAllToDo,
  createToDo,
  deleteToDo
}