const {Schema, model} = require('mongoose');


const userScheme = new Schema({
    tgId: {
        type: Number,
        required: true
    },
    tgInfo: {
        type: Object,
        required: false,
    },
    currentStep: {
        type: String,
        default: 'start',
    }
});

module.exports = model('User', userScheme, 'user');