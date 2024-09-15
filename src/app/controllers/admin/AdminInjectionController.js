const User = require('../../models/User');
const Injection = require('../../models/Injection');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');

const { mutipleMongooseToObject } = require('../../../util/mongoose');
const { mongooseToObject } = require('../../../util/mongoose');

class AdminInjectionController {


    // GET /Admin/Injection/List
    injection(req, res, next) {
        Injection.find({})
            .then((Injections) => {
                res.render('admin/injection', {
                    isAdmin: true,
                    Injections: mutipleMongooseToObject(Injections),
                });
            })
            .catch(next);

            
    }
    //GET /Admin/Injection/FormAdd
    injectionAdd(req, res) {
        res.render('admin/injection-add',{isAdmin: true});
    }


    //POST /Admin/Injection/Stored
    injectionStore(req, res, next) {
        const injection = new Injection(req.body);
        injection.save()
            .then(() => res.redirect('/admin/injection'))
            .catch(next);
    }

    //DELETE soft /Admin/Injection/:id
    injectionDelete(req, res, next) {
        Injection.delete({ _id: req.params.id })
            .then(() => res.redirect('/admin/injection'))
            .catch(next);
    }
   

    //GET /Admin/Injection/Info/:id
    injectionInfo(req, res, next) {
        Injection.findById(req.params.id)
        .then((injection) =>
            res.render('admin/injection-info', {
                isAdmin: true,
                injection: mongooseToObject(injection),
            }),
        )
        .catch(next);
    }

    //GET /Admin/Injection/Edit/:id
    injectionEdit(req, res, next) {
        Injection.findById(req.params.id)
            .then((injection) =>
                res.render('admin/injection-edit', {
                    idAdmin: true,
                    injection: mongooseToObject(injection),
                }),
            )
            .catch(next);
    }

    //PUT /Admin/Injection/Update/:id
    injectionUpdate(req, res, next) {
        Injection.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/admin/injection'))
            .catch(next);
    }
}
module.exports = new AdminInjectionController();
