'use strict';

/* Services */

var ulboraCmsServices = angular.module('ulboraCmsServices', ['ngResource', 'ngCookies']);

ulboraCmsServices.factory('Content', ['$resource',
    function ($resource) {
        return $resource("http://www.ulboracms.org/rs/content", {}, {
            getContent: {method: 'POST', cache: false, isArray: false}
        });
    }]);

ulboraCmsServices.factory('Article', ['$resource',
    function ($resource) {
        return $resource("http://www.ulboracms.org/rs/content/article/:id", {}, {
            get: {method: 'GET', cache: false, isArray: false}
        });
    }]);


//default ulbora cms site services
ulboraCmsServices.factory('ContentUlboraSite', ['$resource', 
    function($resource) {
        return $resource("http://www.ulboracms.org/rs/content", {}, {
            getContent: {method: 'POST', cache : false, isArray: false}
        });
    }]);

ulboraCmsServices.factory('ArticleUlboraSite', ['$resource', 
    function($resource) {
        return $resource("http://www.ulboracms.org/rs/content/article/:id", {}, {
            get: {method: 'GET', cache : false, isArray: false}            
        });
    }]);