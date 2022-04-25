const dataPets = [
{
name: "Jennifer",
img: "../../assets/images/jennifer.png",
type: "Dog",
breed: "Labrador",
description: "Jennifer is a sweet 2 months old Labrador that is patiently waiting to find a new forever home. This girl really enjoys being able to go outside to run and play, but won't hesitate to play up a storm in the house if she has all of her favorite toys.",
age: "2 months",
inoculations: [
"none"
],
diseases: [
"none"
],
parasites: [
"none"
]
},
{
name: "Sophia",
img: "../../assets/images/sophia.png",
type: "Dog",
breed: "Shih tzu",
description: "Sophia here and I'm looking for my forever home to live out the best years of my life. I am full of energy. Everyday I'm learning new things, like how to walk on a leash, go potty outside, bark and play with toys and I still need some practice.",
age: "1 month",
inoculations: [
"parvovirus"
],
diseases: [
"none"
],
parasites: [
"none"
]
},
{
name: "Woody",
img: "../../assets/images/woody.png",
type: "Dog",
breed: "Golden Retriever",
description: "Woody is a handsome 3 1/2 year old boy. Woody does know basic commands and is a smart pup. Since he is on the stronger side, he will learn a lot from your training. Woody will be happier when he finds a new family that can spend a lot of time with him.",
age: "3 years 6 months",
inoculations: [
"adenovirus",
"distemper"
],
diseases: [
"right back leg mobility reduced"
],
parasites: [
"none"
]
},
{
name: "Scarlett",
img: "../../assets/images/scarlett.png",
type: "Dog",
breed: "Jack Russell Terrier",
description: "Scarlett is a happy, playful girl who will make you laugh and smile. She forms a bond quickly and will make a loyal companion and a wonderful family dog or a good companion for a single individual too since she likes to hang out and be with her human.",
age: "3 months",
inoculations: [
"parainfluenza"
],
diseases: [
"none"
],
parasites: [
"none"
]
},
{
name: "Katrine",
img: "../../assets/images/katrine.png",
type: "Cat",
breed: "British Shorthair",
description: "Katrine is a beautiful girl. She is as soft as the finest velvet with a thick lush fur. Will love you until the last breath she takes as long as you are the one. She is picky about her affection. She loves cuddles and to stretch into your hands for a deeper relaxations.",
age: "6 months",
inoculations: [
"panleukopenia"
],
diseases: [
"none"
],
parasites: [
"none"
]
},
{
name: "Timmy",
img: "../../assets/images/timmy.png",
type: "Cat",
breed: "British Shorthair",
description: "Timmy is an adorable grey british shorthair male. He loves to play and snuggle. He is neutered and up to date on age appropriate vaccinations. He can be chatty and enjoys being held. Timmy has a lot to say and wants a person to share his thoughts with.",
age: "2 years 3 months",
inoculations: [
"calicivirus",
"viral rhinotracheitis"
],
diseases: [
"kidney stones"
],
parasites: [
"none"
]
},
{
name: "Freddie",
img: "../../assets/images/freddie.png",
type: "Cat",
breed: "British Shorthair",
description: "Freddie is a little shy at first, but very sweet when he warms up. He likes playing with shoe strings and bottle caps. He is quick to learn the rhythms of his human’s daily life. Freddie has bounced around a lot in his life, and is looking to find his forever home.",
age: "2 months",
inoculations: [
"rabies"
],
diseases: [
"none"
],
parasites: [
"none"
]
},
{
name: "Charly",
img: "../../assets/images/charly.png",
type: "Dog",
breed: "Jack Russell Terrier",
description: "This cute boy, Charly, is three years old and he likes adults and kids. He isn’t fond of many other dogs, so he might do best in a single dog home. Charly has lots of energy, and loves to run and play. We think a fenced yard would make him very happy.",
age: "8 years",
inoculations: [
"bordetella bronchiseptica",
"leptospirosis"
],
diseases: [
"deafness",
"blindness"
],
parasites: [
"lice",
"fleas"
]
}
]

// Burger Menu //

const burgerIcon = document.querySelector('.header__burger');
const menuHeader = document.querySelector('.header__menu');
const logoHeader = document.querySelector('.logo-header');
const shadow = document.querySelector('.shadow');
const menuElement = document.querySelector('.menu-header__item');

function blockScroll() {
   if (document.body.style.overflow === "hidden") {
      document.body.style.overflow = "";
   } else document.body.style.overflow = "hidden";
}

function burgerMove(event) {
      menuHeader.classList.toggle('header__menu_active');
      burgerIcon.classList.toggle('header__burger_active');
      logoHeader.classList.toggle('logo-header_active');
      shadow.classList.toggle('shadow_active-header');

      blockScroll();
      
      if (burgerIcon.children[0].classList.contains('burger__line_dark')) {
         menuHeader.classList.add('header__menu_pets-active');
      } else {
         menuHeader.classList.remove('header_pets-active')
      };
      if (shadow.classList.contains('shadow_active-header')) {
         shadow.addEventListener('click', burgerMove);
         menuHeader.addEventListener('click', burgerMove);
      } else {
         shadow.removeEventListener('click', burgerMove);
         menuHeader.removeEventListener('click', burgerMove);
      } ;
}

burgerIcon.addEventListener('click', burgerMove);


