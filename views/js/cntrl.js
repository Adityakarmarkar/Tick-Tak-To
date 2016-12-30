var app = angular.module('myapp', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: '/index.html'
  });
}]);

app.factory('socket', ['$rootScope', function($rootScope) {
  var socket = io.connect();

  return {
    on: function(eventName, callback){
      socket.on(eventName, callback);
    },
    emit: function(eventName, data) {
      socket.emit(eventName, data);
    },
    destroy: function(eventName, data) {
        socket.destroy(eventName, data);
    }
  };
}]);


app.controller('myCtrl', function($scope, socket) {
    console.log("in my controller");
    
    //intially hide game
    $scope.oo=true;
    $scope.ss=false;
    // get the user name
    $scope.get= function(){
        $scope.oo=false;
        $scope.ss=true;
        //send user name to server
        socket.emit('token',$scope.name);
        //get a token from server 
        socket.on('gettoken', function(data) {
            console.log(data); 
            if ((data.status=='no')&&($scope.name==data.name)){
                  //$scope.ss=false;
                  document.getElementById("3rdparty").style.visibility = "hidden";
                  document.getElementById("bhag").innerHTML = "bhag kivha thamb thoda vel!";
                  console.log("yes");
                  var myEl = angular.element( document.querySelector( '#ID' ) );
                  myEl.text('no more user plz');
            }
            else if($scope.name==data){      
            var myEl = angular.element( document.querySelector( '#ID' ) );
            myEl.text('Your Id is :'+ data);
            }

        });
        var call =function(){
          $scope.ss=false;
        }
    };
    $scope.tick= function(co){
        var classd="#x"+co
        console.log(classd);
        var myEl = angular.element( document.querySelector(classd));
        myEl.text($scope.name);
        //send to server
        var data={name:$scope.name,co:co}
        socket.emit('play',data);
    };
         socket.on('backplay', function(data) {
            console.log(data);
            if($scope.name!=data.name){
                var classd="#x"+data.co
                var myEl = angular.element( document.querySelector(classd));
                myEl.text(data.name);
            }
         });
         
         //winig player
         socket.on('whowins', function(data) {
          console.log(data);
          if($scope.name==data){
            //document.getElementById("3rdparty").style.visibility = "hidden";
            document.getElementById("bhag").innerHTML = "you won"+data;
          }else{
            //document.getElementById("3rdparty").style.visibility = "hidden";
            document.getElementById("bhag").innerHTML = "you lost try next time";
          }
         });

         socket.destroy('close',function(data){
            console.log(data);
         })

});







//     $scope.id=null;
//     $scope.oo=true;
//     $scope.ss=false;
//     $scope.get= function(){
//       $scope.oo=false;
//     $scope.ss=true;
//       socket.emit('token');
//       socket.on('gettoken', function(data) {
        
//         $scope.id=data;
//         console.log($scope.id);
//       });
//     }
//     $scope.tick= function(val,index){
//       //console.log(val);
//       //console.log(index);
//       //console.log($scope.name)
//     var data={ index:index,id:$scope.id}
//     socket.emit('turn',data);
  	
// }
//     socket.on('back', function(data) {
//            console.log(data);
//           if(data.id===$scope.id){
//               console.log("true");
//           }else{
//               console.log("false")
//           }
//     });
  
