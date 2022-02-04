const billInput = document.querySelector(".bill-input");
const peopleInput = document.querySelector(".people-input");
const tipPerPerson = document.getElementById("result-tip");
const totalPerPerson = document.getElementById("result-total");
const tips = document.querySelectorAll(".tips");
const tipCustomInput = document.getElementById("tip-custom");
const errorEl = document.getElementById("error-el");
const resetBtn = document.getElementById("reset-btn");
const tip15 = document.querySelector(".tip-15")


billInput.addEventListener("input", billInputFunc);
peopleInput.addEventListener("input", peopleInputFunc);
tips.forEach(function(val){
    val.addEventListener("click", handleClick);
});
tipCustomInput.addEventListener("click", function(){
    tips.forEach(function(val){
        val.classList.remove("active-tip");
        tipValue = 0;
        calculTip(tipValue);
    })
})
tipCustomInput.addEventListener("input", function(){
    tipCustomValue = parseFloat(tipCustomInput.value)/100
    calculTip(tipCustomValue);
});
resetBtn.addEventListener("click", reset);


billInput.value = "";
peopleInput.value = 1;
tipCustomInput.value = "";

let billValue = 0;
let peopleValue = 1;
let tipValue = 0.15;
let tipCustomValue = 0;


function billInputFunc(){
    billValue = parseFloat(billInput.value);
    resetBtn.style.background = "rgb(89, 194, 189)"

    if (!tipCustomInput.value){
        calculTip(tipValue);
    }else{
        calculTip(tipCustomValue);
     }
}


function peopleInputFunc(){
    peopleValue = parseFloat(peopleInput.value);
    if(peopleInput.value <= 0){
        errorEl.classList.add("error")
    }else{
        errorEl.classList.remove("error")
    }
    if (!tipCustomInput.value){
        calculTip(tipValue);
    }else{
        calculTip(tipCustomValue);
     }
}

function handleClick(event){
    tipCustomValue = 0;
    tipCustomInput.value = "";
    tips.forEach(function(val){
        val.classList.remove("active-tip");
        if(event.target.innerHTML == val.innerHTML){
            val.classList.add("active-tip");
            tipValue = parseFloat(val.innerHTML)/100;
        }
    })
    if (!tipCustomInput.value){
        calculTip(tipValue);
    }else{
        calculTip(tipCustomValue);
     }
}

function calculTip(choosed){

    if(peopleValue >= 1){
        let tipAmount = (billValue * choosed)/ peopleValue;
        let total = (billValue + (tipAmount * peopleValue)) / peopleValue;
        if(billInput.value || tips.target.innerHTML == tips.innerHTML){
            tipPerPerson.innerHTML = "$" + tipAmount.toFixed(2);
            totalPerPerson.innerHTML = "$" + total.toFixed(2);
        }    
    }
    resultAdjustment()
}

function reset(){
    billValue = 0;
    tipValue = 0.15;
    tipCustomValue = 0;
    peopleInput.value = 1;
    tipCustomInput.value = "";
    billInput.value = "";
    errorEl.classList.remove("error")
    tipPerPerson.innerHTML = "$" + (0.0).toFixed(2);
    totalPerPerson.innerHTML = "$" + (0.0).toFixed(2);
    resetTip();
    function resetTip(){
        tips.forEach(function(val){
        val.classList.remove("active-tip");
        })
    tip15.classList.add("active-tip");
    }
    resetBtn.style.background = "#04585f"
}

function resultAdjustment(){
    let adjustTotal = totalPerPerson.innerHTML.replace("$","")

    if(adjustTotal > 99){
        tipPerPerson.style.left = "40%"
        totalPerPerson.style.left = "40%"
    }else {
        tipPerPerson.style.left = "50%"
        totalPerPerson.style.left = "50%"
    }
}
