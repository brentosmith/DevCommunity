﻿/// <reference path="../../../../typings/angularjs/angular.d.ts" />
/// <reference path="../../../../typings/jquery/jquery.d.ts" />
/// <reference path="../../../../typings/bootstrap/bootstrap.d.ts" />
/// <reference path="../../../../typings/readmore/readmore.d.ts" />
/// <reference path="../../../../typings/datepicker/datepicker.d.ts" />
/// <reference path="../../../../typings/ckeditor/ckeditor.d.ts" />
/// <reference path="Services.ts" />

class HomeController {
    loggedIn: boolean;

    constructor($scope, $http: ng.IHttpService, private userSvc: IUserSvc, private meetingSvc: IMeetingSvc, localStorageService) {
        $('.navbar-nav li.active').removeClass('active');
        $('#NavHome').addClass('active');

        this.loggedIn = false;
        $scope.meetings = [];
        $scope.$on('meetingAdded', function (event, meeting) {
            $scope.meetings.push(meeting);
        });

        $http.get('/api/GetSuggestions').success((data: Array<MeetingData>) => {
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
                $(document).ready(()=> {
                    $('#info-carousel').carousel({ interval: 10000, pause: "hover" });
                    this.NormalizeCarouselHeights();
                    $('#newIdeaDetails').ckeditor();
                });
            }, 1);
        });
        $('.datepicker').datepicker({ todayHighlight: true, autoclose: true });
        $('.datepicker').removeClass('datepicker');
    }

    public AddTopic(): void {
        if (this.userSvc.isLoggedIn()) {
            this.meetingSvc.notifyAddMeeting();
        }
        else
            $('#LoginModal').modal('show');
    }

    public EditMeeting(meeting: Meeting): void {
        this.meetingSvc.notifyEditMeeting(meeting);
    }

    private NormalizeCarouselHeights(): void {
        var items = $('#info-carousel .item'), heights = [], tallest;

        if (items.length) {
            function normalizeHeights() {
                items.each(function () { //add heights to array
                    heights.push($(this).height());
                });
                tallest = Math.max.apply(null, heights) + 10; //cache largest value
                items.each(function () {
                    $(this).css('min-height', tallest + 'px');
                });
            };
            normalizeHeights();

            $(window).on('resize orientationchange', function () {
                tallest = 0, heights.length = 0; //reset vars
                items.each(function () {
                    $(this).css('min-height', '0'); //reset min-height
                });
                normalizeHeights(); //run it again 
            });
        }
    }
}
