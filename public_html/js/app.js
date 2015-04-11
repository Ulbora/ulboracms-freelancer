'use strict';

/* App Module */

var templateApp = angular.module('templateApp', [
    'ngRoute',
    'ulboraCmsControllers',
    'ulboraCmsServices'
]);


templateApp.config(['$routeProvider', '$locationProvider',
    function ($routeProvider, $locationProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'ArticleListCtrl'
                }).when('/article/:id', {
                    templateUrl: 'partials/article.html',
                    controller: 'ArticleCtrl'
                }).when('/articleSite/:a', {
                    templateUrl: 'partials/article.html',
                    controller: 'ArticleSiteCtrl'
                });

        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);



