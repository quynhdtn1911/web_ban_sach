const User = require('../model/User');
const bcrypt = require("bcrypt");

class AuthController{
    //Register
    async registerUser(req, res){
        console.log(req.body)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const existUsername = await User.findOne({ username: req.body.username });
        if (existUsername != null) {
            res.status(302).send({
                error: "Username already exist",
                data: null,
            });
        }

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            fullname: req.body.fullname,
            dateOfBirth: new Date(req.body.dateOfBirth),
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
        });
        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    async login(req, res){
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                res.status(404).send({
                    message: "User not found",
                    object: null,
                });
            }
            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (!validPassword) {
                res.status(404).send({
                    message: "Password is not correct",
                    object: null,
                });
            }
            if (user && validPassword) {
                res.status(200).send({
                    message: "Login success",
                    object: user,
                });
            }
        } catch (err) {
            res.status(500).send(err);
        }
    }
    //Change password
    async changePassword(req, res){
        try {
            let current_user= await User.findById(req.params.id);
            if(bcrypt.compareSync(req.body.old_password,current_user.password)) {
                let hashPassword=bcrypt.hashSync(req.body.new_password,10);
                await User.updateOne({
                    _id:current_user._id
                },{
                    password:hashPassword
                });
                return res.status(200).send({
                    message:'Password successfully updated',
                });
            } else {
                return res.status(400).send({
                    message:'Old password does not matched',
                    data:{}
                });
            }

        } catch (error) {
            return res.status(400).send({
                message: error.message,
                data: error
            });
        }
    }
    async loginByGoogle(req, res){
        try {
            console.log(req.body);
            const user = await User.findOne({ username: req.body.email });
            
            if (!user) {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(req.body.email , salt);
                const existUsername = await User.findOne({ username: req.body.email });
                if (existUsername != null) {
                    res.status(302).send({
                        error: "Username already exist",
                        data: null,
                    });
                }
                
                const newUser = new User({
                    username: req.body.email,
                    password: hashedPassword,
                    fullname: "admin",
                    gender: 0,
                    dateOfBirth: new Date("2000-02-22"),
                    phone: "09999999999",
                    email: req.body.email,
                    address: "Hà Nội",
                });
                try {
                    const savedUser = await newUser.save();
                    res.status(200).json(savedUser);
                } catch (err) {
                    res.status(500).send(err);
                }
            }
            else{
                try {
                    res.status(200).json(user);
                } catch (err) {
                    res.status(500).send(err);
                }
            }
          
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

module.exports = new AuthController;