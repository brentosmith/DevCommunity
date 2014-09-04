﻿/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/angularjs/angular-route.d.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../typings/readmore/readmore.d.ts" />
/// <reference path="Services.ts" />
/// <reference path="MeetingController.ts" />
/// <reference path="HomeController.ts" />
/// <reference path="StoryController.ts" />
/// <reference path="SingleStoryController.ts" />
/// <reference path="Impl/Browser.ts" />
$('.nav a').on('click', function () {
    if ($(".navbar-toggle").css('display') != 'none') {
        $(".navbar-toggle").trigger("click");
    }
});

var AddMeetingController = (function () {
    function AddMeetingController($scope, $http, meetingSvc, userSvc, rtb) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.meetingSvc = meetingSvc;
        this.userSvc = userSvc;
        this.rtb = rtb;
        this.rtb.setId('newIdeaDetails');
        $scope.meeting = meetingSvc.createMeeting();
        $scope.errorMessage = "";
        $scope.$on('editMeeting', function (event, meeting) {
            $scope.meeting = meeting;
            _this.rtb.setText(meeting.details);
            $('#AddTopicModal').modal('show');
            $scope.errorMessage = "";
        });
        $scope.$on('addMeeting', function (event) {
            $scope.meeting = meetingSvc.createMeeting();
            $('#AddTopicModal').modal('show');
            $scope.errorMessage = "";
        });
    }
    AddMeetingController.prototype.AddMeeting = function () {
        var _this = this;
        $('.add-modal-button').prop('disabled', true);
        this.$scope.meeting.SetUser(this.userSvc.getUser());
        this.$scope.meeting.details = this.rtb.getText();
        var mtgData = this.$scope.meeting.GetData();
        this.$http.post('/api/restricted/AddMeeting', mtgData).success(function (data) {
            $('#AddTopicModal').modal('hide');
            $('.add-modal-button').prop('disabled', false);
            if (data.action == "Added") {
                _this.meetingSvc.notifyMeetingAdded(data.meeting);
            }
            _this.$scope.meeting = _this.meetingSvc.createMeeting();
        }).error(function (data) {
            $('.add-modal-button').prop('disabled', false);
            _this.$scope.errorMessage = data.toString();
        });
    };
    return AddMeetingController;
})();

var StorySubmitController = (function () {
    function StorySubmitController($scope, storySvc, $http, userSvc, rtb) {
        var _this = this;
        this.$scope = $scope;
        this.storySvc = storySvc;
        this.$http = $http;
        this.userSvc = userSvc;
        this.rtb = rtb;
        $scope.story = new Story();
        this.rtb.setId("storyDetails");
        this.$scope.errorMessage = '';
        $scope.$on('editStory', function (event, story) {
            $scope.story = story;
            _this.rtb.setText(story.description);
            $('#AddStoryModal').modal('show');
            $scope.errorMessage = "";
        });
        $scope.$on('addStory', function (event) {
            $scope.story = new Story();
            _this.rtb.setText("");
            $('#AddStoryModal').modal('show');
            $scope.errorMessage = "";
        });
        $(document).ready(function () {
            $('#storyDetails').ckeditor();
        });
    }
    StorySubmitController.prototype.Submit = function () {
        var _this = this;
        $('.add-modal-button').prop('disabled', true);
        this.$scope.story.submittor = this.userSvc.getUser();
        this.$scope.story.description = this.rtb.getText();
        this.$http.post('/api/restricted/AddStory', this.$scope.story).success(function (data) {
            $('#AddStoryModal').modal('hide');
            $('.add-modal-button').prop('disabled', false);
            if (data.action == "Added") {
                _this.storySvc.notifyStoryAdded(data.story);
            }
            _this.$scope.errorMessage = '';
            _this.$scope.story = new Story();
        }).error(function (data) {
            $('.add-modal-button').prop('disabled', false);
            _this.$scope.errorMessage = data.toString();
        });
    };
    return StorySubmitController;
})();

