import songapi from './songapi.json' assert {type: 'json'};
import hothitshindi from './json/hothitshindi.json' assert {type: 'json'};
import topsongindia from './json/topsongindia.json' assert {type: 'json'};
import topsongglobal from './json/topsongglobal.json' assert {type: 'json'};

// imprting json files


// code for working of sliding buttons for each list
let my_list_length=document.getElementsByClassName('songs').length;
for (let i=0; i<my_list_length;i++){
    
    let go_left = document.getElementsByClassName('bi-chevron-left')[i];
    let go_right = document.getElementsByClassName('bi-chevron-right')[i];
    let my_list = document.getElementsByClassName('songs')[i];

    go_left.addEventListener('click', ()=>{
        my_list.scrollLeft -= 660;
    })

    go_right.addEventListener('click', ()=>{
        my_list.scrollLeft += 660;
    })
}


// [...] to make clone
let api = [...songapi]
let hotHitsHindi = [...hothitshindi];
let topSongIndia = [...topsongindia];
let topSongGlobal = [...topsongglobal];
console.log(hotHitsHindi);
console.log(api);

for(let i=0;i<api.length;i++){
    let index = "index";
    let val = i;
    api[i][index] = val;
}
console.log(api);


let tar1 = document.getElementById('list01').getElementsByClassName('songs')[0];

for(let i=0;i<40;i++){
    let trackArtists = '';
    hotHitsHindi[i].track.artists.map((obj)=>{
        trackArtists += obj.name + ', ';
    });
    tar1.innerHTML+=`<li class="song" ">
    <div class="image_play">
        <img src="${hotHitsHindi[i].track.album.images[0].url}" alt="">
        <img class="play_icon" id="${hotHitsHindi[i].track.id}" src="../images/play.svg" alt="">
        <i class="like_icon bi bi-heart"></i>
        <i class="bi bi-hearts"></i>
        <i class="bi bi-plus-circle"></i>
    </div>
    <div>
        <h5><b> ${hotHitsHindi[i].track.name} </b></h5>
        <h5>${trackArtists.slice(0,-2)}</h5>
    </div>
</li>`
}

let tar2 = document.getElementById('list02').getElementsByClassName('songs')[0];

for(var i=20;i>=0;i--){   
    tar2.innerHTML+=`<li class="song" ">
    <div class="image_play">
        <img src="${topSongIndia[i].track.album.images[0].url}" alt="">
        <img class="play_icon" id="${topSongIndia[i].track.id}" src="../images/play.svg" alt="">
        <i class="like_icon bi bi-heart"></i>
        <i class="bi bi-hearts"></i>
        <i class="bi bi-plus-circle"></i>
    </div>
    <div>
        <h5>${topSongIndia[i].track.name}</h5>
    </div>
</li>`
}

let tar3 = document.getElementById('list03').getElementsByClassName('songs')[0];

let sapi = [...songapi]
shuffleArray(sapi)

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

for(var i=0;i<20;i++){
    tar3.innerHTML+=`<li class="song" ">
    <div class="image_play">
        <img src="${sapi[i].artworkUrl}" alt="">
        <img class="play_icon" id="${sapi[i].id}" src="../images/play.svg" alt="">
        <i class="like_icon bi bi-heart"></i>
        <i class="bi bi-hearts"></i>
        <i class="bi bi-plus-circle"></i>
    </div>
    <div>
        <h5>${sapi[i].title}</h5>
    </div>
</li>`
}


let tar_queue=document.getElementsByClassName('queue')[0];
function add_track_in_queue(song_id){
        let songname = api.find((e) => {
        return e.id==song_id;
    })
    document.getElementsByClassName('queue')[0].innerHTML+=`<li class="song">
        <div class="image_play">
        <img src="${songname.artworkUrl}" alt="">
        <img class="play_icon" id="${songname.id}" src="../images/play.svg" alt="">
    </div>
    <div>
        <h4>${songname.title}</h4>
    </div>
    <i class="bi bi-plus-circle"></i>
    </li>`
}



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

const music = new Audio();
let current_song_index=0;

let music_play_icon = document.getElementById('music_play_icon');

music_play_icon.addEventListener('click', ()=>{
    if(music.paused || music.currentTime<=0){
        music.play();
        music_play_icon.classList.remove('bi-play-fill');
        music_play_icon.classList.add('bi-pause-fill');
    }else{
        music.pause();
        music_play_icon.classList.add('bi-play-fill');
        music_play_icon.classList.remove('bi-pause-fill');    
    }
})

