//  Promise chain: Create a promise chain where the first promise adds a number to the input parameter, the second one multiplies it, and the third one subtracts 10 from the resulting number. Each operation must be performed in a separate then. Use catch to catch errors.
let initialValue = 6;

let mathPromise = new Promise( (res, rej) => {
    if( initialValue > 4 ) {
        res ( initialValue + 12 );
    } else {
        rej( "Increase initial value" )
    }
} )

mathPromise
    .then( resultFirst => resultFirst  )
        .then( resultSecond => resultSecond * 3 ) 
            .then( resultThird => console.log( `Result = ${resultThird - 10 }` ) )
            .catch( e => console.error( e ) ) 

 
//Getting a list of users
// Use fetch to get a list of all users from the JSONPlaceholder (/users endpoint).
// Output user names and email addresses to the console or to a web page.
// Output of detailed information about one user \

function createDiv( parent, userprop, className ) {
    let div = document.createElement( "div" );
    div.classList.add( `secondTask__list__item__` + `${className}` );
    div.innerHTML = `${className.split("_").join(" ")} : ` + userprop;
    parent.appendChild( div );
}

function createLink ( parent, href, userprop, className ) {
    let link = document.createElement( "a" );
    link.classList.add( `secondTask__list__item__` + `${className}` );
    link.setAttribute( "href", href );
    link.setAttribute( "target", "_blank" );
    link.innerHTML = `${className} : ` + userprop;
    parent.appendChild( link );
}

function createCard( user ) {

    let li = document.createElement( "li" );
    li.classList.add( "secondTask__list__item" );

    createDiv( li, user.name, "name" );

    createDiv( li, user.username, "username" );

    createLink( li, `mailto:${user.email}`, user.email, "email" );

    createLink( li, `tel:${user.phone}`, user.phone, "phone" );

    createDiv( li, user.address.city, "city" );

    document.querySelector( ".secondTask__list" ).appendChild(li);
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then( res => res.json() )
        .then( json => {
            for( let user of json ) {
                createCard( user )
                console.log( user.name, user.email );
            }
        } )

// Create a page with a button, when you click on the button, a request is made to
// http swapi.dev/api/planets/1/ and a card with data from the request is displayed, the data from the array that has a link should be displayed in the A tag and the link should be added to the href attribute
// https://swapi.dev/
// Use async/await to request information about a specific movie from SWAPI. Display the movie title and release date.        
let btn = document.querySelector( ".thirdTask__btn" );
let arrFilm = [];

function getData (  ) {
    fetch( "https://swapi.dev/api/planets/1/" )
        .then( res => res.json() )
            .then( json => createCardThird( json ) )
}

async function getInfoAboutFilm( url ) {
    const response = await fetch( url );
    const info = await response.json();
   return info;
}; 

function createCardThird( obj ) {
    let ul = document.querySelector( ".thirdTask__list" );
    ul.classList.add( "active" );
    for( let key in obj ) {
        let li = document.createElement( "li" );
        li.classList.add( "thirdTask__list__item" );
        if( typeof( obj[key] ) === "string" ) {
            if( key === "created" || key === "edited" || key === "url" ) {
                continue;
            } else {
                createDiv( li, obj[key] , key);
            }
            ul.appendChild( li ); 
        } else {
            for( let link of obj[key] ) {
                if( key === "films" ) {
                    li.addEventListener( "click", getInfoAboutFilm(link).then( info => {
                        createLink( li, link, `${ info.title }, release: ${info.release_date}`, key );
                        ul.appendChild( li ); 
                    } ) );
                } else {
                    createLink( li, link, link, key);
                    ul.appendChild( li ); 
                }
                
            }
        }
    }
}


btn.addEventListener( "click", getData );


// Create a function that uses async/await to request information about a specific planet from SWAPI. Output the name of the planet and the climate.
async function getInfoAboutPlanet( url ) {
    const response = await fetch( url );
    const planetInfo = await response.json();
    return planetInfo;
};

function chengeText ( tag, link ) {
    tag.addEventListener( "click", function() {
        getInfoAboutPlanet( link )
            .then( planetInfo => {
                tag.children[1].children[0].innerHTML = planetInfo.name;
                tag.children[2].children[0].innerHTML = planetInfo.climate;
            } )
    } );
    
};

let arrPlanet = document.querySelectorAll( ".fourthTask__list__planet" );

for( let planet of arrPlanet ) {
    if( planet.classList.contains( "alderaan" ) ) {
        chengeText( planet, "https://swapi.dev/api/planets/2/" );
    } else if( planet.classList.contains( "dagobah" ) ) {
        chengeText( planet, "https://swapi.dev/api/planets/5/" );
    } else if( planet.classList.contains( "hoth" ) ) {
        chengeText( planet, "https://swapi.dev/api/planets/4/" );
    } else if( planet.classList.contains( "tatooine" ) ) {
        chengeText( planet, "https://swapi.dev/api/planets/1/" );
    }
};