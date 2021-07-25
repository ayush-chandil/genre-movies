const api_key='api_key=251e95ca4eccf139d7fdd1b10d3e67e8';
const base_url='https://api.themoviedb.org/3';
const api_url=base_url+'/discover/movie?sort_by=popularity.desc&'+api_key;
const img_url='https://image.tmdb.org/t/p/w500';
const search_url=base_url+'/search/movie?'+api_key;
const main=document.getElementById("main");
const search=document.getElementById("search");
const form=document.getElementById("form");

const tags=document.getElementById('tags');

const genre=[
    {
        "id": 28,
        "name": "Action"
    }, 
    
    {
        "id": 12,
        "name": "Adventure"
    }, 
    {
        "id": 16,
        "name": "Animation"
    }, 
    {
        "id": 35,
        "name": "Comedy"
    }, 
    {
        "id": 80,
        "name": "Crime"
    }, 
    {
        "id": 99,
        "name": "Documentary"
    }, 
    {
        "id": 18,
        "name": "Drama"
    }, 
    {
        "id": 10751,
        "name": "Family"
    }, 
    {
        "id": 14,
        "name": "Fantasy"
    }, 
    {
        "id": 36,
        "name": "History"
    }, 
    {
        "id": 27,
        "name": "Horror"
    }, 
    {
        "id": 10402,
        "name": "Music"
    }, 
    {
        "id": 9648,
        "name": "Mystery"
    }, 
    {
        "id": 10749,
        "name": "Romance"
    }, 
    {
        "id": 878,
        "name": "Science Fiction"
    }, 
    {
        "id": 10770,
        "name": "TV Movie"
    }, {
        "id": 53,
        "name": "Thriller"
    }, {
        "id": 10752,
        "name": "War"
    }, {
        "id": 37,
        "name": "Western"
    }]


get_movies(api_url);

function get_movies(url){
   
    fetch(url).then(res=>res.json()).then(data=>{
        if(data.results.length!=0){
        showmovies(data.results);
        }
        else{
            main.innerHTML='<h1>No Results Found</h1>'
        }
    })
}

var genremovies=[];
get_genre();

function get_genre(){
    tags.innerHTML="";
    genre.forEach(genres=>{
        const t=document.createElement('div');
        t.classList.add('tag');
        t.id=genres.id;
        t.innerText=genres.name;
        t.addEventListener('click',()=>{
           if(genremovies.length==0){          //if array is empty push the genre tag in array
               genremovies.push(genres.id);
           }
           else{
               if(genremovies.includes(genres.id)){         //checks if id is present in array or not
                   genremovies.forEach((id,index) => {         
                       if(id==genres.id){
                           genremovies.splice(index,1);         //clears that genre when clicked again
                       }
                    })
                 } else{
                    genremovies.push(genres.id);         //push if not present
                }  
               
            }
           get_movies(api_url+'&with_genres='+genremovies.join(','));
           highlight();
       })

       
        tags.append(t);

        
    })
}



function highlight(){
    const removehighlight=document.querySelectorAll('.tag');
    removehighlight.forEach(tag=>{
       tag.classList.remove('highlighttag');
    })
  genremovies.forEach(id=>{
      if(genremovies.length!=0){     //atleast one tag is selected
          const highlighted=document.getElementById(id);
          highlighted.classList.add('highlighttag');

      }
  })  
}


function showmovies(data){
    main.textContent='';

    data.forEach(movie => {
        const {title,poster_path,vote_average,overview}=movie;
        const movies=document.createElement('div');
        movies.classList.add('movie');
        movies.innerHTML= `<img src=${poster_path?img_url+poster_path:"http://via.placeholder.com/1000x1580"}>
        
        <div class="movie-info">
         <h1>${title}</h1>
         <span class="color">${vote_average}</span>
      </div>

      <div class="movie-overview">
        <h1>Overview</h1>
        <h2>
         ${overview}
         </h2>
        </div>`

        main.appendChild(movies);

    });

    
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const movies_search=search.value;
    genremovies=[];
    get_genre();

    if(movies_search){
        get_movies(search_url+'&query='+movies_search);
    }
    
})





