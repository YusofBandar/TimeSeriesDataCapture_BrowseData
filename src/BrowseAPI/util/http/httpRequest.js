'use strict'
const errorApi = require('../error/error');

var https = require('https');
exports.httpRequest = function (options) {
    return new Promise(function (resolve, reject) {
     
        var result = ''
        var request = https.request(options, function (res) {

            res.on('data', function (chunk) {
                result += chunk
            });

            res.on('end', function () {
            
                console.log(res.statusCode);
                if(res.statusCode >= 100 && res.statusCode < 400){
                    console.log('http request success, statusCode: ', res.statusCode);
                    resolve(result);
                }else{
                    var error;
                    console.log(result);
                    if(res.statusCode === 400){
                        error = errorApi.create400Error('Bad Request');
                    }else if(res.statusCode === 401){
                        error = errorApi.create401Error('Un-authorized');
                    }else if(res.statusCode === 403){
                        error = errorApi.create403Error('Forbidden');
                    }else{
                        error = errorApi.create500Error('Error');
                    }
                    reject(error); 
                }
                
            });
        });

        request.on('error', function (error) {
            console.log('http requst error ', error);
            reject(errorApi.create500Error(error));
        });

        request.on('timeout', function(error){
            console.log('http request time-out ', error);
            reject(errorApi.create500Error(error));
        })

        request.end();
    });
}