const express = require('express');
const userRouter = require('./routes/user');
const port = process.env.PORT || 3000;
require('./db/db');

const app = express();

app.use(express.json());
app.use('/user',userRouter);

app.listen(port, ()=>{
    console.log(`Servidor corriendo en el puerto: ${port}`);
});