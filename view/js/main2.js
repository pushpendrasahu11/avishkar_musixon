
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


    await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/trending_today/I3kvhipIy73uCJW60TJk1Q__`).then(function (response) {
      console.log(response.data);
      trendingnow=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/romantic_top_40/m9Qkal5S733ufxkxMEIbIw__`).then(function (response) {
    //   console.log(response.data);
    //   bestofromance=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/best-of-dance---hindi/qVvfieICUY5ieSJqt9HmOQ__`).then(function (response) {
    //   console.log(response.data);
    //   bestofdance=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/latest-punjabi-hits/T,w3Z-u7t6A_`).then(function (response) {
    //   console.log(response.data);
    //   punjabisongs=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/house-party---tamil/,9s3E3l5o0lFo9wdEAzFBA__`).then(function (response) {
    //   console.log(response.data);
    //   toptamil=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/pakka-beat/t7M-TsljMEPuCJW60TJk1Q__`).then(function (response) {
    //   console.log(response.data);
    //   toptelugu=response.data.songs;
    // }).catch(function (error) {
    //   console.error(error);
    // });

    // await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/hindi_retro/dYn-,-QcKzA_`).then(function (response) {
    //   console.log(response.data);
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


let song_array = Array.from(document.getElementsByClassName('play_icon'));
let current_image = document.getElementById('current_image');
let current_song = document.getElementById('current_song');


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


updateTime(music);



let playNext = document.getElementById('play_next');
let playBack = document.getElementById('play_back');


playBack.onclick = function () { playPreviousSong(music) }
playNext.onclick = function () { playNextSong(music) }


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
            menu.classList.remove('show');
            menu.classList.add('hide');
        }
    })
})

console.log('ok');
