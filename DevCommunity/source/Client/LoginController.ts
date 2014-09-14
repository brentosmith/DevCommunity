﻿///ts:import=ILoginControllerScope
import ILoginControllerScope = require('./ILoginControllerScope'); ///ts:import:generated
///ts:import=Browser
import Browser = require('./Impl/Browser'); ///ts:import:generated
///ts:import=app
import app = require('./app'); ///ts:import:generated

class LoginController {
    constructor(private $scope: ILoginControllerScope, private $http, private localStorageService, private location: Browser.IDocumentLocation) {
        $scope.user = { email: '', verificationCode: '' };
        $scope.message = '';
        $scope.step = 'Email';
    }

    public submitEmail(): void {
        this.$scope.user.email = this.$scope.user.email.toLowerCase();
        this.$http.post('/identify', this.$scope.user)
            .success((data, status, headers, config) => {
                this.$scope.step = 'Verification';
                this.$scope.message = "";
            })
            .error((data, status, headers, config) => {
                this.clearLocalStorage();
                this.$scope.message = data;
            });
    }

    public submitVerification(): void {
        this.$http.post('/verify', this.$scope.user)
            .success((data, status, headers, config) => {
                this.localStorageService.set('userToken', data.token);
                this.localStorageService.set('userEmail', this.$scope.user);
                this.localStorageService.set('admin', data.admin);
                this.close();
                this.location.reload();
            })
            .error((data, status, headers, config) => {
                this.clearLocalStorage();
                this.$scope.message = "Invalid verification code.";
            });
    }

    public close(): void {
        $('#LoginModal').modal('hide');
        this.$scope.user = { email: '', verificationCode: '' };
        this.$scope.message = '';
        this.$scope.step = 'Email';
    }

    private clearLocalStorage(): void {
        this.localStorageService.remove('userToken');
        this.localStorageService.remove('userEmail');
        this.localStorageService.remove('admin');
    }
}

angular.module(app.getModuleName()).controller('LoginController', ['$scope', '$http', 'localStorageService', 'documentLocation', LoginController]);

export = LoginController;