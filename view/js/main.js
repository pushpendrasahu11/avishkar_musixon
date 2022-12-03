import songapi from './songapi.json' assert {type: 'json'};

// imprting json files

// console.log(sample.audio[0].url);

// code for working of sliding buttons for each list
let my_list_length=document.getElementsByClassName('songs').length;
for (let i=0; i<my_list_length;i++){
    
    let go_left = document.getElementsByClassName('bi-chevron-left')[i];
    let go_right = document.getElementsByClassName('bi-chevron-right')[i];
    let my_list = document.getElementsByClassName('songs')[i];



    go_left.addEventListener('click', ()=>{
        my_list.scrollLeft -= 730;
    })

    go_right.addEventListener('click', ()=>{
        my_list.scrollLeft += 730;
    })
}


// [...] to make clone
let api = [...songapi]

console.log(api);

for(let i=0;i<api.length;i++){
    let index = "index";
    let val = i;
    api[i][index] = val;
}
console.log(api);


let tar1 = document.getElementById('list01').getElementsByClassName('songs')[0];

for(let i=0;i<20;i++){
    tar1.innerHTML+=`<li class="song" ">
    <div class="image_play">
        <img src="${api[i].artworkUrl}" alt="">
        <img class="play_icon" id="${api[i].id}" src="../images/play.svg" alt="">
        <i class="like_icon bi bi-heart"></i>
        <i class="bi bi-hearts"></i>
        <i class="bi bi-plus-circle"></i>
    </div>
    <div>
        <h4>${api[i].title}</h4>
    </div>
</li>`
}

let tar2 = document.getElementById('list02').getElementsByClassName('songs')[0];

for(var i=20;i>=0;i--){   
    tar2.innerHTML+=`<li class="song" ">
    <div class="image_play">
        <img src="${api[i].artworkUrl}" alt="">
        <img class="play_icon" id="${api[i].id}" src="../images/play.svg" alt="">
        <i class="like_icon bi bi-heart"></i>
        <i class="bi bi-hearts"></i>
        <i class="bi bi-plus-circle"></i>
    </div>
    <div>
        <h4>${api[i].title}</h4>
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
        <h4>${sapi[i].title}</h4>
    </div>
</li>`
}



// let queuedata = songs;

// let tar_queue=document.getElementsByClassName('queue')[0];

// for(let i=0;i<queuedata.length;i++){
    
//         tar_queue.innerHTML+=`<li class="song" id="song${queuedata[i].id}">
//         <div class="image_play">
//             <img src="${queuedata[i].song_image}" alt="">
//             <img class="play_icon" id="${songs[i].id}" src="../images/play.svg" alt="">
//         </div>
//         <div>
//             ${queuedata[i].song_name}
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

const music = new Audio('../songs/song1.mp3');
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
            // console.log(ele.target.id)
        
           
            
            playsong(song_id);
            // console.log(music.src);

            

            // allBackground();
            // let queue_position = document.getElementsByClassName('queue')[0].getElementsByClassName('song')[song_id-1]; 
            // queue_position.style.background = "rgba(230, 230, 230, 0.9)";
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
// function allBackground(){
//     let myArray = Array.from(document.getElementsByClassName('queue')[0].getElementsByClassName('song'));
//     myArray.forEach((ele) =>{
//         ele.style.background = "rgba(230, 230, 230, 0.0)";
//     })
// }

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

    // console.log(played_length.value);
    bar.style.width= `${played_length.value}%`

});

played_length.addEventListener("input", ()=>{
    music.currentTime =  played_length.value * music.duration / 100;
    // console.log(music.currentTime);
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
            // allPlayButton();
            // item.src=`../images/pause.svg`
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
    // console.log(music.src);



    // allBackground();
    // let queue_position = document.getElementsByClassName('queue')[0].getElementsByClassName('song')[song_id-1]; 
    // queue_position.style.background = "rgba(230, 230, 230, 0.9)";
    // allPlayButton();
    // item.src=`../images/pause.svg`
}

// play_next.addEventListener('click', () => {
//     current_song_index++;
//     if(current_song_index>songs.length){
//         current_song_index = 1;
//     }
//     let song_id = current_song_index;
//     console.log("next"+song_id);
//         music.src=`../songs/song${song_id}.mp3`;
//         current_image.src= `../images/song${song_id}.jpg`;
//         let songname = songs.find((e) => {
//             return e.id==song_id;
//         })

//         current_song.innerHTML=songname.song_name; 

//         music.play();
//         music_play_icon.classList.remove('bi-play-fill');
//         music_play_icon.classList.add('bi-pause-fill');
//         // console.log(music.src);

//         // played_length.value=0;

//         allBackground();
//         let queue_position = document.getElementsByClassName('queue')[0].getElementsByClassName('song')[song_id-1]; 
//         queue_position.style.background = "rgba(230, 230, 230, 0.9)";
//         allPlayButton();
//         // item.src=`../images/pause.svg`
// })

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



// let hi = new Audio('../songs/song5.mp3');
// hi.play();

like_icon.forEach( (item,index) => {
    item.addEventListener('click',()=>{
        // console.log(item.className)
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
