
let containerArr = ['./files/story1.avif', './files/story2.avif', './files/story3.avif', './files/story4.avif', './files/story5.avif']
let imgArr =[
    {
        arr : ['./files/story1.avif', './files/story8.avif', './files/story9.avif' ]
    },
    {
        arr : ['./files/story2.avif', './files/story6.avif']
    },
    {
        arr : ['./files/story3.avif', './files/story7.avif']
    },
    {
        arr : ['./files/story4.avif', './files/story10.avif', './files/story11.avif', './files/story2.avif', './files/story8.avif']
    },
    {
        arr : ['./files/story5.avif']
    }
]

const storyContainer = document.querySelector("#story-container");
const storyItemm= document.getElementById("story-item")
const storyDOM = document.getElementById("story-dom")


containerArr.forEach((ele, index) => {
    storyContainer.innerHTML += `
    <div class="story-box" onclick="openStory(${index})">
      <div class="storyImg">
        <img src=${ele} alt="">
      </div>
    </div>
    `
    storyItemm.innerHTML += `
        <div class="swiper-slide story-page">
         <div class="imgDOM">

         </div>
          <div class="nav">
            <div class="prodile-div" >
                <img src="./files/profile.jpg" class="story-p-img" alt="profile" >
                <span class="story-p-name" >Harsh Singh</span>
            </div>
            <p class="close">X</p>
            <div class="thumb">

            </div>
            <button class="Prev" onclick="PrevEl(${index})">Prev</button>
            <button class="Next" onclick="NextEl(${index})">Next</button>
          </div>
        </div>
    `
})
let imgDOM = document.querySelectorAll(".imgDOM")
let thumb = document.querySelectorAll('.thumb')
imgArr.forEach((ele,i)=>{
    ele.arr.forEach(img =>{
        imgDOM[i].innerHTML += `<img src=${img} alt="">`
    })
})
imgDOM.forEach((ele, i) =>{
    let img = ele.querySelectorAll('img')
    img.forEach((data, index) =>{
        thumb[i].innerHTML += `
        <span class=""></span>
        `
    })
})

var swiper = new Swiper(".mySwiper", {
  effect: "cube",
  allowTouchMove: false,
//   loop: true,
  speed: 1000,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  }
});

let interval;
const next = document.querySelectorAll(".Next")
const close = document.querySelectorAll(".close")
const prev = document.querySelectorAll(".Prev")
let acitveIndex = 0
let acitveIndex1 = 0

const NextEl = (i) =>{
    let img = imgDOM[i].querySelectorAll('img')
    let span = thumb[i].querySelectorAll('span')
    acitveIndex = acitveIndex + 1 
    if(acitveIndex < img.length){
        img.forEach((el,i)=>{
            el.classList.remove('active-img')
            span[i].classList.remove("active")
        })
        img[acitveIndex].classList.add("active-img")
        span[acitveIndex].classList.add("active")
        clearInterval(interval); 
        interval = setInterval(() => {
            NextEl(swiper.activeIndex)
        }, 10000);
    }else{
        if(i !== containerArr.length -1){
            img.forEach((Element,index)=>{
                Element.classList.remove("active-img")
                span[index].classList.remove("active")
            })
         let  imgNex = imgDOM[i+1].querySelectorAll('img')
         let  spanNext = thumb[i+1].querySelectorAll('span')
         acitveIndex = 0
         imgNex[0].classList.add("active-img")
         spanNext[0].classList.add("active")
         swiper.slideNext()
         clearInterval(interval); 
         interval = setInterval(() => {
             NextEl(swiper.activeIndex)
         }, 11000);
        }else{
            acitveIndex = 0
        }
       
    }
}

const PrevEl = (i) =>{
    let img = imgDOM[i].querySelectorAll('img')
    let span = thumb[i].querySelectorAll('span')
    acitveIndex = acitveIndex - 1 
    if(acitveIndex >= 0){
        img.forEach((el,i)=>{
            el.classList.remove('active-img')
            span[i].classList.remove("active")
        })
        img[acitveIndex].classList.add("active-img")
        span[acitveIndex].classList.add("active")
        clearInterval(interval); 
        interval = setInterval(() => {
            NextEl(swiper.activeIndex)
        }, 10000);
    }else{
        if(i !== 0){
            img.forEach((Element,index)=>{
                Element.classList.remove("active-img")
                span[index].classList.remove("active")
            })
         let  imgNex = imgDOM[i-1].querySelectorAll('img')
         let  spanNext = thumb[i-1].querySelectorAll('span')
         acitveIndex = 0
         imgNex[0].classList.add("active-img")
         spanNext[0].classList.add("active")
         swiper.slidePrev()
         clearInterval(interval); 
         interval = setInterval(() => {
             NextEl(swiper.activeIndex)
         }, 11000);
        }else{
            acitveIndex = 0
        }
    }
}



close.forEach(ele =>{
    ele.addEventListener('click', function(){
        storyDOM.style.display= "none"
        storyContainer.style.display = "flex"
        clearInterval(interval); 
    })
})
const openStory = (i) => {
    let img = imgDOM[i].querySelectorAll('img')
    let span = thumb[i].querySelectorAll('span')
    img[0].classList.add("active-img")
    span[0].classList.add("active")
    storyDOM.style.display= "block"
    storyContainer.style.display = "none"
    swiper.slideTo(i)
    swiper.update();
    interval = setInterval(() => {
        NextEl(swiper.activeIndex)
    }, 10000);
 }