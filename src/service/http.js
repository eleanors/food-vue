import Vue from 'vue';
import {host, path} from './config'

function errHandler(error){
	    console.log(error)
}

var xhr = ({method = 'post', url, options = null}) => {
        var promise;
        switch (method) {
        case 'get':
                promise = new Promise(function (resolve, reject) {

						Vue.http.get(url, options).then(function (response) {
								resolve(response.data.body);
						}, function (response) {
								errHandler(response);
						});
				});
                return promise;
        case 'post':
                promise = new Promise(function (resolve, reject) {
						return Vue.http.post(url, options).then(function (response) {
								resolve(response.data.body);
						}, function (response) {
								errHandler(response);
						});
				});
                return promise;
        default:
                promise = new Promise(function (resolve, reject) {
						Vue.http.jsonp(url, options).then(function (response) {
								resolve(response.data.body);
						}, function (response) {
								errHandler(response);
						});
				});
                return promise;
        }
};
export default xhr;
