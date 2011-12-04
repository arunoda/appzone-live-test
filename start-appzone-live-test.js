//loading nconf
var nconf = require('nconf');
nconf.add('file', { file: './conf/config.json' });
nconf.load();

//loading winstoon
var winstoon = require('winstoon');
winstoon.add(winstoon.transports.Console, {timestamp: true});
var logger = winstoon.createLogger('start');

//load mongo
var mongo = require('mongoskin');
var mongoConfig = nconf.get('mongo');

var appCollection = mongo.db(mongoConfig.url).collection(mongoConfig.collections.app);
var phoneCollection = mongo.db(mongoConfig.url).collection(mongoConfig.collections.phone);

//load the model
var Model = require('./lib/model');
var model = new Model(appCollection, phoneCollection);

//load Routers
var appzoneConfig = nconf.get('appzone');
var ports = nconf.get('ports');

var MtRouter = require('./lib/mtRouter');
var mtRouter = new MtRouter(appzoneConfig, ports.mt, model);

var MoRouter = require('./lib/moRouter');
var moRouter = new MoRouter(appzoneConfig, ports.mo, model);

