﻿/// <reference path="../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../typings/readmore/readmore.d.ts" />
/// <reference path="../../../typings/ckeditor/ckeditor.d.ts" />
/// <reference path="Services.ts" />

class PastMeetingsController {
    loggedIn: boolean;

    constructor($scope, $http: ng.IHttpService, private userSvc: UserSvc, private meetingSvc: MeetingSvc, localStorageService) {
        $('.navbar-nav li.active').removeClass('active');
        $('#NavPastMeetings').addClass('active');

        this.loggedIn = false;
        $scope.meetings = [];


        $http.get('/api/GetArchivedMeetings').success((data: Array<MeetingData>) => {
            for (var i = 0; i < data.length; ++i) {
                $scope.meetings.push(meetingSvc.createMeeting(data[i]));
            }
            
            setTimeout(()=> {
                $('.panel-body').readmore({
                    maxHeight: 60,
                    moreLink: '<a href="#" class="readmore-link">More</a>',
                    lessLink: '<a href="#" class="readmore-link">Close</a>',
                    speed: 500
                });
            }, 1);
        });
    }
}
