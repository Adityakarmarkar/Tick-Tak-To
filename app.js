var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var user=[{"id":0, "name":"Doe"},{"id":1}];
var i=0;
app.use(express.static(__dirname + '/views'));
var game=[[9,9],[9,9],[9,9]];
server.listen(3000); 
  console.log('at 3000');
  io.on('connection', function(socket) {
  console.log('new connection');

//add user to array
socket.on('token', function(name) {
      console.log(name);
      //allow only two user to connect
      if(i<2){
        user[i]["id"]=i;
        user[i]["name"]=name;
        console.log(user[i].id);
        var token =user[i].name;
        i++;
        io.emit('gettoken',token);
      }else{
          // user[i]["id"]=i;
          // user[i]["name"]=name;
          // console.log(user[i].id);
          // var token =user[i].name
          // i++;
          console.log("extra user plz wait");
          var status ="no";
          var data ={name:name,status:status}
          io.emit('gettoken',data);
      }        
});
  



  socket.on('play', function(data) {
    io.emit('backplay',data);
    var status=add(data);
    console.log("addfun " + status);
    if(status==0){}else{
    io.emit('whowins',status);
    }
  });

 socket.on('close', function(){
    console.log('user disconnected');
  });
});
var add =function(data){
  console.log(data);
  if(data.co=="00"){game[0][0]=data.name}
  else if(data.co=="01"){game[0][1]=data.name}
  else if(data.co=="02"){game[0][2]=data.name}
  else if(data.co=="10"){game[1][0]=data.name}
  else if(data.co=="11"){game[1][1]=data.name}
  else if(data.co=="12"){game[1][2]=data.name}
  else if(data.co=="20"){game[2][0]=data.name}
  else if(data.co=="21"){game[2][1]=data.name}
  else if(data.co=="22"){game[2][2]=data.name}
  console.log(game);
  console.log(win());
  //return if one of the user is in the list;
  var status=win();
  for(i=0;i<2;i++){
    // console.log("hiee"+user[i].name);
    //var data00=[{id:"0",status:status}]
    if(status==user[i].name){console.log("finaaly "+ status+" won");return(status);}
  }
  return(0);
};
var win =function(data){
    var won="none";
    if(game[0][0]==game[0][1]&&game[0][1]==game[0][2]){won=game[0][0];console.log("won:"+won); return(won);}
    else if(game[1][0]==game[1][1]&&game[1][1]==game[1][2]){won=game[1][0];console.log("won:"+won);return(won);}
    else if(game[2][0]==game[2][1]&&game[2][1]==game[2][2]){won=game[2][0];console.log("won:"+won);return(won);}

    else if(game[0][0]==game[1][0]&&game[1][0]==game[2][0]){won=game[0][0];console.log("won:"+won);return(won);}
    else if(game[0][1]==game[1][1]&&game[1][1]==game[2][1]){won=game[0][1];console.log("won:"+won);return(won);}
    else if(game[0][2]==game[1][2]&&game[1][2]==game[2][2]){won=game[2][2];console.log("won:"+won);return(won);}

    else if(game[0][0]==game[1][1]&&game[1][1]==game[2][2]){won=game[2][2];console.log("won:"+won);return(won);}
    else if(game[0][2]==game[1][1]&&game[1][1]==game[2][0]){won=game[2][2];console.log("won:"+won);return(won);}
    return("none");
}