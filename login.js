const eye = document.getElementById("eye")
eye.addEventListener("click",()=>{
    const pass = document.getElementById("pass")
    if(pass.type == "password"){
        pass.type = "text"
    }
    else{
        pass.type = "password"
    }
})