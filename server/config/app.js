/** app.js **/
app = { 
	//General App
	app: {
		ip:  		process.env.OPENSHIFT_NODEJS_IP 	|| '127.0.0.1',
		port: 		process.env.OPENSHIFT_NODEJS_PORT 	|| 8080,
		name: 		process.env.OPENSHIFT_APP_NAME		|| 'wiki'		
	}
}

module.exports = app; 
