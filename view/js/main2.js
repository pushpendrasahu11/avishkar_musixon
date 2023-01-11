
// import songapi from './songapi.json' assert {type: 'json'};
import hothitshindi from './json/hothitshindi.json' assert {type: 'json'};
import topsongindia from './json/topsongindia.json' assert {type: 'json'};
import topsongglobal from './json/topsongglobal.json' assert {type: 'json'};
import newmusicindia from './json/newmusicindia.json' assert {type: 'json'};
// import { getTrackDetail } from '../js/mainData.js';
import { playTrack, updateTime, playNextSong, playPreviousSong } from '../js/player.js';
// import { update } from 'tar';

// imprting json files


let contentArray=[];
let contentArrayName=[];

let trendingnow;
let bestofromance;
let bestofdance;
let hindiretro;
let punjabisongs;
let toptamil;
let toptelugu;

// export async function playlist(){
    
  
    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/trending_today/I3kvhipIy73uCJW60TJk1Q__`).then(function (response) {
      console.log(response.data);
      trendingnow=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/romantic_top_40/m9Qkal5S733ufxkxMEIbIw__`).then(function (response) {
      console.log(response.data);
      bestofromance=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/best-of-dance---hindi/qVvfieICUY5ieSJqt9HmOQ__`).then(function (response) {
      console.log(response.data);
      bestofdance=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/latest-punjabi-hits/T,w3Z-u7t6A_`).then(function (response) {
      console.log(response.data);
      punjabisongs=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/house-party---tamil/,9s3E3l5o0lFo9wdEAzFBA__`).then(function (response) {
      console.log(response.data);
      toptamil=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/pakka-beat/t7M-TsljMEPuCJW60TJk1Q__`).then(function (response) {
      console.log(response.data);
      toptelugu=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/hindi_retro/dYn-,-QcKzA_`).then(function (response) {
      console.log(response.data);
      hindiretro=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });
    
  
//     return trackDetail;
//   }

let trendingNow = [...trendingnow];
contentArray.push(trendingNow);
contentArrayName.push("Trending Now");

let bestOfRomance = [...bestofromance];
contentArray.push(bestOfRomance);
contentArrayName.push("Best Of Romance");

let bestOfDance = [...bestofdance];
contentArray.push(bestOfDance);
contentArrayName.push("Best Of Dance");

let punjabiSongs = [...punjabisongs];
contentArray.push(punjabiSongs);
contentArrayName.push("Punjabi Songs");

let topTamil = [...toptamil];
contentArray.push(topTamil);
contentArrayName.push("Tamil Songs");

let topTelugu = [...toptelugu];
contentArray.push(topTelugu);
contentArrayName.push("Telugu Songs");

let hindiRetro = [...hindiretro];
contentArray.push(hindiRetro);
contentArrayName.push("Hindi Retro");
// let topSongGlobal = [...topsongglobal];
// contentArray.push(topSongGlobal);
// contentArrayName.push("Top Song Global");

// let topSongIndia = [...topsongindia];
// contentArray.push(topSongIndia);
// contentArrayName.push("Top Song India");

// let newMusicIndia = [...newmusicindia];
// contentArray.push(newMusicIndia);
// contentArrayName.push("New Music India");

// let hotHitsHindi = [...hothitshindi];
// contentArray.push(hotHitsHindi);
// contentArrayName.push("Hot Hits Hindi");


// console.log(hotHitsHindi);
// console.log(api);

// for (let i = 0; i < api.length; i++) {
//     let index = "index";
//     let val = i;
//     api[i][index] = val;
// }
// console.log(api);

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
        // let trackArtists = '';
        // contentArray[i][j].track.artists.map((obj) => {
        //     trackArtists += obj.name + ', ';
        // });
        tar.innerHTML += `<li class="song" >
        <div class="image_play">
            <img src="${contentArray[i][j].image}" alt="">
            <img class="play_icon" id="${contentArray[i][j].song}" src="../images/play.svg" alt="">
            <i class="like_icon bi bi-heart"></i>
            <i class="bi bi-hearts"></i>
            <i class="bi bi-plus-circle"></i>
            <ul class="add_menu hide">
            
             <li><a href="">New playlist</a></li>
             <li><a href="">Existing playlist</a></li>
             
            </ul>
        </div>      
        <div>
            <h5 style="font-size:15px;" >${contentArray[i][j].song}</h5>
            <h5>${contentArray[i][j].primary_artists}</h5>
        </div>
        
    </li>`
    }

}


{/* <ul class="add_menu">
             
             <li><a href="">New playlist</a></li>
             <li><a href="">playlist1</a></li>
             <li><a href="">playlist2</a></li>
             <li><a href="">playlist3</a></li>
         
          </ul> */}

// let tar1 = document.getElementById('list01').getElementsByClassName('songs')[0];

// for (let i = 0; i <= 20; i++) {
//     let trackArtists = '';
//     hotHitsHindi[i].track.artists.map((obj) => {
//         trackArtists += obj.name + ', ';
//     });
//     tar1.innerHTML += `<li class="song" ">
//     <div class="image_play">
//         <img src="${hotHitsHindi[i].track.album.images[0].url}" alt="">
//         <img class="play_icon" id="${hotHitsHindi[i].track.id}" src="../images/play.svg" alt="">
//         <i class="like_icon bi bi-heart"></i>
//         <i class="bi bi-hearts"></i>
//         <i class="bi bi-plus-circle"></i>
//     </div>
//     <div>
//         <h5><b> ${hotHitsHindi[i].track.name} </b></h5>
//         <h5>${trackArtists.slice(0, -2)}</h5>
//     </div>
// </li>`
// }

// let tar2 = document.getElementById('list02').getElementsByClassName('songs')[0];

// for (let i = 0; i <= 20; i++) {
//     tar2.innerHTML += `<li class="song" ">
//     <div class="image_play">
//         <img src="${topSongIndia[i].track.album.images[0].url}" alt="">
//         <img class="play_icon" id="${topSongIndia[i].track.id}" src="../images/play.svg" alt="">
//         <i class="like_icon bi bi-heart"></i>
//         <i class="bi bi-hearts"></i>
//         <i class="bi bi-plus-circle"></i>
//     </div>
//     <div>
//         <h5>${topSongIndia[i].track.name}</h5>
//     </div>
// </li>`
// }

// let tar3 = document.getElementById('list03').getElementsByClassName('songs')[0];

// // let sapi = [...songapi]
// // shuffleArray(sapi)

// // function shuffleArray(array) {
// //     for (let i = array.length - 1; i > 0; i--) {
// //         var j = Math.floor(Math.random() * (i + 1));
// //         var temp = array[i];
// //         array[i] = array[j];
// //         array[j] = temp;
// //     }
// // }

// for (let i = 0; i < 20; i++) {
//     tar3.innerHTML += `<li class="song" ">
//     <div class="image_play">
//         <img src="${topSongGlobal[i].track.album.images[0].url}" alt="">
//         <img class="play_icon" id="${topSongGlobal[i].track.id}" src="../images/play.svg" alt="">
//         <i class="like_icon bi bi-heart"></i>
//         <i class="bi bi-hearts"></i>
//         <i class="bi bi-plus-circle"></i>
//     </div>
//     <div>
//         <h5>${topSongGlobal[i].track.name}</h5>
//     </div>
// </li>`
// }

// let tar4 = document.getElementById('list04').getElementsByClassName('songs')[0];

// for (let i = 0; i <= 20; i++) {
//     tar4.innerHTML += `<li class="song" ">
//     <div class="image_play">
//         <img src="${newMusicIndia[i].track.album.images[0].url}" alt="">
//         <img class="play_icon" id="${newMusicIndia[i].track.id}" src="../images/play.svg" alt="">
//         <i class="like_icon bi bi-heart"></i>
//         <i class="bi bi-hearts"></i>
//         <i class="bi bi-plus-circle"></i>
//     </div>
//     <div>
//         <h5>${newMusicIndia[i].track.name}</h5>
//     </div>
// </li>`
// }

// let tar_queue=document.getElementsByClassName('queue')[0];
// function add_track_in_queue(song_id){
//         let songname = api.find((e) => {
//         return e.id==song_id;
//     })
//     document.getElementsByClassName('queue')[0].innerHTML+=`<li class="song">
//         <div class="image_play">
//         <img src="${songname.artworkUrl}" alt="">
//         <img class="play_icon" id="${songname.id}" src="../images/play.svg" alt="">
//     </div>
//     <div>
//         <h4>${songname.title}</h4>
//     </div>
//     <i class="bi bi-plus-circle"></i>
//     </li>`
// }



// for(let i=0;i<api.length;i++){
//     let songname = api.find((e) => {
//         return e.id==song_id;
//     })
//         tar_queue.innerHTML+=`<li class="song">
//         <div class="image_play">
//             <img src="${api[i].artworkUrl}" alt="">
//             <img class="play_icon" id="${api[i].id}" src="../images/play.svg" alt="">
//         </div>
//         <div>
//             <h4>${api[i].title}</h4>
//         </div>
//         <i class="bi bi-plus-circle"></i>
//     </li>`
// }

// let artistdata = artists;
// let tar_artist=document.getElementsByClassName('artists')[0];

// for(let i=0;i<artistdata.length;i++){

//         tar_artist.innerHTML+=`<li id="artist${artistdata[i].id}">
//         <div class="image_play">
//             <img src="${artistdata[i].artist_image}" alt="">
//             <img class="play_artist" id="${songs[i].id}" src="../images/play.svg" alt="">
//         </div>
//             ${artistdata[i].artist_name}
//     </li>`
// }

// playing song

var music = new Audio('../songs/song1.mp3');
let current_song_index = 0;

let music_play_icon = document.getElementById('music_play_icon');

music_play_icon.addEventListener('click', () => {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        music_play_icon.classList.remove('bi-play-fill');
        music_play_icon.classList.add('bi-pause-fill');
    } else {
        music.pause();
        music_play_icon.classList.add('bi-play-fill');
        music_play_icon.classList.remove('bi-pause-fill');
    }
})

// async function myfun(id){
//     const tracks = {
//         method: 'GET',
//         url: 'https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata',
//         params: {track: id},
//         headers: {
//           'X-RapidAPI-Key': '4a49e5c414msh16c08ef3c3094c1p103c2djsne2ac2f815c89',
//           'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
//         }
//       };
//       let song_url ;
//       await axios.request(tracks).then(function (response) {
//           console.log(response.data);
//           song_url = response.data.audio[0].url;
//       }).catch(function (error) {
//           console.error(error);
//       });

//       return song_url;
// }



let song_array = Array.from(document.getElementsByClassName('play_icon'));
let current_image = document.getElementById('current_image');
let current_song = document.getElementById('current_song');
// console.log(song_array[4]);

// async function playsong(song_id){
//     let songname = api.find((e) => {
//         return e.id==song_id;
//     })
//     console.log(songname);
// current_image.src= songname.artworkUrl;
// current_song.innerHTML=`<h4>${songname.title}</h4><h5>${songname.artist}</h5>`
// current_song_index=songname.index;
// console.log("this is " + current_song_index);

// let song_url = await myfun(song_id);
// console.log(song_url);
// music.src=song_url;
// music.play();
// music_play_icon.classList.remove('bi-play-fill');
// music_play_icon.classList.add('bi-pause-fill');
// }

playplaylist(song_array);

async function playplaylist(array) {
    array.forEach((item) => {
        item.addEventListener('click', async (ele) => {

            playTrack(ele.target.id,music);
            console.log("id is here "+ ele.target.id);
            allPlayButton();
            item.src = `../images/pause.svg`
        })
    })

}

function allPlayButton() {
    let myArray = Array.from(document.getElementsByClassName('play_icon'));
    myArray.forEach((ele) => {
        ele.src = `../images/play.svg`
    })
}


let current_time = document.getElementById('current_time');
let end_time = document.getElementById('end_time');

let playedLength = document.getElementById('played_length');
let bar = document.getElementById('bar');


let music_current_time = music.currentTime;
let music_end_time = music.duration;


// if(Math.floor(music_current_time) == Math.floor(music_end_time)){
//     console.log("song enddd")
//     playNextSong();
// }

console.log('ye nhi chala')
updateTime(music);
console.log('ye chala')









let playNext = document.getElementById('play_next');
let playBack = document.getElementById('play_back');


playBack.onclick = function () { playPreviousSong(music) }
playNext.onclick = function () { playNextSong(music) }



// play_back.addEventListener('click', () => {
//     current_song_index--;
//     console.log(current_song_index)
//     if(current_song_index<0){
//         current_song_index = 19;
//     }
//     let song_id = api[current_song_index].id;
//         playsong(song_id);
// })

// play_next.onclick = function(){playNextSong()}

// function playNextSong(){
//     current_song_index++;
//     console.log(current_song_index)
//     if(current_song_index>api.length){
//         current_song_index = 0;
//     }
//     let song_id = api[current_song_index].id;

//     playsong(song_id);

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


let queue_icon = document.getElementsByClassName("bi-music-note-list")[0];
let tar_queue=document.getElementsByClassName('queue')[0];


let c = 1;
queue_icon.addEventListener('click', () => {
    if (c > 0) {
        tar_queue.classList.add("big");
        c = -c;
    } else {
        tar_queue.classList.remove("big");
        c = -c;
    }

})

let like_icon = Array.from(document.getElementsByClassName('like_icon'));



like_icon.forEach((item, index) => {
    item.addEventListener('click', () => {

        let effect = document.getElementsByClassName('bi-hearts')[index];
        if (item.className == 'like_icon bi bi-heart') {
            item.classList.remove('bi-heart');
            item.classList.add('bi-heart-fill');

            effect.classList.add('like-effect');

            console.log(document.getElementsByClassName('bi-hearts')[index].className);
        }
        else {
            effect.classList.remove('like-effect');
            item.classList.remove('bi-heart-fill');
            item.classList.add('bi-heart');
        }

    })
})

let add_icon =Array.from(document.getElementsByClassName('bi-plus-circle'));
let add_menu=Array.from(document.getElementsByClassName('add_menu'));

add_icon.forEach((item, index) => {
    item.addEventListener( 'click', () => {

        let menu = add_menu[index];
        console.log(item)
       
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
            // add_menu.map((obj)=>{
            //     obj.classList.remove('hide');
            //     obj.classList.add('show');
            // })
            menu.classList.remove('show');
            menu.classList.add('hide');
        }
    })
})

console.log('ok');
