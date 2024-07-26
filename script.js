async function getPosts() {
    try{
        const answer = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!answer.ok) {
            throw new Error('Network response was not ok');
        }
        const result = await answer.json();
        return result;
    } 
    catch (error) {
        const errorCode = 404;
        console.error('Error fetching posts:', error);
        return [];
    }
}

function filterPosts() {
    const searchInput = document.getElementById('search-input').value.toUpperCase();
    getPosts().then(result => {
        const filteredPosts = result.filter(post => post.title.toUpperCase().includes(searchInput));
        displayPosts(filteredPosts);
    });
}

function displayPosts(result) {
    const postList = document.getElementById('post-list');
    postList.innerHTML = '';
    if (result.length === 0) {
        postList.innerHTML = '<p>No posts found</p>';
        return;
    }
    result.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="title">${post.title}</div>
            <div class="body">${post.body}</div>
        `;
        postList.appendChild(postElement);
    });
}