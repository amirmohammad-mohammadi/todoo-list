let myUrl1 = "https://6193bd39d3ae6d0017da87bc.mockapi.io/amirmohammad";
let notif = document.getElementById('notif');
let closer = document.getElementById('closer');
let inpu3 = document.getElementById('inpput3');

function add(event) {
    event.preventDefault();

    let input1 = document.getElementById('inpput1').value;
    let input2 = document.getElementById('inpput2').value;
    let input3 = document.getElementById('inpput3').value;

    let todo2 = {
        createdAt: '2021-11-08T12:22:35.227Z',
        title: input1,
        description: input2,
        date: input3
    }
    postt(todo2);

    document.getElementById('inpput1').value = "";
    document.getElementById('inpput2').value = "";
    document.getElementById('inpput3').value = "";
}

function postt(todo) {
    let ans = fetch(myUrl1, {
        method: "POST",
        headers: {
            "content-type": "application/json",
        },

        body: JSON.stringify(todo)
    })
    ans.then((info) => {
        if (info.ok) {
            return info.json()
        } else {
            throw new Error("errorr darim")
        }
    })
        .then((info) => {
            console.log(info);

          document.getElementById('inpput1').value = "";
          document.getElementById('inpput2').value = "";
          document.getElementById('inpput3').value = "";

                notif.style.display = "flex";
                setTimeout(() => {
                    notif.style.display = "none"
                }, 10000)
                    .catch(err => {
                        console.log(err);
                    })

        })
}
const pagList = document.querySelectorAll('.pagination');
const btnPag = document.querySelectorAll('.pagination__btn');

function paginationBtn(arr,size = 10){
    let btn = '';

    pagList.forEach((elem,i) => {
        for(let i = 0; i < arr.length/size;i++){
            btn += `<button class='pagination__btn' onclick="smartList(${i})">${i + 1}</button>`
        }
        elem.innerHTML = btn;
    });
}
function addClass(btnElem, prevBtn){
    prevBtn.forEach(elem => elem.classList.remove('pagination__btn-active'));
    btnElem.classList.add('pagination__btn-active');
}




function show(todos,page,size = 10){
    paginationBtn(todos);
    todos=todos.reverse();
    console.log(todos)
    let arrayList = [];
    let html = ``;
    arrayList = todos.slice().splice(page*size,size);
    console.log(arrayList)
    wrapper.innerHTML="";
    arrayList.forEach((item,) => {

        html = `
  
       <div class="row task-item border m-2 ">
         <li class="col-3 offset-1 col-md-9 list-group-item border-0 bg-transparent lisTs position-relative">
         <div id="${item.id}" class=" position-absolute line "> </div>
                <input class="form-check-input me-3 "  ${item.chek ? "checked":""} id="checkBox" type="checkbox" value="" onclick="checking(${item.id})" >
                <span id="titlee" class="text-primary font-weight-bold ">${item.title}</span>
                <span class="ml-3 text-secondary font-italic font-weight-lighter"> ${item.date}</span>
                <div>
                  <span class="text-success ">${item.description}</span>
                </div>
         </li>
         <div class="col-2 col-md-2 edit text-end">
            <i class="fas fa-pencil-alt text-end pt-3  text-primary "  role='button' onclick=editTask(${item.id})></i>
            <i class="far fa-trash-alt  text-danger" role='button'  onclick=deleteTask(${item.id})></i>
         </div>
        </div>

          `
        wrapper.innerHTML += html;
        if(item.chek){
            document.getElementById(item.id).style.display="block";
        }else{
            document.getElementById(item.id).style.display="none";
        }

    })
    // btnPag[0].classList.add('pagination__btn-active');
}

function smartList(page) {
    let ans = fetch(myUrl1);
    ans
        .then((info) => {
            if (info.ok) {
                return info.json();
            } else {
                throw new Error("Erorr darim");
            }
        })
        .then((info) => {
            // show(info);
            show(info,page,10)


        })
        .catch(err => {
            console.log(err);
        })
}
smartList(0)

function deleteTask(ID) {
    if (confirm('Are you sure to delete this item?')) {

        let ans = fetch(myUrl1);
        ans
            .then((info) => {
                if (info.ok) {
                    return info.json();
                } else {
                    throw new Error("Erorr darim");
                }
            })
            .then((info) => {
                info = info.filter(item => item.id != ID)

                fetch(myUrl1 + "/" + (ID), {
                    method: 'DELETE',
                })
                console.log(info);
                show(info);
            })

            .catch(err => {
                console.log(err);
            })


    }
}

function editTask(ID) {
    window.location.href = 'file:///C:/Users/mehrad/Desktop/amir/Todo/index.html' + "?id=" + ID;

}
function lod() {
    let id = window.location.href;
if(id.indexOf("id")!=-1){
    id = id.split("=")[1]

        let ans = fetch(myUrl1 + "/" + id);
        ans
            .then((info) => {
                if (info.ok) {
                    return info.json();
                } else {
                    throw new Error("Erorr darim");
                }
            })
            .then((info) => {
                console.log(info);
                document.getElementById('inpput1').value = info.title;
                document.getElementById('inpput2').value = info.description;
                document.getElementById('inpput3').value = info.date;

            })
            .catch(err => {
                console.log(err);
            })

        document.getElementById("addTaskBtn").style.display = "none";
        document.getElementById("saveTaskBtn").style.display = "block";

   }
}

function save(event) {
    event.preventDefault();
    let id = window.location.href;
    id = id.split("=")[1]

    let input1 = document.getElementById('inpput1').value;
    let input2 = document.getElementById('inpput2').value;
    let input3 = document.getElementById('inpput3').value;
    let formData = {
        createdAt: '2021-11-08T12:22:35.227Z',
        title: input1,
        description: input2,
        date: input3
    }
    let putMethod = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(formData)
    }


    fetch(myUrl1 + "/" + id, putMethod)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err))


    document.getElementById('inpput1').value = "";
    document.getElementById('inpput2').value = "";
    document.getElementById('inpput3').value = "";
    document.getElementById("addTaskBtn").style.display = "block";
    document.getElementById("saveTaskBtn").style.display = "none";
    notif.style.display = "flex";
    setTimeout(() => {
        notif.style.display = "none"

    }, 10000)
        .catch(err => {
            console.log(err);
        })

}

document.addEventListener("keyup", keypres);
function keypres(event) {

    event.preventDefault();
    if (event.keyCode === 13&&document.getElementById("addTaskBtn").style.display == "none"){
         save(event);
    }else {
        addText();
    }
}



//-----------------------------------------------------------------------------------------------------------------------------------

function checking(ID){
    fetchTodo(ID)
        .then((data) => {
            data.chek ? document.getElementById(ID).style.display="none": document.getElementById(ID).style.display="block";

        });

    let formData = {
        chek: document.getElementById(ID).style.display=="none" ? true:false
    }
    let putMethod = {
        method: 'PUT',
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(formData)
    }

    fetch(myUrl1 + "/" +ID, putMethod)
        .then(response => response.json())
        .catch(err => console.log(err))
}

//-------------------------------------------------------------------------------------------------------------------------------------

function fetchTodo(i) {
    return  fetch(myUrl1+"/"+i)
        .then(data => {
            return  data.json()
        })
        .then(result => {
            return result
            
        })
}

