App.directive('noScroll', function() {
    return {
        restrict: 'A',
        link: function($scope, $element, $attr) {
            $element.on('touchmove', function(e) {
                e.preventDefault();
            });
        }
    }
})


App.controller('aboutUsCtrl', function($scope) {
    var cardTypes = [
        { image: 'img/Zaher.jpg', title: 'zaher'},
        { image: 'img/Souidan.jpg', title: 'souidan'},
        { image: 'img/Karim.jpg', title: 'Karim'},

    ];

    $scope.cards = [];

    $scope.addCard = function(i) {
        var newCard = cardTypes[i];
    //    newCard.id = Math.random();
        $scope.cards.push(angular.extend({}, newCard));
    }

    for(var i = 0; i < 3; i++) $scope.addCard(i);

    $scope.cardSwipedLeft = function(index) {
        console.log('Left swipe');
    }

    $scope.cardSwipedRight = function(index) {
        console.log('Right swipe');
    }

    $scope.cardDestroyed = function(index) {
        $scope.cards.splice(index, 1);
        console.log('Card removed');
    }
});
