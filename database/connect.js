const mongoose = require('mongoose');
const { mongoPass } = require(`../config.js`)
    try{
      
    mongoose.connect(mongoPass, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          //  useFindAndModify: false,
           // useCreateIndex: true
        }).then(() => console.log(`Mongo Datas�na Ba�ar�yla Ba�lan�ld�`))
    }catch (e) {
        console.log(e)
    }


