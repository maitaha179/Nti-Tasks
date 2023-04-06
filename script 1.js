const myForm = document.querySelector("#myForm")
const userWrap = document.querySelector("#userWrap")
const singleUser=document.querySelector("#singleUser")
const info =["id","name","age","phone","status"]
const readFromStorage = (key=`user`) => JSON.parse(localStorage.getItem(key)) || []
const writeToStorage = (user, key=`user`) => localStorage.setItem(key, JSON.stringify(user))


const userObjectCreator = (myForm)=>{
  const user = { id:Date.now() }
    info.forEach( h => user[h] = myForm.elements[h].value )
  return user
}

const addUser = (user)=>{const allUsers = readFromStorage("users")
allUsers.push(user)
writeToStorage(allUsers,"users") 
}

const createNewElement = (ele,parent,txt=null,classes=null)=>{
const myElement= document.createElement(ele)
      parent.append(myElement)
    if (txt) myElement.textContent=txt
    if (classes) myElement.classList = classes
    return myElement
}
const deleteMyElement = (allUsers, i) =>{
  allUsers.splice(i,1)
  writeToStorage(allUsers, "users")
  drawNewData()
}

const drawNewData = () =>{
  userWrap.innerHTML=""
  const allUsers = readFromStorage("users")
  allUsers.forEach((user,i) =>{
  const tr=createNewElement("tr",userWrap)
   createNewElement("td" , tr , user.id )
   createNewElement("td" , tr , user.name)
   createNewElement("td" , tr , user.age )
   createNewElement("td" , tr , user.phone )
   createNewElement("td" , tr , user.status)
   const td = createNewElement("td",tr)
   const showBtn = createNewElement("button", td, "Show","mx-2 btn btn-primary")
   showBtn.addEventListener("click",()=>{
      localStorage.setItem("index",i)
      window.location="single.html"
   })
   const editBtn = createNewElement("button", td, "Edit","mx-2 btn btn-warning")
   editBtn.addEventListener("click",()=>{
    user.status=="active"?(user.status="inactive"): (user.status="active")
    writeToStorage(allUsers, "users")
      drawNewData()
   })
   const delBtn = createNewElement("button", td, "Delete","mx-2 btn btn-danger")
   delBtn.addEventListener("click", (e)=> deleteMyElement(allUsers, i))
   })
}

if (myForm){
  myForm.addEventListener ("submit" , function (e){
  e.preventDefault()
  const user = userObjectCreator(myForm)
  addUser(user)
  window.location = "index.html"
})}

if (userWrap) {
  drawNewData()
}
if(singleUser){
  const index = localStorage.getItem("index")
const allUsers= readFromStorage("users")
createNewElement("p", singleUser, allUsers[index].name)  
}