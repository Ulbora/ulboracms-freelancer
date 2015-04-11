'use strict';

/* Controllers */

var ulboraCmsControllers = angular.module('ulboraCmsControllers', []);

ulboraCmsControllers.controller('ArticleListCtrl', ['$scope', '$location', 'Content', 'ContentUlboraSite', '$sce',
    function ArticleListCtrl($scope, $location, Content, ContentUlboraSite, $sce) {         
        $scope.showContent = false;
        $scope.useUlboraSite = false;  
        //var h = angular.element(document.querySelector('.navbar-fixed-top'));
        setAngularJsHeaders(document);
        /*
        var postData = {
            "frontPage": true,
            "links": true,
            "articles": true,
            "products": true,
            "searchFilter": [
                {
                    "sectionName": "MainPage",
                    "categoryName": null
                },
                {
                    "sectionName": "Tech",
                    "categoryName": null
                },
                {
                    "sectionName": "About",
                    "categoryName": null
                },
                {
                    "sectionName": "Menu",
                    "categoryName": null
                }
            ]

        };
        var contentLen = 0;
        console.log("json request:" + JSON.stringify(postData));
        Content.getContent({}, postData,
                function success(response) {
                    //alert($scope.challenge.question);
                    console.log("Success:" + JSON.stringify(response));
                    contentLen = response.articleLocations.FrontPage.length;
                    $scope.content = response;
                    if (response.links !== null && response.links.length > 0) {
                        $scope.showLinks = true;
                    } else {
                        $scope.showLinks = false;
                    }

                    if (response.articleLocations.Left.length > 0) {
                        $scope.showNewsFlash = true;
                    } else {
                        $scope.showNewsFlash = false;
                    }

                    if (response.articleLocations.Right.length > 0) {
                        $scope.showNews = true;
                    } else {
                        $scope.showNews = false;
                    }

                    for (var cnt = 0; cnt < response.articleLocations.FrontPage.length; cnt++) {
                        $scope.content.articleLocations.FrontPage[cnt].articleText.text = $sce.trustAsHtml(atob(response.articleLocations.FrontPage[cnt].articleText.text));

                    }
                    $scope.showContent = true;
                    console.log("Html:");
                    console.log(JSON.stringify($scope.content));

                    if (contentLen === 0) {
                        console.log("content count" + contentLen);
                        ContentUlboraSite.getContent({}, postData,
                                function success(response) {
                                    $scope.useUlboraSite = true;
                                    //alert($scope.challenge.question);
                                    console.log("Success:" + JSON.stringify(response));
                                    contentLen = response.articleLocations.FrontPage.length;
                                    $scope.content = response;
                                    if (response.links !== null && response.links.length > 0) {
                                        $scope.showLinks = true;
                                    } else {
                                        $scope.showLinks = false;
                                    }

                                    if (response.articleLocations.Left.length > 0) {
                                        $scope.showNewsFlash = true;
                                    } else {
                                        $scope.showNewsFlash = false;
                                    }

                                    if (response.articleLocations.Right.length > 0) {
                                        $scope.showNews = true;
                                    } else {
                                        $scope.showNews = false;
                                    }

                                    for (var cnt = 0; cnt < response.articleLocations.FrontPage.length; cnt++) {
                                        $scope.content.articleLocations.FrontPage[cnt].articleText.text = $sce.trustAsHtml(atob(response.articleLocations.FrontPage[cnt].articleText.text));

                                    }
                                    $scope.showContent = true;
                                    console.log("Html:");
                                    console.log(JSON.stringify($scope.content));


                                },
                                function error(errorResponse) {
                                    console.log("Error:" + JSON.stringify(errorResponse));
                                    //$location.path('/loginFailedForm');
                                }
                        );
                    }


                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    //$location.path('/loginFailedForm');
                }
        );

        */

        

    }]);



