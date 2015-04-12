'use strict';

/* Controllers */

var ulboraCmsControllers = angular.module('ulboraCmsControllers', []);

ulboraCmsControllers.controller('ArticleListCtrl', ['$scope', '$location', 'Content', 'ContentUlboraSite', '$sce',
    function ArticleListCtrl($scope, $location, Content, ContentUlboraSite, $sce) {
        $scope.showContent = false;
        $scope.useUlboraSite = false;
        $scope.showView = "view-hidden";
        //var h = angular.element(document.querySelector('.navbar-fixed-top'));
        setAngularJsHeaders(document);
        var path = $location.path();
        if (path.indexOf("portfolio") > -1 || path.indexOf("about") > -1 || path.indexOf("contact") > -1) {
            $scope.scrink = "navbar-shrink";
        } else {
            $scope.scrink = "";
        }
        var postData = {
            "frontPage": false,
            "links": false,
            "articles": true,
            "products": false,
            "searchFilter": [
                {
                    "sectionName": "TemplatesPages",
                    "categoryName": "FreelanceHead"
                },
                {
                    "sectionName": "TemplatesPages",
                    "categoryName": "FreelancePortfolio"
                },
                {
                    "sectionName": "TemplatesPages",
                    "categoryName": "FreelanceAbout"
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

                    for (var cnt = 0; cnt < response.articleLocations.Center.length; cnt++) {
                        var art = response.articleLocations.Center[cnt];
                        if (art.category.name === "FreelanceHead") {
                            art.articleText.text = atob(art.articleText.text);
                            art.articleText.text = art.articleText.text.replace("..", 'http://www.ulboracms.org');
                            art.articleText.text = $sce.trustAsHtml(art.articleText.text);
                            $scope.headArt = art;
                        } else if (art.category.name === "FreelanceAbout") {
                            art.articleText.text = atob(art.articleText.text);
                            art.articleText.text = art.articleText.text.replace("..", 'http://www.ulboracms.org');
                            art.articleText.text = $sce.trustAsHtml(art.articleText.text);
                            $scope.headAbout = art;
                        }
                    }
                    var prodList = [];
                    for (var cnt = 0; cnt < response.articleLocations.FreelancerProds.length; cnt++) {
                        var art = response.articleLocations.FreelancerProds[cnt];
                        art.articleText.text = atob(art.articleText.text);
                        art.articleText.text = art.articleText.text.replace("..", 'http://www.ulboracms.org');
                        art.articleText.text = $sce.trustAsHtml(art.articleText.text);
                        prodList.push(art);
                    }
                    $scope.prodList = prodList;
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
                    $scope.showView = "";

                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                    //$location.path('/loginFailedForm');
                }
        );





    }]);




ulboraCmsControllers.controller('ArticleCtrl', ['$scope', '$location', '$routeParams', 'Article',  '$sce',
    function ArticleCtrl($scope, $location, $routeParams, Article,  $sce) {
        $scope.useUlboraSite = false;
        $scope.scrink = "navbar-shrink";  
        $scope.showView = "view-hidden";

        var articleId = $routeParams.id;
        
        Article.get({id: articleId},
        function success(response) {
            //alert($scope.challenge.question);
            console.log("Success:" + JSON.stringify(response));



            var result = "";

            result = atob(response.articleText.text);
            result = result.replace("..", 'http://www.ulboracms.org');

            $scope.articleHtml = $sce.trustAsHtml(result);

            console.log(result);//+ JSON.stringify(errorResponse));
            $scope.article = response;



            $scope.showContent = true;
            $scope.showView = "";

        },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
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



