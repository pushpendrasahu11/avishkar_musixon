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

let removeplaylistsong=document.getElementById("removeplaylistsong");
removeplaylistsong.addEventListener('click',async ()=>{
    await axios.post('/removeplaylist',{
        
    })
})