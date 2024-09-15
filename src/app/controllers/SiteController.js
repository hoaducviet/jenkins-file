const User = require('../models/User');
const Parent = require('../models/Parent');
const { mutipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class SiteController {
   

    signIn(req, res) {
        res.render('sign-in');
    }
    validateSignIn(req, res, next){
        const {account, password} = req.body
        User.findOne({account: req.body.account, password: req.body.password})
            .then((user) => {
                if(user){
                    user = mongooseToObject(user);
                    req.session.user = user
                    if(user.role == 1){
                        res.redirect('/admin/home')
                    }else if(user.role == 2){
                        res.redirect('/user/home/add/session/children/parent')
                    }else{
                        res.redirect('/')
                    }
                }else{
                    res.redirect('/')
                }
            })
            .catch(next)
    }

    signUp(req, res) {
        res.render('sign-up');
    }


    createSignUp(req, res, next){
        Promise.all([
            User.findOne({account: req.body.account}),
            Parent.findOne({email: req.body.email})
        ])
            .then(([userName, parentEmail]) =>{
                if(userName || parentEmail){
                    res.redirect('/signup')
                }else{
                    req.session.email = req.body.email
                    const newUser = new User({
                        account: req.body.account,
                        password: req.body.password,
                        role: 2
                    })
                    req.session.user = newUser
                    newUser.save()
                        .then(() => res.redirect('/update/profile'))
                        .catch(next);
                }
            })
            .catch(next)
    }


    forgot(req, res) {
        res.render('forgot');
    }
   

    updateProfile(req, res){
        res.render('profile-no-update')
    }

    firstUpdateProfile(req, res){
        res.render('profile-first-update')
    }
    storeFirstUpdateProfile(req, res, next){
        const User_Id = req.session.user._id
        const parentData = {
            name: req.body.name,
            dateOfBirth: req.body.dateOfBirth,
            gender: "Nữ",
            address: req.body.address,
            phone: req.body.phone,
            email: req.session.email,
            user_Id: User_Id,

        }

        const parent = new Parent(parentData);
        req.session.parent = parent
        parent.save()
            .then(() => res.redirect('/user/home'))
            .catch(next);
    }

    destroySession(req, res, next) {
        req.session.destroy((error) => {
          if (error) {
            console.error('Lỗi khi hủy bỏ session:', error);
            return next(error);
          }
          
          console.log('Session đã bị hủy bỏ');
          res.redirect('/');
        });
    }
}
module.exports = new SiteController();
