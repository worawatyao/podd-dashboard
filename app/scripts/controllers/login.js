'use strict';

angular.module('poddDashboardApp')

.controller('LoginCtrl', function ($scope, $http, shared, Auth) {
    $scope.username = '';
    $scope.password = '';
    $scope.shared = shared;

    $scope.$watch('shared.loggedIn', function(newValue, oldValue) {
        if (newValue) {
            window.location = '#/';
        }
    });

    $scope.validate = function () {
        $scope.invalidUsername = false;
        $scope.invalidPasswordLength = false;
        $scope.invalidLogin = false;

        if (!$scope.username) {
            $scope.invalidUsername = true;
        }

        if ($scope.password.length < 4) {
            $scope.invalidPasswordLength = true;
        }

        return !$scope.invalidUsername && !$scope.invalidPasswordLength;
    };

    $scope.submit = function () {
        if (!$scope.validate()) return;

        Auth.login($scope.username, $scope.password, function (err) {
            if (err) {
                $scope.invalidLogin = true;
            } else {
                window.location.href = '/#/';
            }
        });
    };
});