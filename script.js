let audio=document.getElementById("audio");
let progress=document.getElementById("progress");

let songs=[];
for(let i=1;i<=20;i++){
songs.push({
src:"songs/song"+i+".mp3",
img:"albums/album"+i+".jpg",
name:"Song "+i
});
}

let index=0;
let selectedLang="";
let selectedSinger="";

// LOGIN
function login(){
let name=document.getElementById("username").value;
let email=document.getElementById("email").value;
let mobile=document.getElementById("mobile").value;
let pass=document.getElementById("password").value;

if(name===""||email===""||mobile===""||pass===""){
document.getElementById("error").innerText="Fill all fields";
return;
}

document.getElementById("user").innerText=name;

document.getElementById("loginPage").classList.add("hidden");
document.getElementById("languagePage").classList.remove("hidden");
}

// LANGUAGE
function selectLang(lang){
selectedLang=lang;
document.getElementById("lang").innerText=lang;

document.getElementById("languagePage").classList.add("hidden");
document.getElementById("singerPage").classList.remove("hidden");
}

// SINGER
function selectSinger(s){
selectedSinger=s;
document.getElementById("singer").innerText=s;

document.getElementById("singerPage").classList.add("hidden");
document.getElementById("musicPage").classList.remove("hidden");

loadSongs();
}

// LOAD SONGS
function loadSongs(){
let box=document.getElementById("songs");
box.innerHTML="";

songs.forEach((s,i)=>{
box.innerHTML+=`
<div onclick="play(${i})">
<img src="images/${s.img}">
<p>${s.name}</p>
</div>`;
});
}

// PLAY
function play(i){
index=i;
audio.src=songs[i].src;
audio.play();

document.getElementById("cover").src="images/"+songs[i].img;
document.getElementById("title").innerText=songs[i].name;
}

// CONTROLS
function toggle(){ audio.paused?audio.play():audio.pause(); }
function next(){ index=(index+1)%songs.length; play(index); }
function prev(){ index=(index-1+songs.length)%songs.length; play(index); }
function shuffle(){ index=Math.floor(Math.random()*songs.length); play(index); }

// SEARCH
function searchSong(){
let val=document.getElementById("search").value.toLowerCase();
let items=document.getElementById("songs").children;

for(let i=0;i<items.length;i++){
let txt=items[i].innerText.toLowerCase();
items[i].style.display=txt.includes(val)?"block":"none";
}
}

// PROGRESS
audio.addEventListener("timeupdate",()=>{
progress.value=(audio.currentTime/audio.duration)*100;
});
progress.addEventListener("input",()=>{
audio.currentTime=(progress.value/100)*audio.duration;
});

// LOGOUT
function logout(){ location.reload(); }