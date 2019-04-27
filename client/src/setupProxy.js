const proxy = require("http-proxy-middleware");

module.exports = function(app) {
	app.use(
		proxy("/api/**", {
			target: "http://localhost:9000",
			changeOrigin: true
		})
	); //double asterisk for all directories. single one is only immediate next directory.
	app.use(
		proxy("/auth/**", {
			target: "http://localhost:9000",
			changeOrigin: true
		})
	);
};
