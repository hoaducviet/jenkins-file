const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');
const { mutipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
class AdminHomeController {

    home(req, res, next) {

        Promise.all([
            Register.countDocuments({ option: "Tiêm Chủng", status:"Chờ Duyệt"}),
            Register.countDocuments({option: "Khám Bệnh", status:"Chờ Duyệt"}),
            Register.find({status: "Chấp Nhận"})
        ])
            .then(([countInjection, countSeeADoctor, registers])=> {
                res.render('admin/home',{
                    isAdmin: true,
                    registers: mutipleMongooseToObject(registers),
                    countInjection: countInjection,
                    countSeeADoctor: countSeeADoctor,

                });
            })
            .catch(next)
    }
    //DELETE /User/Register/:id
    homeDelete(req, res, next) {
        Register.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/home'))
            .catch(next);
    }
    
    resultInjection(req, res, next){
        const registerId = req.params.id
        Register.findById(registerId)
            .then((register) => {
                res.render('admin/home-result-injection',{
                    isAdmin: true,
                    register: mongooseToObject(register),
                })
            })
            .catch(next)
    }

    storeResultInjection(req, res, next){
        Register.updateOne({ _id: req.params.id },{
            status: "Hoàn Thành",
            indication: req.body.indication,
            symptom: req.body.symptom,
        })
            .then(() => res.redirect('/admin/home'))
            .catch(next);
      
    }


    resultDoctor(req, res, next){
        const registerId = req.params.id
        Register.findById(registerId)
            .then((register) => {
                res.render('admin/home-result-doctor',{
                    isAdmin: true,
                    register: mongooseToObject(register),
                })
            })
            .catch(next)

    }
    storeResultDoctor(req, res, next){
        Register.updateOne({ _id: req.params.id },{
            status: "Hoàn Thành",
            resultSeeADoctor: req.body.resultSeeADoctor,
        })
            .then(() => res.redirect('/admin/home'))
            .catch(next);

    }
}
module.exports = new AdminHomeController();
