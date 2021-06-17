const path = require('path');
const webpack = require('webpack');

module.exports={
    entry:'./public/js/app.js', // definimos el archivos de entrada,
    output:{
        filename: 'blundle.js',
        path: path.resolve(__dirname, './public/dist'),     
        //path: path.join(__dirname, './public/dist')     
    },
    module:{
        rules:[
            {
                //js
                test:/\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }
            }
        ]
    }

};