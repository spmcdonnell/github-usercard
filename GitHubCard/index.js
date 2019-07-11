/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

const followersArray = ['spmcdonnell', 'tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

axios
    .all(
        followersArray.map(user => {
            return axios.get(`https://api.github.com/users/${user}`);
        })
    )
    .then(data => {
        var cardsContainer = document.querySelector('.cards');

        data.forEach(user => {
            cardsContainer.appendChild(createUserCard(user));
        });
    });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function createUserCard(data) {
    // Pull API values
    let { avatar_url, name, login, location, html_url, followers, following, bio } = data.data;

    if (bio === null) {
        bio = 'This user has no bio.';
    }

    // Create elements
    var cardElem = document.createElement('div'),
        avatarElem = document.createElement('image'),
        detailsElem = document.createElement('div'),
        nameElem = document.createElement('h3'),
        usernameElem = document.createElement('p'),
        locationElem = document.createElement('p'),
        profileElem = document.createElement('p'),
        profileLinkElem = document.createElement('a'),
        followersElem = document.createElement('p'),
        followingElem = document.createElement('p'),
        bioElem = document.createElement('p');

    // Add classes
    cardElem.classList.add('card');
    detailsElem.classList.add('card-info');
    nameElem.classList.add('name');
    usernameElem.classList.add('username');

    // Add content from API
    avatarElem.src = avatar_url;
    nameElem.textContent = name;
    usernameElem.textContent = login;
    locationElem.textContent = `Location: ${location}`;
    profileLinkElem.href = html_url;
    profileLinkElem.textContent = html_url;
    followersElem.textContent = `Followers: ${followers}`;
    followingElem.textContent = `Following: ${following}`;
    bioElem.textContent = `Bio: ${bio}`;

    // Append everything
    cardElem.appendChild(avatarElem);
    cardElem.appendChild(detailsElem);
    detailsElem.appendChild(nameElem);
    detailsElem.appendChild(usernameElem);
    detailsElem.appendChild(locationElem);
    detailsElem.appendChild(profileElem);
    profileElem.appendChild(profileLinkElem);
    detailsElem.appendChild(followersElem);
    detailsElem.appendChild(followingElem);
    detailsElem.appendChild(bioElem);

    return cardElem;
}
