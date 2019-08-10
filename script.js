const canvas = document.querySelector('#waveform')

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
//    c.fillStyle = '#fff6e8';
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
//    c.fillStyle = '#fff6e8';
//    c.clearRect(0,0,canvas.width,canvas.height);
    c.strokeStyle = color;
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(0,canvas.height/2)
    for(let x = 0; x < canvas.width; x++){
        //c.lineTo(x, canvas.height/2 + (0.001*x*(Math.sin(x*freq)*amp)));
        //c.lineTo(x, canvas.height/2 + Math.sqrt(x)*0.02*(Math.sin(x*freq)*amp));
        //c.lineTo(x, canvas.height/2 + (x/(Math.sin(x*freq)*amp)));
        c.lineTo(x, canvas.height/2 + ((1/1+Math.pow(x,2))*Math.sin((x*freq)+t))*((canvas.height/3200000)*factor));
    }
    c.stroke();
}

button = document.querySelectorAll(".menuItem");
button.forEach(i => {
    i.addEventListener('click', function(e){
        incrementFreq = true;
        button.forEach(i => i.classList.remove("active"));
        e.target.classList.add("active");
        e.target.blur();
    })
});

