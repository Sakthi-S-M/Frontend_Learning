const form =document.getElementById('form')
form.addEventListener('submit',function(e){
    e.preventDefault()
    var Usercode=document.getElementById('userCode').value
    var title=document.getElementById('title').value
    var id=document.getElementById('id').value
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method:'POST',
        body:JSON.stringify({
            body:Usercode,
            title:title,
            userid:id
        }),
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    }).then((response)=>{
        console.log(response);
        return response.json();
    }).then((data)=>{
        console.log("post")
        console.log(data)
    })
})

function getdata(){
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method:'GET',
        headers:{
            "Content-Type":"application/json; charset=UTF-8"
        }
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log("get")
        console.log(data)
    })
}

function deletedata(){
       fetch("https://jsonplaceholder.typicode.com/posts/8",
       {
        method:'DELETE'
    }).then((response)=>{
        return response.json();
    }).then((data)=>{
        console.log("deleted")
        console.log(data)
    })
}

function updatedata(){
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
  method: 'PUT',
  body: JSON.stringify({
    id: 1,
    title: 'foo',
    body: 'bar',
    userId: 1,
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
}).then((response)=>{
    console.log("Updated");
});
}

const controller = new AbortController();
const abortBtn = document.getElementById('abt');
abortBtn.addEventListener("click", () => {
  controller.abort();
  console.log("Download aborted");
});

function abortit() {
  fetch("https://jsonplaceholder.typicode.com/posts", { signal:controller.signal })
    .then((response) => {
      console.log("Download complete", response);
    })
    .catch((err) => {
      console.error(`Download error: ${err.message}`);
    });
}

// function abortit(){
//     try{
//         let res=fetch("https://jsonplaceholder.typicode.com/posts",{
//         signal:controller.signal
//         });
//         console.log(res.json());
//     }catch(error){
//        if(error.name==="AbortError"){
//         console.log("Fetch API call Aborted")
//        }
//     }
// }