var AdminController = (function () {
    function AdminController($scope, $http) {
        this.$scope = $scope;
        this.$http = $http;
        this.$scope.emailAddress = "";
        this.$scope.errorMessage = "";
        this.$scope.successMessage = "";
        this.$scope.tweetSuccessMessage = "";
        this.$scope.tweetErrorMessage = "";
    }
    AdminController.prototype.Submit = function () {
        var _this = this;
        this.$scope.successMessage = "";
        this.$scope.errorMessage = "";
        $('.settings-btn').prop('disabled', true);
        this.$http.post('/api/restricted/AddUser', { user: this.$scope.emailAddress }).success(function (data) {
            $('.settings-btn').prop('disabled', false);
            _this.$scope.successMessage = data.toString();
        }).error(function (data) {
            $('.settings-btn').prop('disabled', false);
            _this.$scope.errorMessage = data.toString();
        });
    };

    AdminController.prototype.AddTweet = function () {
        var _this = this;
        this.$scope.tweetSuccessMessage = "";
        this.$scope.tweetErrorMessage = "";
        $('.settings-btn').prop('disabled', true);
        this.$http.post('/api/restricted/AddTweet', { embedCode: this.$scope.tweetEmbedCode }).success(function (data) {
            $('.settings-btn').prop('disabled', false);
            _this.$scope.tweetSuccessMessage = data.toString();
            _this.$scope.tweetEmbedCode = "";
        }).error(function (data) {
            $('.settings-btn').prop('disabled', false);
            _this.$scope.tweetErrorMessage = data.toString();
        });
    };
    return AdminController;
})();

var UserSettingsController = (function () {
    function UserSettingsController($scope, $http, userSvc) {
        var _this = this;
        this.$scope = $scope;
        this.$http = $http;
        this.userSvc = userSvc;
        $('.navbar-nav li.active').removeClass('active');
        $('#NavUserSettings').addClass('active');

        this.$scope.settings = new UserSettings();
        this.$scope.errorMessage = "";
        this.$scope.successMessage = "";

        this.$http.get('/api/restricted/GetUserSettings').success(function (data) {
            if (data != "" && data != null)
                _this.$scope.settings = data;
        });
    }
    UserSettingsController.prototype.isLoggedIn = function () {
        return this.userSvc.isLoggedIn();
    };

    UserSettingsController.prototype.Submit = function () {
        var _this = this;
        $('.settings-btn').prop('disabled', true);
        this.$http.post('/api/restricted/SetUserSettings', this.$scope.settings).success(function (data) {
            $('.settings-btn').prop('disabled', false);
            _this.$scope.errorMessage = "";
            _this.$scope.successMessage = "Settings saved.";
        }).error(function (data) {
            $('.settings-btn').prop('disabled', false);
            _this.$scope.successMessage = "";
            _this.$scope.errorMessage = data.toString();
        });
    };
    return UserSettingsController;
})();

var LoginController = (function () {
    function LoginController($scope, $http, localStorageService, location) {
        this.$scope = $scope;
        this.$http = $http;
        this.localStorageService = localStorageService;
        this.location = location;
        $scope.user = { email: '', verificationCode: '' };
        $scope.message = '';
        $scope.step = 'Email';
    }
    LoginController.prototype.submitEmail = function () {
        var _this = this;
        this.$scope.user.email = this.$scope.user.email.toLowerCase();
        this.$http.post('/identify', this.$scope.user).success(function (data, status, headers, config) {
            _this.$scope.step = 'Verification';
            _this.$scope.message = "";
        }).error(function (data, status, headers, config) {
            _this.localStorageService.remove('userToken');
            _this.localStorageService.remove('userEmail');
            _this.$scope.message = data;
        });
    };

    LoginController.prototype.submitVerification = function () {
        var _this = this;
        this.$http.post('/verify', this.$scope.user).success(function (data, status, headers, config) {
            _this.localStorageService.set('userToken', data.token);
            _this.localStorageService.set('userEmail', _this.$scope.user);
            _this.close();
            _this.location.reload();
        }).error(function (data, status, headers, config) {
            _this.localStorageService.remove('userToken');
            _this.localStorageService.remove('userEmail');
            _this.$scope.message = "Invalid verification code.";
        });
    };

    LoginController.prototype.close = function () {
        $('#LoginModal').modal('hide');
        this.$scope.user = { email: '', verificationCode: '' };
        this.$scope.message = '';
        this.$scope.step = 'Email';
    };
    return LoginController;
})();

var TweetController = (function () {
    function TweetController($http) {
        this.$http = $http;
    }
    TweetController.prototype.getNewTweet = function () {
        this.$http.get('/api/GetRandomTweet').success(function (html) {
            $('#tweetHolder').html(html);
        });
    };
    return TweetController;
})();

