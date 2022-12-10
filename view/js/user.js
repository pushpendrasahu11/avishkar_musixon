// import { find } from 'lodash';
import songapi from './songapi.json' assert {type: 'json'};

let api = [...songapi];

let tar = document.getElementsByClassName('content')[0];
let useremail=document.getElementById('userpageemail').innerHTML;
var userlikes;
var playlistsongsvar;
let likedsongs=document.getElementById('likedsongs');
likedsongs.onclick=async function(){await finds()};
async function finds(){
    await axios.post('/getlikesdata',{email:useremail})
    .then((res)=>{
        console.log(res);
        userlikes=res.data;

        let len=userlikes.length;
        tar.innerHTML="";
console.log(len)
for(let i=0;i<len;i++){
    for(let j=0;j<api.length;j++){
        if(api[j].id==userlikes[i]){
            tar.innerHTML+=`<li class="song">
                            
            <img src="${api[j].artworkUrl}" alt="">    
            <h4>${api[j].title}</h4>
            <h5>${api[j].artist}</h5>
            <i class="bi bi-heart-fill" style="color:#e81224;"></i>
            <i class="bi bi-dash-circle" style="font-size:20px" id="removeplaylistsong"></i>
        </li>`
        }
    }
    
}
}
)}


let playlistsongs=document.getElementById('playlistsongs');
playlistsongs.onclick=async function(){await playlistdata()};

async function playlistdata(){
    await axios.post('/playlist',{email:useremail})
    .then((res)=>{
        console.log(res);
        playlistsongsvar=res.data;

        let len=playlistsongsvar.length;
console.log(len)
tar.innerHTML="";
for(let i=0;i<len;i++){
    for(let j=0;j<api.length;j++){
        if(api[j].id==playlistsongsvar[i]){
            
            tar.innerHTML+=`<li class="song">
                            
            <img src="${api[j].artworkUrl}" alt="">    
            <h4>${api[j].title}</h4>
            <h5>${api[j].artist}</h5>
            <i class="bi bi-dash-circle" style="font-size:20px" id="removeplaylistsong"></i>
            
        </li>`
        }
    }
    
}
}
)}
let historysong=document.getElementById('historysong');
historysong.onclick=async function(){await historydata()};
var historysongdata;
async function historydata(){
    await axios.post('/gethistory',{email:useremail})
    .then((res)=>{
        console.log(res);
        historysongdata=res.data;

        let len=historysongdata.length;
console.log(len)
tar.innerHTML="";
for(let i=0;i<len;i++){
    for(let j=0;j<api.length;j++){
        if(api[j].id==historysongdata[i]){
            
            tar.innerHTML+=`<li class="song">
                            
            <img src="${api[j].artworkUrl}" alt="">    
            <h4>${api[j].title}</h4>
            <h5>${api[j].artist}</h5>
            <i class="bi bi-dash-circle" style="font-size:20px" id="removeplaylistsong"></i>
            
        </li>`
        }
    }
    
}
}
)}


// let setting=document.getElementById('setting');
// setting.onclick= function(){ settingfun()};
// function settingfun(){
//     tar.innerHTML="";
//     tar.innerHTML+=`
//     <h3 id="info"></h3>
//     <h2 style="margin-left:40%;">Change Name</h2>
//     <input type="text" id="changename"  style="margin-left:40%;">                      
//     <button id="submitname" onclick="changenames()" style= "margin-left:10%;">Submit</button>
//     <h2 style="margin-left:40%;"> Change Password</h2>
//     <input type="text" id="changepassword"  style="margin-left:40%;">                      
//     <h2 style="margin-left:40%;"> Confirm Password</h2>
//     <input type="text" id="confirmpassword"  style="margin-left:40%;">                      
//     <button id="submitpassword" style= "margin-left:10%;">Submit</button>
//    `
// }



// let removeplaylistsong=document.getElementById("removeplaylistsong");
// removeplaylistsong.addEventListener('click',async ()=>{
//     await axios.post('/removeplaylist',{

//     })
// })


let changeemailbtn=document.getElementById('submitname')
// changeemailbtn.onclick= async function(){  console.log("hello1");await changenames()};
// changeemailbtn.addEventListener('click',
async function changenames(){
    console.log("hello");
    let changename=document.getElementById('changename').innerHTML;
    await axios.post('/changename',{
        oldemail:useremail,
        newname:changename
    })
    .then((res)=>{
        document.getElementById('info').innerHTML="Name changed succesfully"
    })
}
function fun1(){
    console.log("fun1c alled")
}
// )