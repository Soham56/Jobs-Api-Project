const preLoder = document.querySelector('.preloder');
window.addEventListener('load', ()=>{
    document.body.removeChild(preLoder);
})

var confettiSettings = { target: 'my-canvas' };
var confetti = new ConfettiGenerator(confettiSettings);
confetti.render();