const feed = document.getElementById('feed');

// Handling the post button
document.getElementById('post-button').addEventListener('click', () => {
    const postText = document.getElementById('post-text').value;
    const fileInput = document.getElementById('file-input');
    const mediaFiles = fileInput.files;

    if (postText || mediaFiles.length) {
        const newPost = createPost(postText, mediaFiles);
        feed.prepend(newPost);

        // Clear post text and file input
        document.getElementById('post-text').value = '';
        fileInput.value = '';
    } else {
        alert('Please write a message or attach files.');
    }
});

function createPost(text, files) {
    const post = document.createElement('div');
    post.classList.add('post');

    // Post header with profile picture, username, and handle
    const postHeader = document.createElement('div');
    postHeader.classList.add('post-header');

    const profilePic = document.createElement('img');
    profilePic.src = 'shadow.jpg'; // Your profile picture here
    postHeader.appendChild(profilePic);

    const userInfo = document.createElement('div');
    userInfo.classList.add('user-info');
    const userName = document.createElement('h4');
    userName.textContent = 'Jesiah';
    const userHandle = document.createElement('p');
    userHandle.textContent = '@jesiah';
    userInfo.appendChild(userName);
    userInfo.appendChild(userHandle);
    postHeader.appendChild(userInfo);

    post.appendChild(postHeader);

    // Post content
    const postContent = document.createElement('div');
    postContent.classList.add('post-content');
    const postText = document.createElement('p');
    postText.textContent = text;
    postContent.appendChild(postText);

    // Attach media if uploaded
    if (files.length > 0) {
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add('post-media');
        for (let file of files) {
            if (file.type.startsWith('image/')) {
                const img = document.createElement('img');
                img.src = URL.createObjectURL(file);
                img.style.maxWidth = '100%';
                img.style.marginTop = '10px';
                mediaContainer.appendChild(img);
            } else if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.src = URL.createObjectURL(file);
                video.controls = true;
                video.style.maxWidth = '100%';
                video.style.marginTop = '10px';
                mediaContainer.appendChild(video);
            }
        }
        postContent.appendChild(mediaContainer);
    }

    post.appendChild(postContent);

    // Post actions with counters
    const postActions = document.createElement('div');
    postActions.classList.add('post-actions');

    const likeButton = createActionButton('Like', 'like');
    const shareButton = createActionButton('Share', 'share');
    const bookmarkButton = createActionButton('Bookmark', 'bookmark');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => post.remove());

    postActions.appendChild(likeButton);
    postActions.appendChild(shareButton);
    postActions.appendChild(bookmarkButton);
    postActions.appendChild(deleteButton);

    post.appendChild(postActions);

    return post;
}

function createActionButton(text, type) {
    const button = document.createElement('button');
    button.textContent = text;

    const counter = document.createElement('span');
    counter.classList.add('counter');
    counter.textContent = '0';

    button.addEventListener('click', () => {
        let count = parseInt(counter.textContent);
        counter.textContent = count + 1;
    });

    button.appendChild(counter);

    return button;
}