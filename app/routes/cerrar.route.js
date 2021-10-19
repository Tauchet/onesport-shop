const express = require("express");
const router = express.Router();

router.get("*", function (request, response) {
    if (request.session.usuario) {
        request.session.destroy();
    }
    response.redirect("/");
});

module.exports = router;
