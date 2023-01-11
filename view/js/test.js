import { allDetail } from "./mainData.js";

let bestofdance;
let bestofromance;
export async function playlist(){
  let searchResult;

  await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/best-of-dance---hindi/qVvfieICUY5ieSJqt9HmOQ__`).then(function (response) {
    console.log(response.data);
    bestofdance=response.data.songs;
  }).catch(function (error) {
    console.error(error);
  });

  await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=https://www.jiosaavn.com/featured/pakka-beat/t7M-TsljMEPuCJW60TJk1Q__`).then(function (response) {
      console.log(response.data);
      bestofromance=response.data.songs;
    }).catch(function (error) {
      console.error(error);
    });

}
playlist();
let btn = document.getElementById('btn');

btn.onclick = async function(){

  let sinp = document.getElementById('inp').value;
  let trackInfo = await allDetail(sinp);

  
};




