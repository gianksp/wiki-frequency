var app = angular.module('WikiFrequency', ['ngMaterial','ngMdIcons']);

app.controller('AppCtrl', ['$scope', '$mdSidenav', '$http', '$sce', '$mdDialog', '$mdMedia', function($scope, $mdSidenav, $http, $sce, $mdDialog, $mdMedia){
  $scope.toggleSidenav = function(menuId) {
    $mdSidenav(menuId).toggle();
  };

  //Set default search for excercise
  $scope.defaultId = "21721040";
  $scope.n         = 5;

  /**
   * Query for a page in wikipedia with limit
   * @return     {[type]}                 [description]
   */
  $scope.query = function(){
    $http.get('/analyse?page_id='+$scope.defaultId+'&n='+$scope.n).then(function(response) {
      if (response.data.success) {
        $scope.response   = response.data;
        $scope.text       = $sce.trustAsHtml(response.data.extract);
        $scope.title      = $sce.trustAsHtml(response.data.title);
        $scope.url        = response.data.url;
        $scope.ocurrences = response.data.ocurrences;
        mapColors(response.data.ocurrences);
      } else {

      }
    }, function(error) {
      console.log(error);
    });
  }

  /**
   * Display a dialog with the rest call
   * @return     {[type]}                 [description]
   */
  $scope.showCall = function(ev) {
    $mdDialog.show({
      scope:$scope,
      controller: 'DialogCtrl',
      templateUrl: 'partials/dialog.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: false
    });
  }

  /**
   * For every word mapped create a legend
   * @example    https://www.glofoxlogin/
   * @return     {[type]}                 [description]
   */
  function mapColors(ocurrences) {
    $scope.wordMap = {};
    _.each(ocurrences,function(item){
      _.each(item.words,function(word){
        $scope.wordMap[word] = "#"+((1<<24)*Math.random()|10).toString(16);
      });
    });
    $scope.matches = Object.keys($scope.wordMap);
  }

  //Init
  $scope.query();

}]);

/**
 * Dialog with the details about the rest call
 * @param      {[type]}                 $scope      [description]
 * @param      {[type]}                 $mdDialog   [description]
 * @param      {[type]}                 $mdMedia){               }] [description]
 * @return     {[type]}                             [description]
 */
app.controller('DialogCtrl', ['$scope','$mdDialog', '$mdMedia', function($scope, $mdDialog, $mdMedia){

  //URL for our test search service
  $scope.endpoint = location.href+'analyse?page_id='+$scope.defaultId+'&n='+$scope.n;

  /**
   * Close the dialog
   * @return     {[type]}                 [description]
   */
  $scope.hide = function() {
    $mdDialog.hide();
  };

}]);

/**
 * Highlight multicolor filtering mechanism
 * @param      {RegExp}                 $sce) {             return function(str, termsToHighlight)                   {                              termsToHighlight.sort(function(a, b) {      return b.length - a.length;    });        var regex [description]
 * @param      {String}                 'g');                       return        $sce.trustAsHtml(str.replace(regex, '<span class [description]
 * @return     {[type]}                       [description]
 */
app.filter('highlight', function($sce) {
  return function(str, matches, wordMap) {
    var src = $sce.valueOf(str);
    if (matches && str) {
      // Sort terms by length
      matches.sort(function(a, b) {
        return b.length - a.length;
      });

      _.each(Object.keys(wordMap), function(word) {
         var regex = new RegExp('\\b'+word+'\\b', 'gi');
         src=src.replace(regex, '<span style="background:'+wordMap[word]+'">$&</span>');
      });
      // Regex to simultaneously replace terms
      // var regex = new RegExp('(' + matches.join('|') + ')', 'g');
      return $sce.trustAsHtml(src);

    } else {
      return str;
    }
  };
});
    