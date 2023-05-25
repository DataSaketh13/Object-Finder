status = "";
objects = [];


function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();

  
    

}

function modelLoaded(){
    console.log('Model is loaded');
    status = true;
    


}

function gotResult(error, results){
    if(error){
        console.log(error);
    }
        console.log(results);
        objects = results;
}


img="" 

function preload(){
    
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting Objects";
    info = document.getElementById("text_box").value;
}

function draw(){

    image(video, 0, 0, 380, 380);


    if(status != ""){
        objectDetector.detect(video, gotResult);
        
        for(i = 0 ; i < objects.length ; i++){

            document.getElementById("status").innerHTML = "Objects Detected";

            fill('red');
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);

            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        

        if(objects[i].label == info){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = info + " was found";
            synth = window.speechSynthesis;
            music = new SpeechSynthesisUtterance(info + " was found");
            synth.speak(music);
        }else{
            document.getElementById("status").innerHTML = info + " was not found";
            //synth = window.speechSynthesis;
            //thing = new SpeechSynthesisUtterance(info + " was not found");
            //synth.speak(thing);
        }
    }
}}
