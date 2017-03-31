var express = require('express');
var router = express.Router();
var async = require('async')
/* GET home page. */
router.get('/', function (req, res, next) {


    //auto 适合复杂逻辑，需要Parallel又需要waterfull
    async.auto({
        func1: function (callback) {
             console.log('in func1');
            callback(null, 'data', 'converted to array');
        },

        func2: function (callback) {
             console.log('in func2');
            callback(null, { "puncha": "during" });
        },
        func3: ["func2", function (results, callback) {
           console.log('in func3', JSON.stringify(results));
            callback(null, '3');
        }],
        func4: ["func1", "func3", function (results, callback) {
             console.log('in func4', JSON.stringify(results));
          callback(null, {'file':results.func3, 'email':'user@example.com'});
        }]
    }, function (err, results) {
        console.log('err = ', err);
        console.log('results = ', results);
    });


    res.render('index', { title: 'Express' });
});

module.exports = router;
