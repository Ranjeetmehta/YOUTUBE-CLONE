# You-Tube-Project

Project Breakup
Create the ui as shown in the figma.

Create 2 pages - index.html(home page), videoDetails.html.

Make sure the UI is exact - use the font Inter ( from google fonts)

You can extract the other assets from figma itself.

Implement the UI for the Search Bar, and One Video Item design.

On landing onto the home page fetch 20 videos for the empty search string.

Make the design of one video we can reuse the same for all the videos.

Implement a javascript function that takes a list of video objects and renders them onto the UI.

When clicked on a video item, navigate to the video details screen by sharing the video_id to that page (we can use either cookie storage , localStorage, sessionStorage to share data across multiple web pages of the same website).

Video Details screen
Capture the Video_id from the cookieStorage and fetch the video content and play it.
Using the same video_id make an api call to load the statistics of the video (like count, dislike count, subscribers, channel name etc..).
Also make another network call to fetch the comments of the video.
When the user clicks on the `show replies` button, load all the reply comments of the video and render onto the UI as per the design.
Features
Search Functionality- On Searching for a video we receive a list of videos this API will drive the same where we send the search String to Youtube’s API and it sends the list of videos as per our search.

Video Details- The api will give us the details of a particular video. We need to send the videoId which uniquely identifies the video and what details we need in the `part` parameter.

Comments Of a Video- Every video will have a certain number of comments to fetch all the comments of a video (remember every video will have a unique id).

Replies of a Comment- Every comment may have some replies , when a user clicks on show replies for a particular comment, we can call this API which gives the list of comments which are replied to the current comment.

Play Video
Relevant Links
Figma Link- https://www.figma.com/file/53msLWP0JcqWdt4n0fjAZu/YouTube-UI-Clone-Design-(Community)?type=design&node-id=3-185&mode=design&t=9E1wUw956BSodnIp-0

Google API- https://www.googleapis.com/youtube/v3

API Documentation- https://developers.google.com/youtube/v3/docs

API Key Reference- https://www.googleapis.com/youtube/v3/endpoint?key={apiKey

Search API Documentation- https://developers.google.com/youtube/v3/docs/search/list

Video List API Documentation- https://developers.google.com/youtube/v3/docs/videos/list