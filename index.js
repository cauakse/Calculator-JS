const main = document.querySelector('main');
const root = document.querySelector(":root");
const input = document.getElementById('input');
const resultado = document.getElementById("result");

const allowedKeys = ["(", ")", "/", "*", "-", "+", "9", "8", "7", "6", "5", "4", "3", "2", "1", "0", ".", "%", " "]


document.getElementById("equal").addEventListener("click",calculate);

document.getElementById("clear").addEventListener("click",()=>{
    input.value ='';
    input.focus();
})

document.querySelectorAll('.charKey').forEach((charKeyButton)=>{
    charKeyButton.addEventListener("click",()=>{
        const value = charKeyButton.dataset.value;
        input.value += value;
    })
})


input.addEventListener("keydown", (ev)=>{
    ev.preventDefault();

    if(allowedKeys.includes(ev.key)){
        input.value += ev.key;
        return
    }

    if(ev.key === 'Backspace'){
        input.value = input.value.slice(0,-1);
    }

    if(ev.key === 'Enter'){
        calculate();
    }
})

function calculate(){ 
    resultado.classList.add("error");
    resultado.value = "ERROR";  
    const result = eval(input.value);
    resultado.value = result;
    resultado.classList.remove("error");
}

document.getElementById("themeSwitcher").addEventListener("click",()=>{
    if(main.dataset.theme === "dark"){
        root.style.setProperty('--bg-color', "#f1f5f9");
        root.style.setProperty("--border-color","#aaa");
        root.style.setProperty("--font-color","#212529");
        root.style.setProperty("--primary-color","#26834a");
        main.dataset.theme = "light";
    }
    else
    {
        root.style.setProperty('--bg-color', "#212529");
        root.style.setProperty("--border-color","#666");
        root.style.setProperty("--font-color","#f1f5f9");
        root.style.setProperty("--primary-color","#4dff91");
        main.dataset.theme = "dark";
    }
})

document.getElementById("copyToClipboard").addEventListener("click",(ev)=>{
    const button = ev.currentTarget;
    if(button.innerText === "Copy"){
        button.innerText = 'Copied';
        button.classList.add("success")
        navigator.clipboard.writeText(resultado.value);
    }
    else
    {
        button.innerText="Copy";
        button.classList.remove("success");
    }
})