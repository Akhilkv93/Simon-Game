let buttons=document.querySelectorAll('.color-btn');
let startButton=document.querySelector('.start');
let strictButton=document.querySelector('.strict');
let countDisplay=document.querySelector('.count');
let switchButton=document.querySelector(".checkbox");
console.log(buttons);

let isStart=false;
let isStrict=false;
let isOn=false;
let count=0;
let userSelection=[];
let randomPattern=[];
let colors=['red','green','yellow','blue']


strictButton.addEventListener("click",()=>{
    console.log("STRICT BUTTON ADDED")
    strictButton.style.background="white"
    isStrict=!isStrict;
})

switchButton.addEventListener("change",()=>{
if(switchButton.checked==true){
    console.log("SWICH ON")
    countDisplay.textContent="_";
    isOn=true;
}else{
    isOn=false;
    countDisplay.textContent=""
}
})
startButton.addEventListener("click",()=>{
    if(isOn){
        count=1;
        countDisplay.textContent=count;
        userSelection=[];
        randomPattern=[];
        isStart=true;
        play()
    }
})

function play(){
let randomIndex=Math.floor(Math.random()*4)
console.log(randomIndex);
let randomColor=colors[randomIndex]
console.log(randomColor);
randomPattern.push(randomColor)
playPattern(0)
}
function playPattern(index){
   if (index < randomPattern.length) {
        flash(randomPattern[index]); 
        setTimeout(() => {
            playPattern(index + 1);  
        }, 1000);  
    }
}
function flash(color){
    let button=document.querySelector(`[data-color='${color}']`)
    console.log(button);
    
    button.classList.add('active')
    setTimeout(()=>{button.classList.remove('active')},800)
}
    buttons.forEach((btn)=>{
        btn.addEventListener("click",()=>{
            let userSelectedColor=btn.dataset.color;
            console.log(userSelectedColor);
            userSelection.push(userSelectedColor)
            flash(userSelectedColor)
           
            if (!checkPattern()) {
                if (isStrict) {
                    alert("Wrong! Starting over.");
                    startButton.click(); 
                } else {
                    alert("Wrong! Try again.");
                    userSelection = []; 
                }
            } else if (userSelection.length === randomPattern.length) {
               
                count++;
                countDisplay.textContent = count;
                userSelection = [];
                setTimeout(play, 1000); 
            }
            
        })
    })

    function checkPattern(){
        for(let i=0;i<userSelection.length;i++){
            if(userSelection[i]!==randomPattern[i]){
                return false
            }
        }
        return true
    }
