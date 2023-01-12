prediction_1 = ""
prediction_2 = ""

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});


camera =document.getElementById("camera")

Webcam.attach('#camera')

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML =  '<img id="captured_image" src="'+data_uri+'"/>';
    });

}

  

console.log('ml5 version',ml5.version);

classifier= ml5.imageClassifier('https://storage.googleapis.com/tm-model/jqHBHN0e0/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelo listo');
}
function speak(){
    var synth= window.speechSynthesis;
    speak_data_1="el primer perro es " +prediction_1;
    speak_data_2="el segundo perro es " +prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}


function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();

        if(results[0].label=="Feliz"){
            document.getElementById("update_emoji").innerHTML="<img src='perrito4.png'>";
        }
        if(results[0].label=="Triste"){
            document.getElementById("update_emoji").innerHTML="<img src='perrito1.png'>";
        }
        if(results[0].label=="Serio"){
            document.getElementById("update_emoji").innerHTML="<img src='perrito3.png'>";
        }
        if(results[1].label=="Feliz"){
            document.getElementById("update_emoji2").innerHTML="<img src='perrito6.png'>";
        }
        if(results[1].label=="Triste"){
            document.getElementById("update_emoji2").innerHTML="<img src='perrito5.png'>";
        }
        if(results[1].label=="Serio"){
            document.getElementById("update_emoji2").innerHTML="<img src='perrito2.png'>";
        }
    }
}





