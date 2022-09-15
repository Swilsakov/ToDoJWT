const express = require('express')
const mongoose = require('mongoose')
const app = express()
const routes = require('./routes/index')
const PORT = 4000

app
  .use(express.json())
  .use('/', routes)
  .use((req, res) => {
    res.status(404).send({
      url:`${req.originalUrl} not found`
    })
  })


const start = async () => {
   try {
    await mongoose.connect('mongodb+srv://Swilsakov:12345@cluster0.wl6nzgm.mongodb.net/todo', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Connect db is success');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    })
   } catch (error) {
    console.log(error);
   }
}

start()