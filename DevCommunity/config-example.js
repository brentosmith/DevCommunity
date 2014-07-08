﻿exports.contact = {
    email: 'put_contact_email_address_here',
    name: 'Not Configured'
};

exports.nav = {
    name: 'Developer Community',
    // Bootstrap glyphicon
    glyph: 'glyphicon-none'
};

exports.mail = {
    smtp: {
        host: "smtp.gmail.com",
        secureConnection: true,
        port: 465,
        auth: {
            user: "user_name",
            pass: "password"
        }
    },
    from: "from_email_address",
};

exports.server = {
    port: 3000,
    sendEmails: false,  // if false emails won't actually be sent and information will be printed to the console instead
    domain: 'http://mydomain.com',
    admin: 'admin@emailaddress.com',
    jwtSecret: 'mySuperSecret',
    sendEmailToAuthor: false
};

exports.disqus = {
    enabled: false,
    shortname: 'EnterShortnameHere'
};