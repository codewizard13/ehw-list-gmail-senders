
// define an array of objects representing the different blogs
var blogs = [
  // { name: "Blog 1", url: "http://blog1.com/rss" },
  // { name: "Blog 2", url: "http://blog2.com/rss" },
  // { name: "Blog 3", url: "http://blog3.com/rss" }
  {name: "EricHepperle.com", url: "https://erichepperle.com/feed/"}
];


// function to fetch the RSS feed for a given blog and parse it
function fetchBlogPosts(blog) {
  // use the fetch API to retrieve the RSS feed for the blog
  fetch(blog.url)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
          // extract the posts from the RSS feed
          var posts = data.querySelectorAll("item");
          // display the posts on the webpage
          var blogContainer = document.getElementById("blog-container");
          for (var i = 0; i < posts.length; i++) {
              var postTitle = posts[i].querySelector("title").innerHTML;
              var postLink = posts[i].querySelector("link").innerHTML;
              var postDescription = posts[i].querySelector("description").innerHTML;
              var postDate = posts[i].querySelector("pubDate").innerHTML;
              blogContainer.innerHTML += 
              "<div class='post'>" +
              "<h2>" + postTitle + "</h2>" +
              "<a href='" + postLink + "'>" + postLink + "</a>" +
              "<p>" + postDescription + "</p>" +
              "<p>" + postDate + "</p>" +
              "</div>";
          }
      });
}

// loop through the blogs array and fetch each one's RSS feed
for (var i = 0; i < blogs.length; i++) {

  let blog = blogs[i]

  const myHeaders = new Headers({
    'Content-Type': 'text/plain',
    // 'Content-Length': blog.length.toString(),
    'X-Custom-Header': 'ProcessThisImmediately',
    // "Access-Control-Allow-Origin": "http://localhost:*"
    "Access-Control-Allow-Origin": "http://127.0.0.1:5555/"
  });
  
  fetchBlogPosts(blog);
}

