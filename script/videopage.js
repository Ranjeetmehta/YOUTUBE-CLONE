let suggetionString ="";
const searchBtn = document.querySelector(".header___search > i");
const searchInput = document.querySelector(".header___search > input");

searchBtn.addEventListener('click', () => {
  let searchString = searchInput.value.trim();
  if (searchString == '') {
    return;
  }
  localStorage.setItem('searchString', searchString);
  window.location.href = 'index.html';
});
searchInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    let searchString = searchInput.value.trim();
    if (searchString == '') {
      return;
    }
    localStorage.setItem('searchString', searchString);
    window.location.href = 'index.html';
  }
});


let mobSearchBtn = document.querySelector(".mob_search-div-details i");

mobSearchBtn.addEventListener("click", () => {
  let newPageUrl = "index.html"
  window.location.href = newPageUrl;
})




let headerLogo = document.querySelector(".header__right img");

headerLogo.addEventListener("click", () => {
  localStorage.setItem('searchString', "Youtube Popular");
  window.location.href = 'index.html';
})


// ---------------------- Video Content JS--------------------------------------------------

let videoId = sessionStorage.getItem('videoId');

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "390",
    width: "640",
    videoId: `${videoId}`,
    playerVars: {
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
  executeOtherCode(videoId);
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}
function stopVideo() {
  player.stopVideo();
}

