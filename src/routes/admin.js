const express = require('express');
const router = express.Router();
const adminHomeController = require('../app/controllers/admin/AdminHomeController');
const adminRegisterController = require('../app/controllers/admin/AdminRegisterController');
const adminChartController = require('../app/controllers/admin/AdminChartController');
const adminUserController = require('../app/controllers/admin/AdminUserController');
const adminInjectionController = require('../app/controllers/admin/AdminInjectionController');

router.get('/home', adminHomeController.home);
router.delete('/home/delete/:id', adminHomeController.homeDelete);
router.get('/home/result/injection/:id', adminHomeController.resultInjection);
router.put('/home/result/injection/store/:id', adminHomeController.storeResultInjection);
router.get('/home/result/doctor/:id', adminHomeController.resultDoctor);
router.put('/home/result/doctor/store/:id', adminHomeController.storeResultDoctor);


router.get('/register', adminRegisterController.register);
router.delete('/register/delete/:id', adminRegisterController.registerDelete);
router.get('/register/injection/:id', adminRegisterController.registerInjection);
router.get('/register/seeadoctor/:id', adminRegisterController.registerSeeADoctor);
router.put('/register/confirm/:id', adminRegisterController.registerConfirm);





router.get('/chart', adminChartController.chart);



router.get('/user', adminUserController.userList);
router.delete('/user/delete/:id', adminUserController.userDelete);
router.get('/user/info/:id', adminUserController.userInfo);
router.get('/user/info/add/children/:id', adminUserController.userInfoAddChildren);
router.post('/user/info/store/children/:id', adminUserController.userStoreNewChildren);
router.get('/user/info/edit/parent/:id', adminUserController.userInfoEditParent);
router.put('/user/info/update/parent/:id', adminUserController.userInfoUpdateParent);
router.get('/user/info/edit/children/:id', adminUserController.userInfoEditChildren);
router.put('/user/info/update/children/:id', adminUserController.userInfoUpdateChildren);
router.delete('/user/info/children/delete/:id', adminUserController.userChildrenDelete);
router.get('/user/info/parent/medical/:id', adminUserController.userInfoParentMedical);
router.get('/user/info/children/medical/:id', adminUserController.userInfoChildrenMedical);


router.get('/injection', adminInjectionController.injection);
router.get('/injection/add', adminInjectionController.injectionAdd);
router.post('/injection/store', adminInjectionController.injectionStore);
router.delete('/injection/:id', adminInjectionController.injectionDelete);
router.get('/injection/info/:id', adminInjectionController.injectionInfo);
router.get('/injection/edit/:id', adminInjectionController.injectionEdit);
router.put('/injection/update/:id', adminInjectionController.injectionUpdate);

module.exports = router;
