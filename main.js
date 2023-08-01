video="";
status = "";
objects = [];

function setup()
{
    canvas = createCanvas(600,500);
    canvas.position(415,300);

    video = createCapture(600,500);
    video.hide(); 
}

function start()
{
    objectDetector.detect(video, gotResult);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input");

    if (objects[i].label == objects_name)
    {
        videoLiveView.stop();
        objectDetector.detect(gotResult);
        document.getElementById("status").innerHTML = "Status: Object Mentioned Found";
        speech = speechSynthesis();
        utterThis = new SpeechSynthesisUtterance("object mentioned found");
        speech.speak(utterThis);
    }
    else
    {
        document.getElementById("status").innerHTML = "Status: Object Mentioned Not Found";
    }
}

function modelLoaded()
{
    console.log("model has been loaded");
    status = true;
}

function draw()
{
    image(video, 0, 0, 600, 450);

    if (status != "")
    {
        objectDetector.detect(video, gotResult);

        for (i=0; i < objects.length; i++)
        {
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].width, objects[i].height, objects[i].x, objects[i].y);

        }
    }
}

function gotResult(error, results)
{
    if (error)
    {
        console.log(error);
    }
    console.log(results);
    objects = results;
}