function executeOtherCode(videoId) {
  async function getVideoDetails(videoId) {
    try {
      const baseUrl = 'https://www.googleapis.com/youtube/v3';
      const apiKey = "AIzaSyBk2vWwU60xC_evThnIxTYHP2wuvwTrnTE";

      let url = `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`;
      let response = await fetch(url);
      let videoDetails = await response.json();
      // console.log(videoDetails);

      // Getting channel info


      const channelId = `${videoDetails.items[0].snippet.channelId}`;
      let channelInformation;
      getChannelInfo(channelId, apiKey)
        .then(channelData => {
          channelInformation = channelData;

          let title = document.querySelector(".title");
          title.innerHTML = `${videoDetails.items[0].snippet.title}`

          let upLoadDate = convertYouTubeAPIDate(videoDetails.items[0].snippet.publishedAt);
          let uploadDateElement = document.querySelector(".upload-date");
          uploadDateElement.innerHTML = `${upLoadDate}`;


          const viewCount = formatCount(videoDetails.items[0].statistics.viewCount);
          const views = document.querySelector(".views")
          views.innerHTML = `${viewCount} views`

          const channelLogo = document.querySelector(".channel-logo img")
          const commentChannelLogo = document.querySelector(".comment-channel-logo img")
          channelLogo.src = `${channelInformation.items[0].snippet.thumbnails.default.url}`
          commentChannelLogo.src = `${channelInformation.items[0].snippet.thumbnails.default.url}`


          const channelName = document.querySelector(".channel-name")
          suggetionString = videoDetails.items[0].snippet.channelTitle+""
          channelName.innerHTML = `${videoDetails.items[0].snippet.channelTitle}`


          const channelSubs = document.querySelector(".channel-subs-count")
          let subsCount = formatCount(channelInformation.items[0].statistics.subscriberCount)
          channelSubs.innerHTML = `${subsCount} SUBSCRIBERS`

          const channelComments = document.querySelector(".comments-count")
          let commentCount = formatCount(videoDetails.items[0].statistics.commentCount)
          channelComments.innerHTML = `${commentCount} Comments`

          const LikeCount = formatCount(videoDetails.items[0].statistics.likeCount);
          const likes = document.querySelector(".row-right-item p")
          likes.innerHTML = `${LikeCount}`


          const Desciption = document.querySelector(".description")
          Desciption.innerHTML = `${videoDetails.items[0].snippet.description}`

        })
        .catch(error => {
          console.error('Error:', error);
        });

    } catch (error) {
      console.log(error);
      return null;
    }
  }


  function convertYouTubeAPIDate(apiDate) {
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const dateObj = new Date(apiDate);
    const month = months[dateObj.getMonth()];
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  getVideoDetails(videoId);



  async function getChannelInfo(channelId, apiKey) {
    try {
      const channelUrl = `https://www.googleapis.com/youtube/v3/channels?id=${channelId}&key=${apiKey}&part=snippet,statistics`;
      const channelResponse = await fetch(channelUrl);
      const channelData = await channelResponse.json();

      if (channelData.items.length === 0) {
        throw new Error('Channel not found or API quota exceeded.');
      }
      return channelData;
    } catch (error) {
      throw new Error('Error fetching channel details: ' + error.message);
    }
  }


  function formatCount(numStr) {
    if (typeof numStr !== 'string') {
      throw new Error('Input must be a string.');
    }

    const num = parseFloat(numStr);

    if (isNaN(num)) {
      throw new Error('Invalid number string.');
    }

    if (Math.abs(num) >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (Math.abs(num) >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    } else {
      return numStr;
    }
  }


  let showMoreBtn = document.querySelector(".show-more-btn");
  let descriptionContainer = document.querySelector(".description-content");
  isDesopen = false;
  showMoreBtn.addEventListener("click", () => {
    if (isDesopen == false) {
      descriptionContainer.style.height = "fit-content"
      descriptionContainer.style.height = "fit-content"
      showMoreBtn.textContent = "SHOW LESS"
      isDesopen = true;
    } else {
      descriptionContainer.style.height = "80px"
      showMoreBtn.textContent = "SHOW MORE"
      isDesopen = true;
    }

  })
}


// ------------------------------ Video Side------------------

const apiKey = "AIzaSyAC71IhvgS-ODqq3fHy_NTXUHOXSrZt2kA";
const baseUrl = `https://www.googleapis.com/youtube/v3`;

async function getSearchResults(searchString) {
  try {
    let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=5`
    const response = await fetch(url, {
      method: "GET"
    });
    const result = await response.json();
    console.log(result.items);
    createVideoCard(result.items);
  } catch (data) {
    console.log(data)
  }
}

getSearchResults(suggetionString);



let SmallvideoGrid = document.querySelector(".related-video-seggetions");



function clearData() {
  SmallvideoGrid.innerHTML = "";
}


async function createVideoCard(videoList) {
  clearData();
  console.log(videoList);
  videoList.forEach((singleVideo) => {

    const {
      snippet
    } = singleVideo;



    // Grabbing the details of single video
    let videoId = singleVideo.id.videoId;
    async function fetchVideoDetails(videoId) {
      let vdetails;
      try {
        let url = `${baseUrl}/videos?key=${apiKey}&part=snippet,contentDetails,statistics&id=${videoId}`
        let response = await fetch(url);
        vdetails = await response.json();
      } catch (data) {
        console.log(data)
      }
      // console.log(vdetails);

      let channelId = snippet.channelId;

      async function getChannelDetails(channelId) {
        try {
          let url = `${baseUrl}/channels?key=${apiKey}&part=snippet,contentDetails,statistics&id=${channelId}`
          let response = await fetch(url);
          let details = await response.json();
          return details;
        } catch (data) {
          console.log(data)
        }
      }

      try {
        let channelDetails = await getChannelDetails(channelId);

        appendUi(channelDetails, vdetails, videoId);
      } catch (data) {
        console.log(data)
      }
    }

    fetchVideoDetails(videoId);

    function appendUi(channelDetails, vdetails, videoId) {
      let uploadDate
      try {
        uploadDate = vdetails.items[0].snippet.publishedAt;
      } catch (data) {
        console.log(data);
      }

      function timeAgo(dateString) {
        const date = new Date(dateString);
        const currentDate = new Date();
        const timeDifference = currentDate - date;
        const seconds = Math.floor(timeDifference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);
        const years = Math.floor(days / 365);

        if (seconds < 60) {
          return seconds === 1 ? '1 second ago' : `${seconds} seconds ago`;
        } else if (minutes < 60) {
          return minutes === 1 ? '1 minute ago' : `${minutes} minutes ago`;
        } else if (hours < 24) {
          return hours === 1 ? '1 hour ago' : `${hours} hours ago`;
        } else if (days < 7) {
          return days === 1 ? '1 day ago' : `${days} days ago`;
        } else if (weeks < 4) {
          return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
        } else if (months < 12) {
          return months === 1 ? '1 month ago' : `${months} months ago`;
        } else {
          return years === 1 ? '1 year ago' : `${years} years ago`;
        }
      }

      const humanReadableDate = timeAgo(uploadDate);
      const viewCount = formatViewCount(vdetails.items[0]?.statistics.viewCount);

      function formatViewCount(viewCount) {
        if (viewCount >= 1000000) {
          return `${Math.floor(viewCount / 1000000)}M •`;
        } else if (viewCount >= 1000) {
          return `${Math.floor(viewCount / 1000)}k •`;
        } else {
          return viewCount.toString();
        }
      }


      let smallVideoCard = document.createElement("div");
      smallVideoCard.classList.add("small-video-card");
      let innerHtmlCard = `
            <div class="left-div">
              <img src="${vdetails.items[0].snippet.thumbnails.high.url}" />
            </div>
            <div class="right-div">
              <div class="video-title">${vdetails.items[0].snippet.title}</div>
              <div class="video-channel-name">${vdetails.items[0].snippet.channelTitle}</div>
              <div class="video-details">
                <div class="video-views">10B views</div>
                <div class="video-upload-date">2 days Ago</div>
              </div>
            </div>
                  `

      smallVideoCard.innerHTML = innerHtmlCard;
      const newPageUrl = `videopage.html`;
      smallVideoCard.addEventListener("click", function () {
        sessionStorage.setItem('videoId', `${videoId}`);
        // Navigate to the new HTML page when the video card is clicked
        window.location.href = newPageUrl;
      });
      SmallvideoGrid.appendChild(smallVideoCard);
    }

  })

}