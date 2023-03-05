const mongoose = require('mongoose');
const { mongoPass } = require(`../config.js`)
    try{
      
    mongoose.connect(mongoPass, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          //  useFindAndModify: false,
           // useCreateIndex: true
        }).then(() => console.log(`Mongo Datasýna Baþarýyla Baðlanýldý`))
    }catch (e) {
        console.log(e)
    }


