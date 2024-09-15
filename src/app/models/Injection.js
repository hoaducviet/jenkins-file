const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

mongoose.plugin(slug);
const Injection = new Schema(
    {
        nameVaccine: { type: String, required: true },
        description: { type: String, maxLength: 600 },
        number: { type: Number},
        object: { type: String, maxLength: 255 },
        made: { type: String, maxLength: 255 },
        date: { type: String},
        afterInjection: { type: String, maxLength: 600},
        slug: { type: String, slug: 'nameVaccine' },
    },
    {
        timestamps: true,
    },
);

//Custom query helpers
Injection.query.sortable = function (req) {
    if (req.query.hasOwnProperty('_sort')) {
        const isValidType = ['asc', 'desc'].includes(req.query.type);
        return this.sort({
            [req.query.column]: isValidType ? req.query.type : 'desc',
        });
    }
    return this;
};

//Add Plugin
Injection.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Injection', Injection);
