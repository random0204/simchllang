var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var Level=0;
var started=false;
$(document).keypress(function(){
    if(!started){
        $("#level-title").text("Level"+" "+Level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function() {
    var userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }else{
        console.log("failed");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game over,Press any key to restart");
        startOver();
    }
}

function nextSequence(){
    userClickedPattern=[];
    Level++;
    $("#level-title").text("Level " + Level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosencolor=buttonColours[randomNumber];
    gamePattern.push(randomChosencolor);
    $("#"+ randomChosencolor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosencolor);
    
}
function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
function startOver(){
    Level=0;
    gamePattern=[];
    started=false;
}