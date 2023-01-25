var download_song='Deva Deva';
// import e from 'express';
import { playTrack, updateTime, playNextSong, playPreviousSong } from '../js/player.js';



let contentArray=[];
let contentArrayName=[];

let trendingnow;
let bestofromance;
let bestofdance;
let hindiretro;
let punjabisongs;
let toptamil;
let toptelugu;
let cnt=0;


    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/romantic-hits-2022---hindi/EzSEwcZfOoB5b0dfvYvasw__`).then(function (response) {
      console.log(response.data); cnt++;
      trendingnow=response.data.songs;
    }).catch(function (error) {
      console.log(error);
    });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/decade-of-2010s%3A-romance---hindi/7OGmFfsGtN9ieSJqt9HmOQ__`).then(function (response) {
    //   console.log(response.data); cnt++;
    //   bestofromance=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/best-of-dance---hindi/qVvfieICUY5ieSJqt9HmOQ__`).then(function (response) {
    //   console.log(response.data); cnt++;
    //   bestofdance=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/latest-punjabi-hits/T,w3Z-u7t6A_`).then(function (response) {
    //   console.log(response.data); cnt++;
    //   punjabisongs=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/house-party---tamil/,9s3E3l5o0lFo9wdEAzFBA__`).then(function (response) {
    //   console.log(response.data); cnt++;
    //   toptamil=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/pakka-beat/t7M-TsljMEPuCJW60TJk1Q__`).then(function (response) {
    //   console.log(response.data); cnt++;
    //   toptelugu=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/hindi_retro/dYn-,-QcKzA_`).then(function (response) {
    //   console.log(response.data); cnt++;
    //   hindiretro=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });
    
  

let trendingNow = [...trendingnow];
contentArray.push(trendingNow);
contentArrayName.push("Trending Now");

// let bestOfRomance = [...bestofromance];
// contentArray.push(bestOfRomance);
// contentArrayName.push("Best Of Romance");

// let bestOfDance = [...bestofdance];
// contentArray.push(bestOfDance);
// contentArrayName.push("Best Of Dance");

// let punjabiSongs = [...punjabisongs];
// contentArray.push(punjabiSongs);
// contentArrayName.push("Punjabi Songs");

// let topTamil = [...toptamil];
// contentArray.push(topTamil);
// contentArrayName.push("Tamil Songs");

// let topTelugu = [...toptelugu];
// contentArray.push(topTelugu);
// contentArrayName.push("Telugu Songs");

// let hindiRetro = [...hindiretro];
// contentArray.push(hindiRetro);
// contentArrayName.push("Hindi Retro");


let content = document.getElementsByClassName('content')[0];
console.log(contentArrayName);
for(let i=0;i<contentArray.length;i++){
    content.innerHTML+=`<div class="list" id="list0${i}">
                    <i class="bi bi-chevron-left"></i>
                    <h3>${contentArrayName[i]}</h3>
                    <div class="songs"> 
                    </div>
                        <i class="bi bi-chevron-right"></i>
                </div>`
    
    let tar = document.getElementsByClassName('songs')[i];
    let limit = 20;
    if(contentArray[i].length < 20) limit = contentArray[i].length;
    for (let j = 0; j < limit; j++) {
        
        tar.innerHTML += `<li class="song" >
        <div class="image_play">
            <img src="${contentArray[i][j].image}" alt="">
            <img class="play_icon" id="${contentArray[i][j].perma_url}" src="../images/play.svg" alt="">
            <i class="like_icon bi bi-heart" id="${contentArray[i][j].perma_url}"></i>
            <i class="bi bi-hearts"></i>
            <i class="bi bi-plus-circle" id="${contentArray[i][j].perma_url}"></i>
            <ul class="add_menu hide" >
            
             <li  class="newplaylist" id="${contentArray[i][j].perma_url}">New playlist</li>
             <li class="existone" id="${contentArray[i][j].perma_url}">Existing playlist</li>
             
            </ul>
        </div>      
        <div>
            <h5 style="font-size:15px;" >${contentArray[i][j].song}</h5>
            <h5>${contentArray[i][j].primary_artists}</h5>
        </div>
        
    </li>`
    }

}

if(cnt==contentArray.length){
    document.getElementsByClassName('loading')[0].classList.add('hide');
}
console.log('done');

var songArray = Array.from(document.getElementsByClassName('play_icon'));

// playing song

// export var music = new Audio('../songs/song1.mp3');

playplaylist(songArray);

async function playplaylist(array) {
    array.forEach((item) => {
        item.addEventListener('click', async (ele) => {
           download_song=ele.target.id;
// console.log('id is '+ele.target.id)
            playTrack(ele.target.id);
           
            console.log("id is here "+ ele.target.id);
            // allPlayButton(array,ele.target.id);
            // item.src = `../images/pause.svg`
            console.log('icon change done')
            if(document.getElementById('useremail').innerHTML!='Login'){
                await axios.post('/history',{
                    "id":ele.target.id,
                    "useremail":document.getElementById('useremail').innerHTML
                }).then((res)=>{
                    console.log(res);
                    // res.redirect('/login')
                })
            }
            
        })
    })

}

// function allPlayButton(array,songid) {  
//     array.forEach((ele) => {
//         ele.src = `../images/play.svg`
//         if(ele.id == songid) ele.src = `../images/pause.svg`
//         console.log('icon change done allpaly');
//     })
// }




// code for working of sliding buttons for each list
let my_list_length = document.getElementsByClassName('songs').length;
for (let i = 0; i < my_list_length; i++) {

    let go_left = document.getElementsByClassName('bi-chevron-left')[i];
    let go_right = document.getElementsByClassName('bi-chevron-right')[i];
    let my_list = document.getElementsByClassName('songs')[i];

    go_left.addEventListener('click', () => {
        my_list.scrollLeft -= 660;
    })

    go_right.addEventListener('click', () => {
        my_list.scrollLeft += 660;
    })
}


// let queue_icon = document.getElementsByClassName("bi-music-note-list")[0];
// let tar_queue=document.getElementsByClassName('queue')[0];


// let c = 1;
// queue_icon.addEventListener('click', () => {
//     if (c > 0) {
//         tar_queue.classList.add("big");
//         c = -c;
//     } else {
//         tar_queue.classList.remove("big");
//         c = -c;
//     }

// })

// let like_icon = Array.from(document.getElementsByClassName('like_icon'));



// like_icon.forEach((item, index) => {
//     item.addEventListener('click', () => {

//         let effect = document.getElementsByClassName('bi-hearts')[index];
//         if (item.className == 'like_icon bi bi-heart') {
//             item.classList.remove('bi-heart');
//             item.classList.add('bi-heart-fill');

//             effect.classList.add('like-effect');

//             console.log(document.getElementsByClassName('bi-hearts')[index].className);
//         }
//         else {
//             effect.classList.remove('like-effect');
//             item.classList.remove('bi-heart-fill');
//             item.classList.add('bi-heart');
//         }

//     })
// })

let add_icon =Array.from(document.getElementsByClassName('bi-plus-circle'));
let add_menu=Array.from(document.getElementsByClassName('add_menu'));

add_icon.forEach((item, index) => {
    item.addEventListener( 'click', async () => {
        if(document.getElementById('useremail').innerHTML=='Login'){
            fun1();
         
        }
        else{
        let menu = add_menu[index];
        console.log(item.id)
       
        console.log(add_menu[index]);

        if (menu.className == 'add_menu hide') {
            add_menu.map((obj)=>{
                obj.classList.remove('show');
                obj.classList.add('hide');
            })
            menu.classList.remove('hide');
            menu.classList.add('show');
        }
        else {
            menu.classList.remove('show');
            menu.classList.add('hide');
        }

        document.addEventListener('click',(e)=>{
            if(e.target.id !== item.id ){
                menu.classList.remove('show');
                menu.classList.add('hide');
            }
        })

    }
})
})



console.log('ok');


let like_icon =Array.from(document.getElementsByClassName('like_icon'));
let plus_icon =Array.from(document.getElementsByClassName('plus_icon'));

// console.log(like_icon[32]);

// let hi = new Audio('../songs/song5.mp3');
// hi.play();

like_icon.forEach( (item,index) => {
    item.addEventListener('click',async ()=>{
        // console.log(item.className)
        // console.log(item.id);
        // console.log(index)
        // console.log(document.getElementById('user').innerText)
        let effect = document.getElementsByClassName('bi-hearts')[index];
        if(item.className == 'like_icon bi bi-heart'){
            
            // console.log(document.getElementById('user').innerHTML)
            if(document.getElementById('useremail').innerHTML=='Login'){
                fun1();
             
            }
            else{
                item.classList.remove('bi-heart');
            item.classList.add('bi-heart-fill');
            
            effect.classList.add('like-effect');
                await axios.post('/likes',{
                    "id":item.id,
                    "user_email":document.getElementById('useremail').innerHTML
                }).then((res)=>{
                    // console.log(res);
                    // res.redirect('/login')
                })
            }
            // console.log(document.getElementsByClassName('bi-hearts')[index].className);
        }
        else{
            effect.classList.remove('like-effect');
            item.classList.remove('bi-heart-fill');
            item.classList.add('bi-heart');
        }
       
    })
})
let downloadbtn=document.getElementById('downloadbtn');
downloadbtn.addEventListener('click', async ()=>{
    if(document.getElementById('user').innerHTML=='Login'){
       fun1();
     
    }
    else{
        
          var data_download=document.getElementById('user').innerHTML;
          var email_download=document.getElementById('useremail').innerHTML;
          var flag_check=false;
          await axios.post('/checksubscription',{
            email:email_download
          }).then(async (res)=>{
            console.log(res.data)
            if(res.data==true){

                const options = {
                    method: 'GET',
                    url: 'https://youtube-music1.p.rapidapi.com/v2/search',
                    params: {query: download_song},
                    headers: {
                      'X-RapidAPI-Key': '6a470279c7mshc24e7631ba39188p13309ajsna8c3e521439b',
                      'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                    }
                  };
                   var download_id;
                   await axios.request(options).then(function (response) {
                      // console.log(response.data.result.songs[0].id)
                      // console.log(response.result.songs[0].id)
                      download_id=response.data.result.songs[0].id;
                      console.log(download_id);
                  }).catch(function (error) {
                      console.error(error);
                  });
                  
                  const options1 = {
                      method: 'GET',
                      url: 'https://youtube-music1.p.rapidapi.com/get_download_url',
                      params: {id:download_id, ext: 'mp3'},
                      headers: {
                        'X-RapidAPI-Key': '6a470279c7mshc24e7631ba39188p13309ajsna8c3e521439b',
                        'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
                      }
                    };
                    var download_url;
                    await axios.request(options1).then(function (response) {
                      // console.log(response.data.result.download_url);
                        download_url=response.data.result.download_url;
                        window.open(download_url)
                        console.log(download_url)
                    }).catch(function (error) {
                        console.error(error);
                    });
            }
            else{
             fun("");
             closePopup('playlistname');
            closePopup('existingplaylist');
            }
          })
         


  
    }
})


// console.log('ok');


// const getlikebtn=document.getElementById('getlikes');
// getlikebtn.addEventListener('click',
// async function getlikes(){
//     let data;
//     await axios.post('/likes/getlikes',{
//         "username":document.getElementById('user').innerHTML
        
//     })
//     .then((res)=>{
//         console.log(res)
//         data=res
       
//     })
//     // document.getElementById('1').innerHTML=data.lk[0];
//     // document.getElementById('2').innerHTML=data.lk[0];
//     // document.getElementById('3').innerHTML=data.lk[0];



// })


// let btn_user=document.getElementById('userpage');
// btn_user.addEventListener('click',async ()=>{
// console.log(document.getElementById('user').innerHTML)
// await axios.post('/likes/getlikes',{
//     "username":document.getElementById('user').innerHTML
// })
// .then((res)=>{
//     if(res){
//         window.open('/inm')
//     }
// })
// })

function fun(s){
   
        let btn=document.getElementsByClassName('popup')[0];
        btn.classList.remove('close');
        btn.classList.add('show')
    
 }
 document.getElementById('close').addEventListener('click',()=>{closePopup('popup')});
//  btn_times.addEventListener('click', function fun2(){
//     console.log('mc')
//     let bt=document.getElementsByClassName('popup')[0];
//     bt.classList.remove('show');
//    bt.classList.add('close')
// })



function fun1(s){
    if(s!=""){
        document.getElementById("downloadtext").innerHTML=s;
        document.getElementById("secondline").innerHTML="";
        // document.getElementById("subscribebtn").style.display="none";
        document.getElementsByClassName("popup").width="10px";
        let btn=document.getElementsByClassName('popupforlogin')[0];
    btn.classList.remove('close');
    btn.classList.add('show')
    }
    else{
    let btn=document.getElementsByClassName('popupforlogin')[0];
    btn.classList.remove('close');
    btn.classList.add('show')
    }
 }




 let btn_times1=document.getElementById('close1');
 btn_times1.addEventListener('click', function fun2(){
    console.log('mc')
    let bt=document.getElementsByClassName('popupforlogin')[0];
    bt.classList.remove('show');
   bt.classList.add('close')
})

let subscribebtn=document.getElementById('subscribebtn');
subscribebtn.addEventListener('click',()=>{
    window.open('http://localhost:3000/payment')
})



// let userbtn=document.getElementById('userpage');
// userbtn.addEventListener('click',async ()=>{
//     let usename=document.getElementById('user').innerHTML;
//     let useemail=document.getElementById('useremail').innerHTML;
//     if(usename=="Login"){
//         fun1("You have to Login first");
//     }
//     // if(document.getElementById('user').innerHTML=='Login'){
//     //     alert('You have to login first')
//     // }
//     // else{
//     //     await axios.post('/getuser',{
//     //        useremail:document.getElementById('useremail').innerHTML,
//     //        username:document.getElementById('user').innerHTML
//     //     }).then((res)=>{
//     //         console.log(res);
//     //     })
//     // }
//     // window.open='/getuser'
//     else{
//         window.location=`/user/?name=${usename}&email=${useemail}`
//     }

   
// })



// let playlistaddbtn=document.getElementById('add-playlist');
// playlistaddbtn.addEventListener('click',()=>{

// })
// plus_icon.forEach( (item,index) => {
//     item.addEventListener('click',async ()=>{
//         if(document.getElementById('useremail').innerHTML=='Login'){
//             fun1();
//         }
//         else{
//             await axios.post('/postplaylistsong',{
//                 "id":item.id,
//                 "playuser":document.getElementById('useremail').innerHTML
//             }).then((res)=>{
//             })
//         }
//     })
// })


// let profilebtn=document.getElementById('profilepage');
// profilebtn.addEventListener('click',()=>{
//     let usename=document.getElementById('user').innerHTML;
//     let useemail=document.getElementById('useremail').innerHTML;
//     if(usename=="Login"){
//         fun1("You have to Login first");
//     }
//     // if(document.getElementById('user').innerHTML=='Login'){
//     //     alert('You have to login first')
//     // }
//     // else{
//     //     await axios.post('/getuser',{
//     //        useremail:document.getElementById('useremail').innerHTML,
//     //        username:document.getElementById('user').innerHTML
//     //     }).then((res)=>{
//     //         console.log(res);
//     //     })
//     // }
//     // window.open='/getuser'
//     else{
//         window.location=`/user/?name=${usename}&email=${useemail}`
//     }
// })

let newplaylistarray = Array.from(document.getElementsByClassName('newplaylist'));
let existone = Array.from(document.getElementsByClassName('existone'));

// closePopup('playlistname');
// closePopup('existingplaylist');

document.getElementById('close2').addEventListener('click',()=>{
    closePopup('playlistname');
});
document.getElementById('close3').addEventListener('click',()=>{
    closePopup('existingplaylist');
});

function closePopup(popupBox){
    
        let playlistname = document.getElementsByClassName(popupBox)[0];
        // console.log(popupBox);
        playlistname.classList.remove('show')
        playlistname.classList.add('close')
    
}


// let closePlaylistPopup = document.getElementById('close2');

// closePlaylistPopup.addEventListener('click',()=>{
//     let playlistname1 = document.getElementsByClassName('playlistname')[0];
    
//     playlistname1.classList.remove('show')
//     playlistname1.classList.add('close')
// })
// let closePlaylistPopup1 = document.getElementById('close3');

// closePlaylistPopup1.addEventListener('click',()=>{
//     let playlistname1 = document.getElementsByClassName('existingplaylist')[0];
    
//     playlistname1.classList.remove('show')
//     playlistname1.classList.add('close')
// })

newplaylistarray.forEach((item) => {
    item.addEventListener('click', (ele,index) => {
        // document.getElementById("downloadtext").innerHTML="Please enter playlist name";
        // document.getElementById("secondline").innerHTML="";
        // // document.getElementById("subscribebtn").style.display="none";
        // document.getElementsByClassName("popup").width="10px";
        let btn=document.getElementsByClassName('playlistname')[0];
        
        btn.classList.remove('close');
        btn.classList.add('show')
        closePopup('popup')
        closePopup('existingplaylist');
        
        document.getElementById('hiddenlink').innerHTML=`${ele.target.id}`
        console.log("id print here "+ ele.target.id);
        
    })
})
existone.forEach((item) => {
    item.addEventListener('click', async (ele,index) => {
        let btn=document.getElementsByClassName('existingplaylist')[0];
        
        btn.classList.remove('close');
        btn.classList.add('show')
        closePopup('popup')
        closePopup('playlistname');

let useremail=document.getElementById('useremail').innerHTML
        await axios.post('/getexistplaylist',{
            useremail:useremail,
            song_name:ele.target.id,
           }).then((res)=>{
            let form=document.getElementsByClassName('form')[3];
            let allplaylist=res.data.list;
            form.innerHTML=""
            form.innerHTML+=`<h4 id="h2inexist">Select Playlists</h4>`
            allplaylist.map((e)=>{
                form.innerHTML+=`
         <li><a id="${e.name}" class="existinglist">${e.name}</a></li>
                `
            })
            let datalist=Array.from(document.getElementsByClassName('existinglist'));

            datalist.forEach((e)=>{
                
             e.addEventListener('click',async (element,index)=>{
               await axios.post('/addtoexistingplaylist',{
                useremail:useremail,
                list_name:element.target.id,
                songname:ele.target.id
               })
               .then((res)=>{
                let btn=document.getElementsByClassName('existingplaylist')[0];
        
                btn.classList.remove('show')
                btn.classList.add('close');
                alert(`Song has been added to ${element.target.id}`)
               })
             })
            })


      
            
          })

        })
    })








let createplaylist=document.getElementById('createbutton')
   createplaylist.addEventListener('click',async ()=>{
    let playlist_name=document.getElementById('newname').value;
    if(playlist_name==""){
        alert('Please enter playlist name')
    }
    else{
        console.log(playlist_name)
        await axios.post('/createnewplaylist',{
            playlist_name:playlist_name,
            song_url:document.getElementById('hiddenlink').innerHTML,
            useremail:document.getElementById('useremail').innerHTML
            }).then((res)=>{
                console.log(res)
                if(res.data.flag==false){
                    alert('create a playlist with other name.Playlist with same name exist')
                    let playlistname1 = document.getElementsByClassName('playlistname')[0];
                    playlistname1.classList.remove('show')
                    playlistname1.classList.add('close')
                }
                else{
                    let playlistname1 = document.getElementsByClassName('playlistname')[0];
                    playlistname1.classList.remove('show')
                    playlistname1.classList.add('close')
                    alert('Playlist has created')
                }
            
            }).catch((err)=>{
            alert('there is some error contact admin')
            })
    }
      
   })


let sbtn= document.getElementById('sbtn');
sbtn.addEventListener('click',()=>{
    console.log("gofun");
    let container = document.getElementsByClassName('container')[0];
    let user = document.getElementsByClassName("usercontainer")[0];

    if(container.className == 'container show' && user.className=='usercontainer userhide'){
        container.classList.remove('show');
        user.classList.remove('userhide');
        container.classList.add('hide');
        user.classList.add('usershow');
    }else{
        user.classList.remove('usershow');
        container.classList.remove('hide');
        user.classList.add('userhide');
        container.classList.add('show');
    }
})


console.log('ok');

