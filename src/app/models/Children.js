const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);
const Children = new Schema(
    {
        name: { type: String},
        gender: { type: String},
        dateOfBirth: { type: String},
        parent_Id: { type: String, maxLength: 255 },
    },
    {
        timestamps: true,
    },
);

//Custom query helpers
Children.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//Add Plugin
Children.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Children', Children);
