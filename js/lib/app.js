/*
 * @owner yianni.ververis@qlik.com
 *
 */
var me = {
	v: '1.0.7',
	obj: {
		qlik: null,
		app: null,
		angularApp: null,
		model: [],
		getObjectModel: []
	}
};

me.init = function () {
	// me.config = {
	// 	host: 'sense-demo.qlik.com',
	// 	prefix: "/",
	// 	port: 443,
	// 	isSecure: true,
	// 	id: '133dab5d-8f56-4d40-b3e0-a6b401391bde'
	// };
	me.config = {
		host: 'demoswebapps.qlik.com',
		prefix: "/",
		port: 443,
		isSecure: true,
		id: '55ec3c69-0d43-4e61-9106-23aca9233c44'
	};
	me.vars = {};
}

me.boot = function () {
	me.init();
	me.obj.app = me.obj.qlik.openApp(me.config.id, me.config);
	console.log('%c App ' + me.v + ': ', 'color: red', 'Loaded!');
};

app = me;
