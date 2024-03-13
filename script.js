const APIKEY="361110f6d24f4ffbb16315ae17293997";
const apiurl="https://newsapi.org/v2/everything?q=";

async function getnews(searchquery){
    let response=await  fetch(`${apiurl}${searchquery}&apiKey=${APIKEY}`);
    let data=await response.json();
    console.log(data)
    binddata(data.articles);
}

function binddata (articles){
    const cardcontainer=document.getElementById('cards');
    const cardtemp=document.getElementById('card-template');
    cardcontainer.innerHTML="";
articles.forEach(element => {
    if(!element.urlToImage){
        return
    }
    const cardclone=cardtemp.content.cloneNode(true);
    filldata(element,cardclone)
    cardcontainer.appendChild(cardclone);
});
}

function filldata(element,cardclone){
    const newstitle=cardclone.querySelector('h3')
    newstitle.innerText=element.title;
    const imgurl=cardclone.getElementById("img-id")
    imgurl.src=element.urlToImage;
    const imgsrc=cardclone.getElementById('news-source');
    const paragraph=cardclone.querySelector('p');
    paragraph.innerText=element.description
    const date=new Date(element.publishedAt).toLocaleString("en-US", {timeZone: "Asia/Jakarta"});
    imgsrc.innerHTML =`${element.source.name}. ${date}`;
    cardclone.firstElementChild.addEventListener("click", () => {
        window.open(element.url, "_blank");
    });
}

function onNavclick(id){
    getnews(id);
}

const searchbtn=document.getElementById('searchbtn');
const inputfield=document.querySelector('.input-box');
    searchbtn.addEventListener("click", ()=>{
        console.log(inputfield);
        const query=inputfield.value;
        console.log(inputfield.value)
        if(inputfield.value==null){ 
            return;
        }
          getnews(inputfield.value);
        
    })
