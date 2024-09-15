const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');

const { mutipleMongooseToObject } = require('../../../util/mongoose');
class UserRegisterController {
    
    //GET /User/Register
    register(req, res, next) {
        const userId = req.session.user._id
        Register.find({user_Id: userId})
            .then((registers) => {
                res.render('user/register', {
                    isUser: true,
                    registers: mutipleMongooseToObject(registers),
                });
            })
            .catch(next);
    }
    //DELETE /User/Register/:id
    registerDelete(req, res, next) {
        Register.delete({ _id: req.params.id })
            .then(() => res.redirect('/user/register'))
            .catch(next);
    }

    //GET /User/Register/Injection/Form
    registerInjection(req, res, next) {
        const data = JSON.parse(JSON.stringify(req.session));
        let persons = data.children || []
        persons.push(data.parent)
        Injection.find({})
            .then((injections) => {
                res.render('user/register-injection',{
                    isUser: true,
                    persons: persons,
                    injections: mutipleMongooseToObject(injections)
                });

            })
            .catch(next)
    }

    //POST /User/Register/Injection/Submit
    registerInjectionSubmit(req, res, next){
        const data = JSON.parse(JSON.stringify(req.session));
        let persons = data.children || []
        persons.push(data.parent)
        let index
        for(let i = 0; i< persons.length; i++){
            if(persons[i].name == req.body.name){
                index = i;
            }
        }
        const register = new Register({
            name: req.body.name,
            dateOfBirth:  persons[index].dateOfBirth,
            time: req.body.time,
            date: req.body.date,
            option: "Tiêm Chủng",
            gender: persons[index].gender,
            user_Id: req.session.user._id,
            status: "Chờ Duyệt",
            nameVaccine: req.body.nameVaccine,
        })
        register.save()
            .then(() => res.redirect('/user/register'))
            .catch(next)
    }

    //GET /User/Register/SeeADoctor/Form
    registerDoctor(req, res) {
        const data = JSON.parse(JSON.stringify(req.session));
        let persons = data.children || []
        persons.push(data.parent)
        res.render('user/register-doctor',{
            isUser: true,
            persons: persons,
        });
    }
    //POST /User/Register/SeeADoctor/Submit
    registerDoctorSubmit(req, res, next){
        const data = JSON.parse(JSON.stringify(req.session));
        let persons = data.children || []
        persons.push(data.parent)
        let index
        for(let i = 0; i< persons.length; i++){
            if(persons[i].name == req.body.name){
                index = i;
            }
        }
        const register = new Register({
            name: req.body.name,
            dateOfBirth:  persons[index].dateOfBirth,
            time: req.body.time,
            date: req.body.date,
            option: "Khám Bệnh",
            gender: persons[index].gender,
            user_Id: req.session.user._id,
            status: "Chờ Duyệt",
            description: req.body.description,
        })
      
        register.save()
            .then(() => res.redirect('/user/register'))
            .catch(next)
    }

}
module.exports = new UserRegisterController();
