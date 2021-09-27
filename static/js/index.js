//https://www.eclipse.org/paho/clients/js/

function LED1_On() {
	//alert("led on");
	console.log("led on");
	document.getElementById("sensor1").innerHTML="led on";
	message = new Paho.MQTT.Message("ON");
    	message.destinationName = "nabr0208@gmail.com/T1";
    	client.send(message);
  
}
function LED1_Off(){	
	//alert("led off");
	message = new Paho.MQTT.Message("OFF");
    	message.destinationName = "nabr0208@gmail.com/T1";
    	client.send(message);
	document.getElementById("sensor1").innerHTML="led off";
}
function LED2_On() {
  //alert("led on");
  console.log("led on");
  document.getElementById("sensor2").innerHTML="led on";
  message = new Paho.MQTT.Message("ON2");
      message.destinationName = "nabr0208@gmail.com/T1";
      client.send(message);
  
}
function LED2_Off(){  
  //alert("led off");
  message = new Paho.MQTT.Message("OFF2");
      message.destinationName = "nabr0208@gmail.com/T1";
      client.send(message);
  document.getElementById("sensor2").innerHTML="led off";
}


// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  //maqiatto
  //client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  //otroPrograma
  client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "web_" + parseInt(Math.random() * 100, 10));
  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    //userName: "nabr0208@gmail.com",
    //password: "123456",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("nabr0208@gmail.com/T2");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "nabr0208@gmail.com/T1";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	  document.getElementById("sensor1").innerHTML=message.payloadString;


  var MensajeRecibido=message.payloadString;
  var Sensores=MensajeRecibido.split(' ; ');
  //document.getElementById("Actual").innerHTML=MensajeRecibido;
  document.getElementById("sensor1").innerHTML=Sensores[0];
  document.getElementById("sensor2").innerHTML=Sensores[1];



  }
  
