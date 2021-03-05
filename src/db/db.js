const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('Base de datos conectada'))
.catch(err => console.log(err));