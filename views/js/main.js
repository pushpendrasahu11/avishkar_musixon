import songs from './songs.json' assert {type: 'json'};
import artists from './artist.json' assert {type: 'json'};
// imprting json files

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

let data = [...songs];
// [...] to make clone

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

shuffleArray(data);
let tar = document.getElementById('list03').getElementsByClassName('songs')[0];

for(let i=0;i<data.length;i++){
    
    tar.innerHTML+=`<li id="song${data[i].id}">
    <div class="image_play">
        <img src="${data[i].song_image}" alt="">
        <img class="play_icon" src="../images/play.svg" alt="">
    </div>
    <div>
        ${data[i].song_name}
    </div>
</li>`
}

let queuedata = songs;

let tar_queue=document.getElementsByClassName('queue')[0];

for(let i=0;i<queuedata.length;i++){
    
        tar_queue.innerHTML+=`<li id="song${queuedata[i].id}">
        <div class="image_play">
            <img src="${queuedata[i].song_image}" alt="">
            <img class="play_icon" src="../images/play.svg" alt="">
        </div>
        <div>
            ${queuedata[i].song_name}
        </div>
        <i class="bi bi-plus-circle"></i>
    </li>`
}

let artistdata = artists;
let tar_artist=document.getElementsByClassName('artists')[0];

for(let i=0;i<artistdata.length;i++){
    
        tar_artist.innerHTML+=`<li id="artist${artistdata[i].id}">
        <div class="image_play">
            <img src="${artistdata[i].artist_image}" alt="">
            <img class="play_icon" src="../images/play.svg" alt="">
        </div>
            ${artistdata[i].artist_name}
    </li>`
}

