let trackDetail = {
  trackImage:'',
  trackUrl:'',
  trackTitle:'',
  trackArtists:[],
  trackDuration:''
}


//     const getTrack = {
//         method: 'GET',
//         url: 'https://spotify-scraper.p.rapidapi.com/v1/track/metadata',
//         params: {trackId: trackId},
//         headers: {
//           'X-RapidAPI-Key': 'd75ecb8d4amsh622aa0f617b9177p19e852jsnd433df99e216',
//           'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
//         }
//       };
      
//       let track;

//       await axios.request(getTrack).then(function (response) {
//           console.log(response.data);
//           track=response.data;
//       }).catch(function (error) {
//           console.error(error);
//       });

//       return track;
// }

export async function getTrackDetail(trackName){
  console.log(trackName);
    const getDetail = {
        method: 'GET',
        url: 'https://youtube-music1.p.rapidapi.com/v2/search',
        params: {query: trackName},
        headers: {
          'X-RapidAPI-Key': 'd75ecb8d4amsh622aa0f617b9177p19e852jsnd433df99e216',
          'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
        }
      };
      
      let trackDetail;

      await axios.request(getDetail).then(function (response) {
          console.log(response.data);
          trackDetail=response.data.result.songs[0];
      }).catch(function (error) {
          console.error(error);
      });

      return trackDetail;
}

export async function getTrackUrl(trackId){
  console.log(trackId)
      const getUrl = {
        method: 'GET',
        url: 'https://youtube-music1.p.rapidapi.com/get_download_url',
        params: {id: trackId, ext: 'mp3'},
        headers: {
          'X-RapidAPI-Key': 'd75ecb8d4amsh622aa0f617b9177p19e852jsnd433df99e216',
          'X-RapidAPI-Host': 'youtube-music1.p.rapidapi.com'
        }
      };
      
      let trackUrl;
      await axios.request(getUrl).then(function (response) {
        console.log(response.data);
        trackUrl=response.data.result.download_url;
      }).catch(function (error) {
        console.error(error);
      });

      return trackUrl;
}



// export async function getTrackInfo(trackId){
//   console.log(trackId)
//   let spotifyUrl='https://open.spotify.com/track/'+trackId;
//   const getInfo = {
//     method: 'GET',
//     url: 'https://spotify-downloader.p.rapidapi.com/SpotifyDownloader',
//     params: {url: spotifyUrl},
//     headers: {
//       'X-RapidAPI-Key': 'a013a19fdcmshb04f66d5c1c526dp1adbf1jsn27243ff06c1f',
//       'X-RapidAPI-Host': 'spotify-downloader.p.rapidapi.com'
//     }
//   };

//   let trackInfo;
  
//   await axios.request(getInfo).then(function (response) {
//     console.log(response.data);
//     trackInfo = response.data;
//   }).catch(function (error) {
//     console.error(error);
//   });

//   return trackInfo;
// }

// export async function getTrackDetail(trackTerm){
//       const getDetail= {
//         method: 'GET',
//         url: 'https://spotify-scraper.p.rapidapi.com/v1/track/download',
//         params: {track: trackTerm},
//         headers: {
//           'X-RapidAPI-Key': 'd75ecb8d4amsh622aa0f617b9177p19e852jsnd433df99e216',
//           'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
//         }
        
//       };
      
//       let trackDetail;

//       await axios.request(getDetail).then(function (response) {
//         console.log(response.data);
//         let trackUrl = response.data.youtubeVideo.audio[0].url;
//         trackDetail=response.data.spotifyTrack;
//         trackDetail.url=trackUrl;
//       }).catch(function (error) {
//         console.error(error);
//       });

//       return trackDetail;
// }
// export async function getSearchResult(searchTerm){
//       const getResult= {
//         method: 'GET',
//         url: 'https://spotify-scraper.p.rapidapi.com/v1/search',
//         params: {term: searchTerm},
//         headers: {
//           'X-RapidAPI-Key': 'd75ecb8d4amsh622aa0f617b9177p19e852jsnd433df99e216',
//           'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
//         }
//       };
      
//       let searchResult;

//       await axios.request(getResult).then(function (response) {
//         console.log(response.data);
//         searchResult=response.data;
//       }).catch(function (error) {
//         console.error(error);
//       });

//       return searchResult;
// }

export async function allDetail(songname){
  // const getResult= {
    // method: 'GET',
  //   url: 'https://spotify-scraper.p.rapidapi.com/v1/search',
  //   params: {term: searchTerm},
  //   headers: {
  //     'X-RapidAPI-Key': 'd75ecb8d4amsh622aa0f617b9177p19e852jsnd433df99e216',
  //     'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
  //   }
  // };
  
  let searchResult;

  await axios.get(`https://apimusic-xbv1.onrender.com/result/?query=${songname}`).then(function (response) {
    console.log(response.data[0]);
    searchResult=response.data[0];
  }).catch(function (error) {
    console.error(error);
  });

  trackDetail.trackTitle=searchResult.song;
  trackDetail.trackArtists=searchResult.primary_artists;
  trackDetail.trackImage=searchResult.image;
  trackDetail.trackUrl=searchResult.media_url;
  trackDetail.trackDuration=searchResult.duration;
  trackDetail.trackId=searchResult.Id;

  return trackDetail;
}