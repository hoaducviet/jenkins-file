const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');

class AdminUserController {
    //GET /Admin/User/List
    userList(req, res, next) {
        Parent.find({})
            .then((parents) => {
                res.render('admin/user-list', {
                    isAdmin: true,
                    parents: mutipleMongooseToObject(parents),
                });
            })
            .catch(next);
    }
    //DELETE /Admin/User/:id
    userDelete(req, res, next) {
        Parent.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/user'))
            .catch(next);
    }



    //GET /Admin/User/Info/:id
    userInfo(req, res, next) {
        Parent.findById(req.params.id)
        .then((parent) =>{
            parent = mongooseToObject(parent),
            req.session.parent = parent
            Children.find({parent_Id: req.params.id})
                .then((childrens) =>{
                    res.render('admin/user-info', {
                        isAdmin: true,
                        parent: parent,
                        childrens: mutipleMongooseToObject(childrens),
                    })
                })
                .catch(next)
        })
        .catch(next);
    }
    //DELETE /Admin/User/Info/Children/Delete/:id
    userChildrenDelete(req, res, next) {
        const parentId = req.session.parent._id
        Children.delete({ _id: req.params.id })
            .then(() => res.redirect(`/admin/user/info/${parentId}`))
            .catch(next);
    }

    //GET /Admin/Info/Add/Children/Form
    userInfoAddChildren(req, res, next) {
        Parent.findById(req.params.id)
        .then((parent) =>{
            res.render('admin/user-info-add-children', {
                isAdmin: true,
                parent: mongooseToObject(parent),
            })
        })
        .catch(next);
    }

    //POST /Admin/Info/Store/Children/:id
    userStoreNewChildren(req, res, next) {
        const parentId = req.params.id
        const children = new Children({
            name: req.body.name,
            gender: req.body.gender,
            dateOfBirth: req.body.dateOfBirth,
            parent_Id: parentId,
        })
        children.save()
            .then(() => res.redirect(`/admin/user/info/${parentId}`))
            .catch(next);
    }

    //GET /Admin/User/Info/Edit/Parent/:id
    userInfoEditParent(req, res, next) {
        Parent.findById(req.params.id)
            .then((parent) =>{
                res.render('admin/user-info-update-parent',{
                    isAdmin: true,
                    parent: mongooseToObject(parent),
                })
            })
            .catch(next)           
    }

    //PUT /Admin/User/Info/Update/Parent/:id
    userInfoUpdateParent(req, res, next){
        const parentId = req.params.id
        Parent.updateOne({ _id: parentId},req.body)
            .then(() => res.redirect(`/admin/user/info/${parentId}`))
            .catch(next);
    }

    //GET /Admin/User/Info/Edit/Children/:id
    userInfoEditChildren(req, res, next) {
        const childrenId = req.params.id
        const parent = req.session.parent
        Children.findById(childrenId)
            .then((children) => {
                res.render('admin/user-info-update-children',{
                    isAdmin: true,
                    parent: parent,
                    children: mongooseToObject(children),
                })
            })
            .catch(next);
    }

    //PUT /Admin/User/Info/Update/Children/:id
    userInfoUpdateChildren(req, res, next) {
        const childrentId = req.params.id
        const parentId = req.session.parent._id
    
        Children.updateOne({ _id: childrentId}, req.body)
            .then(() => res.redirect(`/admin/user/info/${parentId}`))
            .catch(next);
    }

    //GET /Admin/User/Info/Parent/Medical/:id
    userInfoParentMedical(req, res, next) {
        const parentId = req.session.parent._id
        Parent.findById(parentId)
        .then((parent) =>{
            parent = mongooseToObject(parent)
            Register.find({user_Id: parent.user_Id, name: parent.name, status: "Hoàn Thành" })
                .then((registers) =>{
                        res.render('admin/user-info-parent-medical',{
                            isAdmin: true,
                            parent: parent,
                            registers: mutipleMongooseToObject(registers),
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }

    //GET /Admin/User/Info/Children/Medical/:id
    userInfoChildrenMedical(req, res, next) {
        const parent = req.session.parent
        Children.findById(req.params.id)
            .then((children) =>{
                children = mongooseToObject(children)
                Register.find({user_Id: parent.user_Id, name: children.name, status: "Hoàn Thành" })
                .then((registers) =>{
                        res.render('admin/user-info-children-medical',{
                            isAdmin: true,
                            parent: parent,
                            children: children,
                            registers: mutipleMongooseToObject(registers),
                        })
                    })
                    .catch(next)
            })
            .catch(next)
    }
    userInfoMedicalUpdate(req, res) {
        res.render('admin/user-info-medical-update',{isAdmin: true});
    }
}
module.exports = new AdminUserController();
