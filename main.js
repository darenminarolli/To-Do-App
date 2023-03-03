let form = document.getElementById("form")
let textInput=document.getElementById("textInput")
let msg=document.getElementById("msg")
let dateInput= document.getElementById("dateInput")
let textarea= document.getElementById("textarea")
let tasks=document.getElementById("tasks")
let add=document.getElementById("add")
let c= console.log.bind(document)

form.addEventListener("submit",(e)=>{
    e.preventDefault()
    console.log("clicked")
    formValidation()
});

let formValidation=()=>{
    if(textInput.value===""){
        console.log("failure")
        msg.innerHTML+="Task cannot be blank"
    }else{
        console.log("succes")
        msg.innerHTML+=""
        acceptData();
        add.setAttribute("data-bs-dismiss","modal");
        add.click();
        
        (()=>{
            add.setAttribute("data-bs-dismiss","");
        })()

    }
}
let data=[];

let acceptData=()=>{
 data.push({
    text:textInput.value,
    date:dateInput.value,
    description:textarea.value
}) 

localStorage.setItem("data",JSON.stringify(data))

 createTasks();
 resetForm()
}

let createTasks= ()=>{
    tasks.innerHTML=""
    data.map((x,y)=>{
    return tasks.innerHTML+=`<div 
    id=${y}>
    <span class="fw-bold"${x.text}></span>
    <span class="small text-secondary">${x.date}</span>
    <p>${x.description}</p>
    
    <span class="options">
      <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick="deleteTask(this); createTasks()" class="fas fa-trash-alt"></i>
    </span>
    </div>
    `
})


}
let deleteTask=(e)=>{
 e.parentElement.parentElement.remove()
 data.splice(e.parentElement.parentElement.id, 1)
 localStorage.setItem("data",JSON.stringify(data))
}

let editTask=(e)=>{
    let selectedItem= e.parentElement.parentElement;


    textInput.value=selectedItem.children[0].innerHTML
    dateInput.value=selectedItem.children[1].innerHTML
    textarea.value=selectedItem.children[2].innerHTML

    
deleteTask(e);
}
let resetForm=()=>{
    textInput.value=""
    dateInput.value=""
    textarea.value=""
};

(()=>{
    data= JSON.parse(localStorage.getItem("data")) || [];
    createTasks()
})()

