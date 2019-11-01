// this is a partially revealing module pattern - just a variation on what we've already done

const myVM = (() => {
    // get the user buttons and fire off an async DB query with Fetch

    let userButtons = document.querySelectorAll('.u-link'),
        lightBox = document.querySelector('.lightbox');

    
    //create the social media list
    function renderSocialMedia(media) {
        return `<ul class="u-social">
                    ${media.map(item => `<li>${item}</li>`).join('')}
                </ul>
                `
    }

    function parseUserData(person) {
        let targetDiv = lightBox.querySelector('.lb-content');
        let targetImg = lightBox.querySelector('img');

        let bioContent =  `
            <p>${person.bio}</p>
            <h4>Social Media: </h4>

            <!-- loop through social media stuff here -->
            ${renderSocialMedia(person.social)}
        `;

        targetDiv.innerHTML = bioContent;
        targetImg.src = person.currentSrc;

        lightBox.classList.add('show-lb');

    }

    function getUserData(event) {
        // preventing browser from calling up new url, it doesn't exist
        event.preventDefault();
        // debugger;
        // href= 1, 2, 3 depending on which anchor tag you click
        let url = `/${this.getAttribute('href')}`;
           let currentImg = this.previousElementSibling.getAttribute('src');
        //called a promise
        //fetches database content (or an API endpoint)
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // take the existing img src from the layout (person) and use it in lightbox
                data.currentSrc = currentImg;
                parseUserData(data);
            })
            .catch((err) => console.log(err));
    }

    userButtons.forEach(button => button.addEventListener('click', getUserData));
    // make the lightbox close btn work
    lightBox.querySelector('.close').addEventListener('click', function() {
        lightBox.classList.remove('show-lb');
    });

})();