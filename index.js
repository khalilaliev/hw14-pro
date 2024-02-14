// document.getElementById("form").addEventListener("submit", function (event) {
//   event.preventDefault();
//   const inputValue = document.getElementById("inputValue").value;
//   if (inputValue >= 1 && inputValue <= 100) {
//     fetch(`https://jsonplaceholder.typicode.com/posts/${inputValue}`)
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (response) {
//         createPostEl(response);
//         return fetch(
//           `https://jsonplaceholder.typicode.com/posts/${inputValue}/comments`
//         );
//       })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (response) {
//         console.log("Comments", response);
//       });
//     function createPostEl(response) {
//       console.log("Post Element", response);
//     }
//   } else {
//     console.error("You have done smth wrong!");
//   }
// });

const container = document.getElementById("container");

const fetchComments = (id) => {
  fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
    .then((response) => response.json())
    .then((json) => {
      const postContainer = document.getElementById("post");
      const comments = document.createElement("div");
      const commentTitle = document.createElement("h2");
      commentTitle.innerHTML = "Comments";
      comments.appendChild(commentTitle);
      json.forEach((comment) => {
        const commentDiv = document.createElement("div");
        commentDiv.innerHTML = `<h3>${comment.name}<h3/> <p>${comment.body}<p/>`;
        comments.appendChild(commentDiv);
      });
      postContainer.appendChild(comments);
    });
};

const input = (e) => {
  e.preventDefault();
  const id = document.getElementById("inputValue").value;
  if (id >= 1 && id <= 100) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((json) => {
        const post = document.createElement("div");
        post.id = "post";
        post.innerHTML = `<h2>${json.title}</h2><p>${json.body}</p>`;
        const commentBtn = document.createElement("button");
        commentBtn.innerHTML = "Get a comments";
        commentBtn.addEventListener("click", () => {
          fetchComments(id);
          commentBtn.remove();
        });
        post.appendChild(commentBtn);
        container.replaceChildren(post);
      });
  } else {
    alert("You have done smth wrong!");
  }
};

document.getElementById("form").addEventListener("submit", input);
