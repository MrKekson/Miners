
var configFilePath = 'settings.json'

var settings = ({ tickTime: 1000 });

Core.Init(settings);

var Core = 
{
  settings : '',
  Init: function( settings ){
    console.log('Hi.');
    console.log(this.settings);
    this.settings = settings;

  }    
}

var Miner = {
  posX : 0,
  posY : 0,
  facing : 0,

  

  HeartBeat : function(){
    //main heartbeat
  }
  






}



