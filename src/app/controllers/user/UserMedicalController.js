const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');

const { mutipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
class AdminMedicalController {
    // GET /me/stored/couses

    medical(req, res, next) {
        const parent = req.session.parent
        const childrens = req.session.children
        res.render('user/medical',{
            isUser: true,
            parent: parent,
            childrens: childrens,
        });
    }
    medicalInfoParent(req, res, next) {
        const user = req.session.user
        const parent = req.session.parent
        Register.find({user_Id: user._id, name: parent.name, status: "Hoàn Thành"})
            .then((registers) =>{
                res.render('user/medical-info-parent',{
                    isUser: true,
                    parent: parent,
                    registers: mutipleMongooseToObject(registers)
                });         
            })
            .catch(next)
       
    }
    medicalInfoChildren(req, res, next) {
        const user = req.session.user
        const childrenId = req.params.id
        Children.findById(childrenId)
            .then((children) =>{
                children = mongooseToObject(children)
                Register.find({user_Id: user._id, name: children.name, status: "Hoàn Thành"})
                    .then((registers) =>{
                        res.render('user/medical-info-children',{
                            isUser: true,
                            children: children,
                            registers: mutipleMongooseToObject(registers)
                        });         
                    })
                    .catch(next)
            })
            .catch(next)
    }


    medicalInfoUpdate(req, res) {
        res.render('user/medical-info-update',{
            isUser: true,
        });
    }

}
module.exports = new AdminMedicalController();
