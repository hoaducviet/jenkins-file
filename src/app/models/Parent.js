const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);

const Parent = new Schema(
    {
        name: { type: String, },
        address: { type: String},
        dateOfBirth: { type: String},
        email: { type: String, maxLength: 255 },
        gender: { type: String},
        phone: { type: String},
        user_Id: {type: String},
        slug: { type: String, slug: 'name' },
    },
    {
        timestamps: true,
    },
);

//Custom query helpers
Parent.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//Add Plugin
Parent.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Parent', Parent);
