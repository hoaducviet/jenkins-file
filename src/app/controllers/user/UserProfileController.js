const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');

const { mutipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
class UserProfileController {
    
    //GET /User/Profile
    profile(req, res, next) {
        const parentId = req.session.parent._id
        Parent.findById(parentId)
            .then((parent) => {
                parent = mongooseToObject(parent)
                req.session.parent = parent
                Children.find({parent_Id: parentId})
                    .then((childrens) => {
                        childrens = mutipleMongooseToObject(childrens)
                        req.session.children = childrens
                        res.render('user/profile',{
                            isUser: true,
                            parent: parent,
                            childrens: childrens,
                        });

                    })
                    .catch(next)
            })
            .catch(next)
    }
    //GET /User/Profile/Edit/Parent
    profileEditParent(req, res, next) {
        const parent = req.session.parent
        res.render('user/profile-update-parent',{
            isUser: true,
            parent: parent,
        })
           
    }

    //PUT /User/Profile/Update/Parent
    profileUpdateParent(req, res, next){
        const parentId = req.session.parent._id
        Parent.updateOne({ _id: parentId}, req.body)
            .then(() => res.redirect('/user/profile'))
            .catch(next);
    }

    //GET /User/Profile/Edit/Children
    profileEditChildren(req, res, next) {
        const childrenId = req.params.id
        Children.findById(childrenId)
            .then((children) => {
                res.render('user/profile-update-children',{
                    isUser: true,
                    children: mongooseToObject(children),
                })
            })
            .catch(next);
    }

    //PUT /User/Profile/Update/Children
    profileUpdateChildren(req, res, next) {
        const childrentId = req.params.id
        Children.updateOne({ _id: childrentId}, req.body)
            .then(() => res.redirect('/user/profile'))
            .catch(next);
    }

    //GET /User/Profile/Add/NewChildren
    profileAddChildren(req, res, next) {
        res.render('user/profile-add-children',{
            isUser: true
        })
        
    }

    //POST /User/Profile/Store/NewChildren
    profileStoreNewChildren(req, res, next) {
        const parentId = req.session.parent._id
        const children = new Children({
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            parent_Id: parentId,
        })
        children.save()
            .then(() => res.redirect('/user/profile'))
            .catch(next);
    }

}
module.exports = new UserProfileController();
