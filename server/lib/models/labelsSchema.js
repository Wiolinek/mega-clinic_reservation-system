const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const labelsSchema = new Schema ({
    buttons: Object,
    doctor: Object,
    doctorAccount: Object,
    errorPage: Object,
    filters: Object,
    form: Object,
    homePage: Object,
    loginPage: Object,
    logoutPage: Object,
    menu: Object,
    personalData: Object,
    placeholders: Object,
    redirects: Object,
    successForm: Object,
});

module.exports = mongoose.model('Labels', labelsSchema);