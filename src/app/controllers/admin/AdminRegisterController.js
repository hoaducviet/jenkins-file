const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');

class AdminRegisterController {
    // GET /me/stored/couses

    register(req, res, next) {
        Register.find({status: "Chờ Duyệt"})
        .then((registers) => {
            res.render('admin/register', {
                isAdmin: true,
                registers: mutipleMongooseToObject(registers),
            });
        })
        .catch(next);
    }
     
    //DELETE /User/Register/Delete/:id
    registerDelete(req, res, next) {
        Register.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/register'))
            .catch(next);
    }

    //GET /User/Register/Injection/:id
    registerInjection(req, res, next) {
        Register.findById(req.params.id)
            .then((register) =>
                res.render('admin/register-injection', {
                    isAdmin: true,
                    register: mongooseToObject(register),
                }),
            )
            .catch(next);
    }

    //GET /User/Register/SeeADoctor/:id
    registerSeeADoctor(req, res, next) {
        Register.findById(req.params.id)
            .then((register) =>
                res.render('admin/register-doctor', {
                    isAdmin: true,
                    register: mongooseToObject(register),
                }),
            )
            .catch(next);
    }
    registerConfirm(req, res, next) {
        
        Register.updateOne({ _id: req.params.id },{status: 'Chấp Nhận'})
            .then(() => res.redirect('/admin/register'))
            .catch(next);
    }

    


    babyProfile(req, res) {
        res.render('admin/profile-baby',{isAdmin: true});
    }
    addBabyProfile(req, res) {
        res.render('admin/profile-baby-add',{isAdmin: true});
    }
}
module.exports = new AdminRegisterController();
