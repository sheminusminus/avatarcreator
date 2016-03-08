var path = require('path');
module.exports = {
    entry: './app/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            { 
	            test: path.join(__dirname, 'app'),
				loader: 'babel-loader',
				query:
			    {
			    	presets:['es2015', 'react']
			    }
			}
        ]
    }
};
