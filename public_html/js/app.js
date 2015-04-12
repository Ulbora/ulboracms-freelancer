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
                    templateUrl: 'partials/header.html',
                    controller: 'ArticleListCtrl'
                }).when('/portfolio', {
                    templateUrl: 'partials/portfolio.html',
                    controller: 'ArticleListCtrl'
                }).when('/about', {
                    templateUrl: 'partials/about.html',
                    controller: 'ArticleListCtrl'
                }).when('/contact', {
                    templateUrl: 'partials/contact.html',
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



