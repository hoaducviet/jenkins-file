const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');
const { mutipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
class UserHomeController {
    // GET /me/stored/couses

    home(req, res) {
        const name = req.session.parent.name 
        res.render('user/home',{
            isUser: true,
            name: name,
        });
    }

    addChildrenParentSession(req, res, next){
        const userId = req.session.user._id
        Parent.findOne({user_Id: userId})
            .then((parent) =>{
                req.session.parent = mongooseToObject(parent)
                const parentId = req.session.parent._id
                Children.find({parent_Id: parentId})
                    .then((childrens) =>{
                        if(childrens){
                            req.session.children = mutipleMongooseToObject(childrens)
                            res.redirect('/user/home')
                        }else{
                            res.redirect('/user/home')
                        }
                    })
                    .catch(next)
            })
            .catch(next)
    }

}
module.exports = new UserHomeController();
