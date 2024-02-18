video = "";
status1 ="";
object =[];


function setup()
{
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380,380);
}

function draw()
{
    image(video, 0 , 0 , 380 , 380);
    if(status1 != "")
    {
        objectDetector.detect(video, gotResult);
        for(i=0;i<object.length;i++)
        {
           document.getElementById("status").innerHTML = "status: Object Detected";
           document.getElementById("number_of_objects").innerHTML = "Number Of Objects Detected Are : " + object.length;
           fill("black");
           percent = floor(object[i].confidence * 100);
           text(object[i].label + " " + percent + "%" , object[i].x+15 , object[i].y+15);
           noFill();
           stroke("black");
           rect(object[i].x, object[i].y, object[i].width, object[i].height);
           if(object[i].label==object_name)
           {
              video.stop();
              objectDetector.detect(gotResult);
              document.getElementById("status").innerHTML = object_name + " FOUND";
              synth = window.speechSynthesis;
              utterThis = new SpeechSynthesisUtterance(object_name + " Found");
              synth.speak(utterThis);
           }

           else{
            document.getElementById("status").innerHTML = object_name + "Not Found";
           }
        }
    }
}

function gotResult(error, result)
{
    if(error)
    {
        console.log(error);
    }
    console.log(result);
    object = result;
}



function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);    
    document.getElementById('status').innerHTML = "Status : Detecting Object";
    object_name = document.getElementById("objectName").value;
}

function modelLoaded()
{
    console.log("ModelLoaded!");
    status1 = true;

}