// Popup //
const popup = document.querySelector('.popup');
let cards = document.querySelector('.cards');
console.log(cards);
const popupCloser = document.querySelector('.popup__closer');
let numberSelectCard = 1;

function showPopup() {
   popup.classList.toggle('popup_active');
   shadow.classList.toggle('shadow_active-all');
   blockScroll();
   if (shadow.classList.contains('shadow_active-all')) {
         shadow.addEventListener('click', showPopup);
         popupCloser.addEventListener('click', showPopup);
      } else {
         shadow.removeEventListener('click', showPopup);
         popupCloser.removeEventListener('click', showPopup);
      } ;
   addHoverCloser();
}

function addHoverCloser() {
   shadow.addEventListener('mouseover', () => {
      popupCloser.classList.add('popup__closer_hover');
   })
   shadow.addEventListener('mouseout', () => {
      popupCloser.classList.remove('popup__closer_hover');
   })
}
cards.addEventListener('click', (event)=>{
      numberSelectCard = event.target.closest('.card-slider').dataset.card;
   showPopup();
   fillContentsPopup(dataPets, numberSelectCard);
   console.log(numberSelectCard);  
});


//  crate content with help async function //

const popupElements = document.querySelectorAll('[data-popup-content]'); 

function fillContentsPopup(dataJson, number) {

   popupElements.forEach(element => {
      let field = element.getAttribute('data-popup-content') || 0;
      if (field === "img") {
         element.src = dataJson[number-1][field];
      } 
      if (typeof dataJson[number-1][field] === "string") {
         element.textContent = dataJson[number-1][field];
      } if(Array.isArray(dataJson[number-1][field])) {
         element.textContent = dataJson[number-1][field][0];
      }
      
   });
}
fillContentsPopup(dataPets, numberSelectCard);




// // Carousel
// let currentSetCards = [1,2,3];
// let nextSet = [];
// const card = document.querySelectorAll('.card-slider');

// const arrowLeft = document.querySelector('.our-friends__arrow_left');
// const arrowRight = document.querySelector('.our-friends__arrow_right');

// let widthCards = cards.offsetWidth;
// console.log(widthCards);

// let leftCards = cards.cloneNode(true);
// let rightCards = cards.cloneNode(true);

// cards.before(leftCards);
// cards.after(rightCards);


// arrowLeft.addEventListener('click', moveLeft);
// arrowRight.addEventListener('click', moveRight)

// function unActiveArrow() {
//    arrowLeft.classList.toggle('arrow_unactive');
//    arrowRight.classList.toggle('arrow_unactive');
//    if (arrowRight.classList.contains('arrow_unactive') || arrowLeft.classList.contains('arrow_unactive')) {
//       arrowRight.removeEventListener('click', moveRight);
//       arrowLeft.removeEventListener('click', moveLeft);
//    } else {
//       arrowRight.addEventListener('click', moveRight);
//       arrowLeft.addEventListener('click', moveLeft);
//    }

// }

// function moveLeft() {
//    cards.classList.add('our-friends__cards_move-left');
//    rightCards.classList.add('our-friends__cards_move-left');
//    unActiveArrow();
//    changeContentCards(dataPets);
// }

// function moveRight() {
//    cards.classList.add('our-friends__cards_move-right');
//    leftCards.classList.add('our-friends__cards_move-right');
//    unActiveArrow();
//    changeContentCards(dataPets);
// }


// cards.addEventListener('animationend', (animationEvent)=>{
//    if (animationEvent.animationName === "moveCardsLeft1280" || "moveCardsLeft768") {
//       cards.innerHTML = rightCards.innerHTML;
//       cards.classList.remove('our-friends__cards_move-left');
//       rightCards.classList.remove('our-friends__cards_move-left');
//    } 
//    if (animationEvent.animationName === "moveCardsRight1280" || "moveCardsRight768") {
//       cards.innerHTML = leftCards.innerHTML;
//       cards.classList.remove('our-friends__cards_move-right');
//       leftCards.classList.remove('our-friends__cards_move-right');
//    }
//    unActiveArrow();
//    currentSetCards = nextSet.slice();
//    getRandomSet(currentSetCards);
   
// } )

// function getRandomSet(currentSet) {
//    for (let i = 0; i < 3; i++) {
//       let randomNumber;
//       do {
//          randomNumber = Math.ceil(Math.random()*8);
//          // console.log(randomNumber);
//       } while (currentSet.includes(randomNumber) || nextSet.includes(randomNumber));
//       nextSet[i] = randomNumber;
//    }
//    console.log('nextSet:'+ nextSet, 'currentSetCards:'+ currentSetCards);
   
// }
// getRandomSet(currentSetCards);

//    function fillContents(dataJson, block, set) {
//    for (let i = 0; i < 3; i++) {
//       block.children[i].dataset.card = set[i];
//       for (const item of block.children) {
//          for (const iterator of item.children) {
//             if (iterator.dataset.content === 'img') {
//                iterator.src = dataJson[+`${item.dataset.card-1}`].img;
//             }
//             if (iterator.dataset.content === 'name') {
//                iterator.textContent = dataJson[+`${item.dataset.card-1}`].name;
//             }
//          }
//       }
//    }
// }

// function changeContentCards(dataJson) {
//    fillContents(dataPets,leftCards, nextSet);
//    fillContents(dataPets, rightCards, nextSet);
// }
// fillContents(dataPets, cards, currentSetCards);
// changeContentCards(dataPets);