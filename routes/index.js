const express = require('express'),
      router  = express.Router();

router.get("/", (req, res) => {
    res.render('landing');
});

module.exports = router;