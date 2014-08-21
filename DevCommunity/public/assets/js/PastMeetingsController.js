﻿/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../typings/readmore/readmore.d.ts" />
/// <reference path="../../../typings/ckeditor/ckeditor.d.ts" />
/// <reference path="Services.ts" />
var PastMeetingsController = (function () {
    function PastMeetingsController($scope, $http, userSvc, meetingSvc, localStorageService) {
        this.userSvc = userSvc;
        this.meetingSvc = meetingSvc;
        $('.navbar-nav li.active').removeClass('active');
        $('#NavPastMeetings').addClass('active');

        this.loggedIn = false;
        $scope.meetings = [];

        $http.get('/api/GetArchivedMeetings').success(function (data) {
            for (var i = 0; i < data.length; ++i) {
                $scope.meetings.push(meetingSvc.createMeeting(data[i]));
            }

            setTimeout(function () {
                $('.panel-body').readmore({
                    maxHeight: 60,
                    moreLink: '<a href="#" class="readmore-link">More</a>',
                    lessLink: '<a href="#" class="readmore-link">Close</a>',
                    speed: 500
                });
            }, 1);
        });
    }
    return PastMeetingsController;
})();
//# sourceMappingURL=PastMeetingsController.js.map
