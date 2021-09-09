prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
  });

camera = document.getElementById("camera");

Webcam.attach('#camera');

      
function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

  console.log('ml5 version:', ml5.version);
  
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/4bHWXYu11/',modelLoaded);

  function modelLoaded() {
    console.log('Model Loaded!');
  }
  
function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "The first prediction is " + prediction_1;
  speak_data_2 = "And the second prediction is " + prediction_2;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
  synth.speak(utterThis);
}


  function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }


function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.getElementById("result_hand_posture").innerHTML = results[0].label;
    document.getElementById("result_hand_posture2").innerHTML = results[1].label;
    prediction_1 = results[0].label;
    prediction_2 = results[1].label;
    speak();
    if(results[0].label == "Good Job!")
    {
	    document.getElementById("update_posture").innerHTML = "&#128077;";
    }
    if(results[0].label == "left")
    {
	    document.getElementById("update_posture").innerHTML = "&#128072;";
    }
    if(results[0].label == "Hello!")
    {
	    document.getElementById("update_posture").innerHTML = "&#128075;";
    }

    if(results[1].label == "Wow!")
    {
	    document.getElementById("update_posture2").innerHTML = "&#128076;";
    }
    if(results[1].label == "right")
    {
	    document.getElementById("update_posture2").innerHTML = "&#128073;";
    }
    if(results[1].label == "clap")
    {
	    document.getElementById("update_posture2").innerHTML = "&#128079;";
    }
  }
}