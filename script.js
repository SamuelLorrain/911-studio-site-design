const canvas = document.querySelector('#waveform')
const textarea = document.querySelector("textarea");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

if(!canvas.getContext){
    console.log("unable to get context")
}


let c = canvas.getContext('2d')

let freq = 0.01;
let t = 0;
let incrementFreq = false;
let decrementFreq = false;
function initWaveform(){
    waveform(t);
    animate();
}

function animate(){
    c.clearRect(0,0,canvas.width,canvas.height);
    waveform(t, 'rgba(0,0,0,0.4)',0.8);
    waveform(t+1, 'rgba(0,0,0,0.2)', 0.6);
    waveform(t+0.50, 'rgba(0,0,0,0.1)', 1);
    t += 0.1;
    if(incrementFreq){
        if(freq <= 0.5){
            freq += 0.05;
        }
        else{
            incrementFreq = false;
            decrementFreq = true;
        }
    }
    else if(decrementFreq){
        if(freq > 0.02){
            freq -= 0.05;
        }
        else{
            decrementFreq = false;
        }
    }
    requestAnimationFrame(animate);
}

function waveform(t, color, factor,){
    c.strokeStyle = color;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(0,canvas.height/2)
    for(let x = 0; x < canvas.width; x++){
        c.lineTo(x,
            canvas.height/2 + ((1/1+(x*x))*Math.cos((x*freq)+t))*((canvas.height/3200000)*factor));
    }
    c.stroke();
}

button = document.querySelectorAll(".menuItem");
sections = document.querySelectorAll("section");
button.forEach(i => {
    i.addEventListener('click', function(e){
        incrementFreq = true;
        //clear classes
        button.forEach(k => {
            k.classList.remove("active-item");
        });
        //set animation-out classes
        sections.forEach(j =>{
            if(j.classList.contains(j.classList.item(0) +'-animation-in')){
                j.classList.remove(j.classList.item(1));
                j.classList.add(j.classList.item(0)+'-animation-out');
            }
        });
        //set the good classes
        sections.forEach(j =>{
            if(j.classList.contains(e.target.innerHTML.toLowerCase())){
                j.classList.remove(j.classList.item(0)+'-animation-out');
                j.classList.remove('hidden');
                j.classList.add(e.target.innerHTML.toLowerCase()+'-animation-in')
            }
        });
        e.target.classList.add("active-item");
        //clear focus on button (bad looking...),
        //put it in textarea instead
        textarea.focus();
        //clear textarea
        setTimeout(function(){textarea.value="";}, 1000);
    });
});

document.querySelector("form").addEventListener('submit', function(e){
    e.preventDefault();
    textarea.value = "Submitted!";
});

const portfolio = document.querySelectorAll(".portfolio-img");

portfolio.forEach((i) => i.addEventListener('mouseover', function(e){
    i.classList.add("fa");
    i.classList.add("fa-play-circle");
	i.style.cursor = 'pointer';
}));
portfolio.forEach((i) => i.addEventListener('mouseout', function(e){
    if(window.innerWidth > 700){
        i.classList.remove("fa");
        i.classList.remove("fa-play-circle");
    }
}));

//detect innerWidth change (orientation hack)
setInerval(1500, function(e){
    if(canvas.width != window.innerWidth){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
})