async function myfun(id){
    const tracks = {
        method: 'GET',
        url: 'https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata',
        params: {track: id},
        headers: {
          'X-RapidAPI-Key': '4a49e5c414msh16c08ef3c3094c1p103c2djsne2ac2f815c89',
          'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
        }
      };
      let song_url ;
      await axios.request(tracks).then(function (response) {
          console.log(response.data);
          song_url = response.data.audio[0].url;
      }).catch(function (error) {
          console.error(error);
      });
      
      return song_url;
}



let song_array= Array.from(document.getElementsByClassName('play_icon'));
let current_image= document.getElementById('current_image');
let current_song= document.getElementById('current_song');
// console.log(song_array[4]);

async function playsong(song_id){
    let songname = api.find((e) => {
        return e.id==song_id;
    })
    console.log(songname);
current_image.src= songname.artworkUrl;
current_song.innerHTML=`<h4>${songname.title}</h4><h5>${songname.artist}</h5>`
current_song_index=songname.index;
console.log("this is " + current_song_index);

let song_url = await myfun(song_id);
console.log(song_url);
music.src=song_url;
music.play();
music_play_icon.classList.remove('bi-play-fill');
music_play_icon.classList.add('bi-pause-fill');
}

playplaylist(song_array);

async function playplaylist(array) {
    array.forEach((item) => {
        item.addEventListener('click', async (ele) => {
            
            let song_id = ele.target.id;
            playsong(song_id);
            add_track_in_queue(song_id);
            allPlayButton();
            item.src=`../images/pause.svg`
        })
    })
    
}

function allPlayButton(){
    let myArray = Array.from(document.getElementsByClassName('play_icon'));
    myArray.forEach((ele) =>{
        ele.src=`../images/play.svg`
    })
}


let current_time = document.getElementById('current_time');
let end_time = document.getElementById('end_time');

let played_length = document.getElementById('played_length');
let  bar= document.getElementById('bar');


let music_current_time = music.currentTime;
let music_end_time = music.duration;


if(Math.floor(music_current_time) == Math.floor(music_end_time)){
    console.log("song enddd")
    playNextSong();
}

music.addEventListener('timeupdate', async ()=>{

    let music_current_time = music.currentTime;
    let music_end_time = music.duration;

    let current_minutes = Math.floor(music_current_time/60 );
    let current_seconds = Math.floor(music_current_time%60 );

    let end_minutes = Math.floor(music_end_time/60 );
    let end_seconds = Math.floor(music_end_time%60 );

    if(current_seconds < 10) current_seconds = `0${current_seconds}`;
    if(end_seconds < 10) end_seconds = `0${end_seconds}`;

    current_time.innerHTML = `${current_minutes}:${current_seconds}`
    if(music_end_time){
        end_time.innerHTML = `${end_minutes}:${end_seconds}`;
    }
    

    let current_length = parseInt((music_current_time / music_end_time)*100);
    

    if(music_end_time){
        played_length.value = current_length;
    }

    if(music_current_time == music_end_time){
        console.log("song enddd")
        playNextSong();
    }
    // for auto play

    bar.style.width= `${played_length.value}%`

});

played_length.addEventListener("input", ()=>{
    music.currentTime =  played_length.value * music.duration / 100;
})


 let play_next = document.getElementById('play_next');
 let play_back = document.getElementById('play_back');


 
play_back.addEventListener('click', () => {
    current_song_index--;
    console.log(current_song_index)
    if(current_song_index<0){
        current_song_index = 19;
    }
    let song_id = api[current_song_index].id;
        playsong(song_id);
})

play_next.onclick = function(){playNextSong()}

function playNextSong(){
    current_song_index++;
    console.log(current_song_index)
    if(current_song_index>api.length){
        current_song_index = 0;
    }
    let song_id = api[current_song_index].id;
    
    playsong(song_id);

}


let queue_icon = document.getElementsByClassName("bi-music-note-list")[0];



let c=1;
queue_icon.addEventListener('click', () => {
    if(c>0){
        tar_queue.classList.add("big");
        c=-c;
    }else{
        tar_queue.classList.remove("big");
        c=-c;
    }
    
})

let like_icon =Array.from(document.getElementsByClassName('like_icon'));



like_icon.forEach( (item,index) => {
    item.addEventListener('click',()=>{
        
        let effect = document.getElementsByClassName('bi-hearts')[index];
        if(item.className == 'like_icon bi bi-heart'){
            item.classList.remove('bi-heart');
            item.classList.add('bi-heart-fill');
            
            effect.classList.add('like-effect');
            
            console.log(document.getElementsByClassName('bi-hearts')[index].className);
        }
        else{
            effect.classList.remove('like-effect');
            item.classList.remove('bi-heart-fill');
            item.classList.add('bi-heart');
        }
       
    })
})



console.log('ok');
