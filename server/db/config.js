const mongoose = require('mongoose')

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/bookstore', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect successfully!!!');
    }catch(err){
        // console.log('Connect failure!!!');
        console.log(err)
    }
}

module.exports = {connect}
