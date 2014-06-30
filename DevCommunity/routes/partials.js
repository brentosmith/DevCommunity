﻿var config = require('../config.js');
var jwt = require('jsonwebtoken');

function isAdmin(req) {
    if (req.headers.authorization)
        return config.server.admin == jwt.decode(req.headers.authorization.substr(7)).email;
    else
        return false;
}

function index(req, res) {
    res.render('index', { pathToAssets: 'public', config: config.nav, admin: isAdmin(req) });
}
exports.index = index;
;
function home(req, res) {
    res.render('partials/home');
}
exports.home = home;
;

function about(req, res) {
    res.render('partials/about');
}
exports.about = about;
;

function contact(req, res) {
    res.render('partials/contact', { contact: config.contact });
}
exports.contact = contact;
;

function brainstorming(req, res) {
    res.render('partials/brainstorming');
}
exports.brainstorming = brainstorming;
;

function pastMeetings(req, res) {
    res.render('partials/pastMeetings');
}
exports.pastMeetings = pastMeetings;
;

function stories(req, res) {
    res.render('partials/stories');
}
exports.stories = stories;
;

function UserSettings(req, res) {
    res.render('partials/UserSettings');
}
exports.UserSettings = UserSettings;
;

function meeting(req, res) {
    res.render('partials/meeting');
}
exports.meeting = meeting;
;

function admin(req, res) {
    res.render('partials/admin', { admin: isAdmin(req) });
}
exports.admin = admin;
;
//# sourceMappingURL=partials.js.map