ulboraCmsControllers.controller('ArticleCtrl', ['$scope', '$location', '$routeParams', 'Article', 'Content', '$sce',
    function ArticleCtrl($scope, $location, $routeParams, Article, Content, $sce) {
        $scope.useUlboraSite = false;
        if (checkCreds() === true) {
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
        $scope.showComments = false;
        $scope.showCommentLoginRequied = false;
        $scope.showContent = false;
        $scope.showTags = false;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();

        var articleId = $routeParams.a;
        $scope.menuLinkName = $routeParams.name;
        Article.get({id: articleId},
        function success(response) {
            //alert($scope.challenge.question);
            console.log("Success:" + JSON.stringify(response));

            if (response.allowComments && (!response.commentsRequireLogin || $scope.loggedIn)) {
                $scope.showComments = true;
            }

            if (response.allowComments && !$scope.loggedIn) {
                $scope.showCommentLoginRequied = true;
            }
            if (response.tag !== undefined) {
                $scope.showTags = true;
            }


            var result = "";

            result = atob(response.articleText.text);


            $scope.articleHtml = $sce.trustAsHtml(result);

            console.log(result);//+ JSON.stringify(errorResponse));
            $scope.article = response;


            var cDate = new Date(response.createdDate);
            $scope.createDate = cDate.getMonth() + "/" + cDate.getDate() + "/" + cDate.getFullYear();

            var modDate = response.modifiedDate;
            if (modDate !== null) {
                var mDate = new Date(modDate);
                $scope.modifiedDate = mDate.getMonth() + "/" + mDate.getDate() + "/" + mDate.getFullYear();

            }

            $scope.showContent = true;


        },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
        );

        var postData = {
            "frontPage": false,
            "links": true,
            "articles": true,
            "products": false,
            "searchFilter": [
                {
                    "sectionName": "Menu",
                    "categoryName": null
                }
            ]

        };
        Content.getContent({}, postData,
                function success(response) {
                    //alert($scope.challenge.question);
                    console.log("Success:" + JSON.stringify(response));

                    $scope.content = response;
                    if (response.links !== null && response.links.length > 0) {
                        $scope.showLinks = true;
                    } else {
                        $scope.showLinks = false;
                    }

                    if (response.articleLocations.Left.length > 0) {
                        $scope.showNewsFlash = true;
                    } else {
                        $scope.showNewsFlash = false;
                    }

                    if (response.articleLocations.Right.length > 0) {
                        $scope.showNews = true;
                    } else {
                        $scope.showNews = false;
                    }

                    for (var cnt = 0; cnt < response.articleLocations.FrontPage.length; cnt++) {
                        $scope.content.articleLocations.FrontPage[cnt].articleText.text = $sce.trustAsHtml(atob(response.articleLocations.FrontPage[cnt].articleText.text));

                    }
                    console.log("Html:");
                    console.log(JSON.stringify($scope.content));


                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    //$location.path('/loginFailedForm');
                }
        );


        //$scope.newsActiveClass = "active";

    }]);







ulboraCmsControllers.controller('ArticleSiteCtrl', ['$scope', '$location', '$routeParams', 'ArticleUlboraSite', 'ContentUlboraSite', '$sce',
    function ArticleSiteCtrl($scope, $location, $routeParams, ArticleUlboraSite, ContentUlboraSite, $sce) {
        $scope.useUlboraSite = true;
        if (checkCreds() === true) {
            $scope.loggedIn = true;
        } else {
            $scope.loggedIn = false;
        }
        $scope.showComments = false;
        $scope.showCommentLoginRequied = false;
        $scope.showContent = false;
        $scope.showTags = false;
        $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();

        var articleId = $routeParams.a;
        $scope.menuLinkName = $routeParams.name;
        ArticleUlboraSite.get({id: articleId},
        function success(response) {
            //alert($scope.challenge.question);
            console.log("Success:" + JSON.stringify(response));

            if (response.allowComments && (!response.commentsRequireLogin || $scope.loggedIn)) {
                $scope.showComments = true;
            }

            if (response.allowComments && !$scope.loggedIn) {
                $scope.showCommentLoginRequied = true;
            }
            if (response.tag !== undefined) {
                $scope.showTags = true;
            }


            var result = "";

            result = atob(response.articleText.text);
            result = result.replace("..", 'http://www.ulboracms.org');
            result = result.replace("..", 'http://www.ulboracms.org');
            result = result.replace("..", 'http://www.ulboracms.org');
            result = result.replace("..", 'http://www.ulboracms.org');
            result = result.replace("..", 'http://www.ulboracms.org');
            result = result.replace("..", 'http://www.ulboracms.org');
            result = result.replace("..", 'http://www.ulboracms.org');
            result = result.replace("..", 'http://www.ulboracms.org');

            $scope.articleHtml = $sce.trustAsHtml(result);

            console.log(result);//+ JSON.stringify(errorResponse));
            $scope.article = response;


            var cDate = new Date(response.createdDate);
            $scope.createDate = cDate.getMonth() + "/" + cDate.getDate() + "/" + cDate.getFullYear();

            var modDate = response.modifiedDate;
            if (modDate !== null) {
                var mDate = new Date(modDate);
                $scope.modifiedDate = mDate.getMonth() + "/" + mDate.getDate() + "/" + mDate.getFullYear();

            }

            $scope.showContent = true;


        },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
        );

        var postData = {
            "frontPage": false,
            "links": true,
            "articles": true,
            "products": false,
            "searchFilter": [
                {
                    "sectionName": "Menu",
                    "categoryName": null
                }
            ]

        };
        ContentUlboraSite.getContent({}, postData,
                function success(response) {
                    //alert($scope.challenge.question);
                    console.log("Success:" + JSON.stringify(response));

                    $scope.content = response;
                    if (response.links !== null && response.links.length > 0) {
                        $scope.showLinks = true;
                    } else {
                        $scope.showLinks = false;
                    }

                    if (response.articleLocations.Left.length > 0) {
                        $scope.showNewsFlash = true;
                    } else {
                        $scope.showNewsFlash = false;
                    }

                    if (response.articleLocations.Right.length > 0) {
                        $scope.showNews = true;
                    } else {
                        $scope.showNews = false;
                    }

                    for (var cnt = 0; cnt < response.articleLocations.FrontPage.length; cnt++) {
                        $scope.content.articleLocations.FrontPage[cnt].articleText.text = $sce.trustAsHtml(atob(response.articleLocations.FrontPage[cnt].articleText.text));

                    }
                    console.log("Html:");
                    console.log(JSON.stringify($scope.content));


                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    //$location.path('/loginFailedForm');
                }
        );


        //$scope.newsActiveClass = "active";

    }]);



