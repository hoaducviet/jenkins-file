const User = require('../../models/User');
const Parent = require('../../models/Parent');
const Children = require('../../models/Children');
const Register = require('../../models/Register');
const { mutipleMongooseToObject } = require('../../../util/mongoose');
class AdminChartController {
    
    // GET /Admin/Chart
    chart(req, res, next) {
        Promise.all([
            Parent.countDocuments({}),
            Parent.find({}),
            Children.countDocuments({}),
            Children.find({}),
            Register.countDocuments({option: "Tiêm Chủng", status: "Hoàn Thành"}),
            Register.find({option: "Tiêm Chủng", status: "Hoàn Thành"}),
            Register.countDocuments({option: "Khám Bệnh", status: "Hoàn Thành"}),
            Register.find({option: "Khám Bệnh", status: "Hoàn Thành"}),
        ])
            .then(([countParent, parents, countChildren, childrens, countInjection, injections, countSeeADoctor, seeadoctors])=>{
                res.render('admin/chart',{
                    isAdmin: true,
                    countParent: countParent,
                    countChildren: countChildren,
                    countInjection: countInjection,
                    countSeeADoctor: countSeeADoctor,
                    parents: mutipleMongooseToObject(parents),
                    childrens: mutipleMongooseToObject(childrens),
                    injections: mutipleMongooseToObject(injections),
                    seeadoctors: mutipleMongooseToObject(seeadoctors),
                })
            })
            .catch(next)
    }
}
module.exports = new AdminChartController();
