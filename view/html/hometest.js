let btn=document.getElementById('btn');
btn.addEventListener('click', async ()=>{
let inp=document.getElementById('inp').value; 
var req;
const options1 = {
  method: 'GET',
  url: 'https://soundcloud-scraper.p.rapidapi.com/v1/search/tracks',
  params: {term: inp},
  headers: {
    'X-RapidAPI-Key': '6a470279c7mshc24e7631ba39188p13309ajsna8c3e521439b',
    'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
  }
};

await axios.request(options1).then(function (response) {
	console.log(response.data);
  req=response.data.tracks.items[0].permalink;
  console.log(req);
}).catch(function (error) {
	console.error(error);
});

  var album;
  const options = {
  method: 'GET',
  url: 'https://soundcloud-scraper.p.rapidapi.com/v1/track/metadata',
  params: {track: req},
  headers: {
    'X-RapidAPI-Key': '6a470279c7mshc24e7631ba39188p13309ajsna8c3e521439b',
    'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
  }
};

 await axios.request(options).then(function (response) {
	// console.log(response.data);
  album=response.data.audio[0].url;
  // console.log(album);
}).catch(function (error) {
	console.error(error);
});


const options3 = {
  method: 'GET',
  url: 'https://soundcloud-scraper.p.rapidapi.com/v1/home/details',
  headers: {
    'X-RapidAPI-Key': '6a470279c7mshc24e7631ba39188p13309ajsna8c3e521439b',
    'X-RapidAPI-Host': 'soundcloud-scraper.p.rapidapi.com'
  }
};

let homepage ;

axios.request(options3).then(function (response) {
  console.log("home");
	console.log(response.data.selections);
  homepage = response.data.selections;
}).catch(function (error) {
	console.error(error);
});

// let mainlist = document.getElementById('mainlist');

// mainlist.innerHTML+= <li>
//   <div id="listtitle"></div>
//   <div id="playlisttitle"></div>
//   <div id="songtitle"></div>


// </li>

// // for(let i=0;i<10;i++){
// //   mainlist.innerHTML+= `<li>

// // </li>`
// // }

  let pl=new Audio(album);
// console.log(album+" "+"hello")
pl.play();


})