var SiteConfig = (function () {
    function SiteConfig(localStorageServiceProvider, $locationProvider, $httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
        localStorageServiceProvider.setPrefix('PndDevCommunity');
        $locationProvider.hashPrefix('!');
    }
    return SiteConfig;
})();

var RouteConfig = (function () {
    function RouteConfig($routeProvider) {
        $routeProvider.when("/about", {
            templateUrl: 'partials/about',
            controller: 'AboutController'
        }).when("/", {
            templateUrl: 'partials/home',
            controller: 'HomeController'
        }).when("/contact", {
            templateUrl: 'partials/contact',
            controller: 'ContactController'
        }).when('/pastMeetings', {
            templateUrl: 'partials/pastMeetings',
            controller: 'PastMeetingsController'
        }).when("/stories", {
            templateUrl: 'partials/stories',
            controller: 'StoryController'
        }).when("/UserSettings", {
            templateUrl: 'partials/UserSettings',
            controller: 'UserSettingsController'
        }).when("/meeting/:id", {
            templateUrl: 'partials/meeting/',
            controller: 'MeetingController'
        }).when("/story/:id", {
            templateUrl: 'partials/story/',
            controller: 'SingleStoryController'
        }).when("/admin", {
            templateUrl: 'partials/admin',
            controller: 'AdminController'
        }).otherwise({
            redirectTo: '/'
        });
    }
    return RouteConfig;
})();

(function () {
    var app = angular.module('devCommunity', ['LocalStorageModule', 'ngRoute', 'ngSanitize']);

    app.config(['localStorageServiceProvider', '$locationProvider', '$httpProvider', SiteConfig]);
    app.config(['$routeProvider', RouteConfig]);

    app.service('userSvc', ['localStorageService', UserSvc]);

    app.service('richTextService', [CKEditorRichText]);

    app.service('meetingSvc', ['userSvc', '$http', '$rootScope', MeetingSvc]);

    app.service('storySvc', ['$rootScope', StorySvc]);

    app.service('documentLocation', [DocumentLocation]);

    app.controller('HomeController', ['$scope', '$http', 'userSvc', 'meetingSvc', 'localStorageService', HomeController]);

    app.controller('StoryController', ['$scope', '$http', 'userSvc', 'storySvc', StoryController]);

    app.controller('AddMeetingController', ['$scope', '$http', 'meetingSvc', 'userSvc', 'richTextService', AddMeetingController]);

    app.controller('StorySubmitController', ['$scope', 'storySvc', '$http', 'userSvc', 'richTextService', StorySubmitController]);

    app.controller('UserSettingsController', ['$scope', '$http', 'userSvc', UserSettingsController]);

    app.controller('MeetingController', ['$scope', '$http', '$routeParams', 'meetingSvc', MeetingController]);

    app.controller('SingleStoryController', ['$scope', '$http', '$routeParams', SingleStoryController]);

    app.controller('AdminController', ['$scope', '$http', AdminController]);

    app.controller('PastMeetingsController', ['$scope', '$http', 'meetingSvc', PastMeetingsController]);

    app.controller('TweetController', ['$http', TweetController]);

    app.controller('AboutController', function ($scope) {
        $('.navbar-nav li.active').removeClass('active');
        $('#NavAbout').addClass('active');
    });

    app.controller('ContactController', function ($scope) {
        $('.navbar-nav li.active').removeClass('active');
        $('#NavContact').addClass('active');
    });

    app.controller('NavBarController', function ($scope, userSvc) {
        $scope.logOut = function () {
            userSvc.logOut();
        };

        $scope.isLoggedIn = function () {
            return userSvc.isLoggedIn();
        };

        setTimeout(function () {
            $('.login-nav').removeClass('login-nav');
        }, 1);
    });

    app.controller('LoginController', ['$scope', '$http', 'localStorageService', 'documentLocation', LoginController]);

    app.factory('authInterceptor', [
        '$q', 'localStorageService', function ($q, localStorageService) {
            return {
                request: function (config) {
                    config.headers = config.headers || {};
                    if (localStorageService.get('userToken')) {
                        config.headers.Authorization = 'Bearer ' + localStorageService.get('userToken');
                    }
                    return config;
                },
                response: function (response) {
                    if (response.status === 401) {
                        // handle the case where the user is not authenticated
                    }
                    return response || $q.when(response);
                },
                responseError: function (rejection) {
                    return $q.reject(rejection);
                }
            };
        }]);
})();
//# sourceMappingURL=app.js.map