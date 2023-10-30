const API_KEY = "ed79b1629dc4465c808e94c17c70d546";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load' ,()=>{ fetchnews("india") })  
function reload(){
    window.location.reload();
}

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data =await res.json() ;
    //console.log(data); 
    bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cards-container");
    const newCardTemplates = document.getElementById("template-news-card");
    cardsContainer.innerHTML = "";
    
    articles.forEach(article =>{
        if(!article.urlToImage) return ;
        const cardClone = newCardTemplates.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone,article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title"); 
    const newsSource = cardClone.querySelector("#news-source"); 
    const newsDesc = cardClone.querySelector("#news-desc");
    
    newsImg.src =article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const data = new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone: "Asia/Jakarta"
    });
    newsSource.innerHTML= `${article.source.name} : ${data}`;
    cardClone.firstElementChild.addEventListener("click" ,()=>{
        window.open(article.url , "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id){
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton =document.getElementById("search-button");
const searchtext = document.getElementById("search-text");

searchButton.addEventListener("click",()=>{
    const query = searchtext.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})



