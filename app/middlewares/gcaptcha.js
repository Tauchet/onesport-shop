const requestModule = require('request');

module.exports = function (request, response, next) {
    if (request.body['g-recaptcha-response'] === undefined || request.body['g-recaptcha-response'] === '' || request.body['g-recaptcha-response'] === null) {
        request.captcha = false;
        next();
    } else {
        // Put your secret key here.
        var secretKey = "6Ld-ciUdAAAAAOEYBMgqvc2FRe8Ak8tIRghVGhmR";
        // req.connection.remoteAddress will provide IP address of connected user.
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + request.body['g-recaptcha-response'] + "&remoteip=" + request.connection.remoteAddress;
        // Hitting GET request to the URL, Google will respond with success or error scenario.
        requestModule(verificationUrl,function(error,response,body) {
            body = JSON.parse(body);
            if(body.success !== undefined && !body.success) {
                request.captcha = false;
            } else {
                request.captcha = true;
            }
            next();
        });
    }
   
};
