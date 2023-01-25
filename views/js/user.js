// import { find } from 'lodash';


import { allDetail} from "./mainData.js";

var tar = document.getElementsByClassName('content')[1];
let useremail=document.getElementById('useremail').innerHTML;
var userlikes;
var playlistsongsvar;
let likedsongs=document.getElementById('likedsongs');
likedsongs.onclick=async function(){await finds()};
async function finds(){
    await axios.post('/getlikesdata',{email:useremail})
    .then(async (res)=>{
        console.log(res.data);
        userlikes=res.data;

        let len=userlikes.length;
        tar.innerHTML="";
        tar.innerHTML+=`<h3>Liked songs</h3>`
// console.log(len)
for(let i=0;i<len;i++){
       const info=await allDetail(userlikes[i]);
        console.log(info)
            tar.innerHTML+=`<li class="song">
                            
            <img src="${info.trackImage}" alt="">    
            <h4>${info.trackTitle}</h4>
            <h5>${info.trackArtists}</h5>


            
            <i class="bi bi-heart-fill" style="color:#e81224;"></i>
            <i class="bi bi-dash-circle" style="font-size:20px" id="removeplaylistsong"></i>
        </li>`
        }
    })
    
}



let playlistsongs=document.getElementById('playlistsongs');
playlistsongs.onclick=async function(){await playlistdata()};

async function playlistdata(){
    await axios.post('/getexistplaylist',{useremail:useremail})
    .then(async (res)=>{
        console.log(res.data.list);
        let playlistsongsvar=res.data.list;

        let len=playlistsongsvar.length;

console.log(playlistsongsvar)
tar.innerHTML="";
tar.innerHTML+=`<h3>Playlist</h3>`
if(len>0){
    for(let i=0;i<len;i++){
        // const info=await allDetail(playlistsongsvar[i]);
    tar.innerHTML+=` <i class="bi bi-file-music"></i><a class="anchorofplaylist" id="${playlistsongsvar[i].name}">${playlistsongsvar[i].name}</a>`
    }
    let playlistshow=Array.from(document.getElementsByClassName('anchorofplaylist'));
    playlistshow.forEach((item) => {
        item.addEventListener('click', async (ele) => {
            tar.innerHTML="";
            tar.innerHTML+=`<h3>${ele.target.id}</h3>`
            // console.log(ele.target.id)
           
            for(let i=0;i<len;i++){
                if(playlistsongsvar[i].name==ele.target.id){
                    for(let j=0;j<playlistsongsvar[i].list.length;j++){
                        const info=await allDetail(playlistsongsvar[i].list[j]);
            tar.innerHTML+=`<li class="song">
                            
            <img src="${info.trackImage}" alt="">    
            <h4>${info.trackTitle}</h4>
            <h5>${info.trackArtists}</h5>
             <i class="bi bi-dash-circle" style="font-size:20px" id="removeplaylistsong"></i>
        </li>`
                    }
                }
            }
        }
    )});

}


    
})
  }  
let historysong=document.getElementById('historysong');
historysong.onclick=async function(){await historydata()};
var historysongdata;
async function historydata(){
    await axios.post('/gethistory',{email:useremail})
    .then(async (res)=>{
        console.log(res);
        historysongdata=res.data;

        let len=historysongdata.length;
console.log(len)
tar.innerHTML="";
tar.innerHTML+=`<h3>History</h3>`
for(let i=0;i<len;i++){
    console.log('hanji')
    const info=await allDetail(historysongdata[i]);
    tar.innerHTML+=`<li class="song">
                            
    <img src="${info.trackImage}" alt="">    
    <h4>${info.trackTitle}</h4>
    <h5>${info.trackArtists}</h5>
    <i class="bi bi-dash-circle" style="font-size:20px" id="removeplaylistsong"></i>
    
</li>`
        }
    })
    
}



let setting=document.getElementById('setting');
setting.onclick= function(){ settingfun()};
function settingfun(){
    tar.innerHTML="";
    tar.innerHTML+=`
    <h3 id="info"></h3>
    <h2 style="margin-left:40%;">Change Name</h2>
    <input type="text" id="changename"  style="margin-left:40%;">                      
    <button id="submitname" onclick="changenames()" style= "margin-left:10%;">Submit</button>
    <h2 style="margin-left:40%;"> Change Password</h2>
    <input type="text" id="changepassword"  style="margin-left:40%;">                      
    <h2 style="margin-left:40%;"> Confirm Password</h2>
    <input type="text" id="confirmpassword"  style="margin-left:40%;">                      
    <button id="submitpassword" style= "margin-left:10%;">Submit</button>
   `
}



