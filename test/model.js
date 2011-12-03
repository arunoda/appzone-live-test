var Mongotest = require('mongotest');
var mongo = new Mongotest();

var Model = require('model');

exports.testRegisterAppCode = function(test) {

    mongo.isStarted(mongo.ensureDeleted("aaa", mongo.ensureDeleted("bbb", function() {

        var appCollection = mongo.db.collection('app');
        var phoneCollection = mongo.db.collection('phone');
        var model = new Model(appCollection, phoneCollection);

        model.registerAppCode('code', 'url', function(err) {
            
            test.ok(!err);
            appCollection.findOne(function(err, item) {
                test.ok(!err);
                test.deepEqual({_id: 'code' ,url: 'url'}, item);
                test.done(); 
            });
        });

    })), function() {
        console.log('mongo is not started');
        test.done();
    });
};