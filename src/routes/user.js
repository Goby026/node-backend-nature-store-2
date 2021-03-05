const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/User');

const router = express.Router();

router.post('/', async (req, res) => {
    //crear nuevo usuario
    try {
        const user = new User(req.body);
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/login', async (req, res) => {
    //login de usuario registrado
    try {
        const {email, password} = req.body;
        const user = await User.findByCredentials(email, password);
        if(!user){
            return res.status(401).send({error: 'Falló login, revise sus credenciales'});
        }
        const token = await user.generateAuthToken();
        res.send({user, token});
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/me', auth, (req, res)=>{
    res.send(req.user);
});

router.post('/me/logout', auth, async (req, res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token != req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/me/logoutall', auth, async(req, res)=>{
    // matar todas las sesiones de los dispositivos
    try {
        req.user.tokens.splice(0, req.user.tokens.length);
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;