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
// highlighting page

document.querySelectorAll('.menu-header__item')[2].classList.add('menu-header__item_active')

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


//Pagination
const allQuantityPets = 48;
let quantityPerPage;

function getWidthPage() {
   if (1279 < document.documentElement.clientWidth) {
      quantityPerPage = 8;
   } else if (767 < document.documentElement.clientWidth) {
      quantityPerPage = 6;
   }else {
      quantityPerPage = 3;
   }
}
getWidthPage();

let maxPage = allQuantityPets/quantityPerPage; 

let startArray = (function(){
   let array = [];
   for (let i = 0; i < 6; i++) {
         for (let i = 1; i < 9; i++) {
            array.push(i);
         }
   }
   return array;
}())

function shuffleArray(array) {
   let resultArray = array.slice();
   for (let i = 0; i < resultArray.length; i++) {
      let current = resultArray[i];
      let randomIndex = Math.floor(Math.random()*(resultArray.length-1));
      resultArray[i] = resultArray[randomIndex];
      resultArray[randomIndex]= current;
   }
   return resultArray;
}

function fillListPets (array, number) {
   let resultArray = [];
   let currentArray = [];
   for (let i = 0; i < allQuantityPets/number; i++) {
      currentArray = array.slice(i*number, number*(i+1))
      resultArray[i] = shuffleArray(currentArray);
   }
   return resultArray;
}
let arrayListPets;
arrayListPets = fillListPets (startArray, quantityPerPage);


function fillCards(dataJson, page, number) {
   for (let i = 0; i < number; i++) {
      cards.children[i].dataset.card = arrayListPets[page-1][i];
      for (const item of cards.children[i].children) {
            if (item.dataset.content === 'img') {
               item.src = dataJson[+`${cards.children[i].dataset.card-1}`].img;
            }
            if (item.dataset.content === 'name') {
               item.textContent = dataJson[+`${cards.children[i].dataset.card-1}`].name;
            }
      }
   }
   fillNavigationPanel();
}


const navigationPanel = document.querySelector('.navigation-pets');

const firstArrow = document.querySelector('[data-arrow="first"]');
const previousArrow = document.querySelector('[data-arrow="previous"]');
const currentArrow = document.querySelector('[data-arrow="current"]');
const nextArrow = document.querySelector('[data-arrow="next"]');
const lastArrow = document.querySelector('[data-arrow="last"]');

let currentPage = currentArrow.firstElementChild.dataset.page;
currentArrow.firstElementChild.textContent = currentArrow.firstElementChild.dataset.page;

function fillNavigationPanel() {
   currentArrow.firstElementChild.textContent = currentArrow.firstElementChild.dataset.page;
   if (currentPage === 1) {
      firstArrow.classList.add('arrow_unactive');
      previousArrow.classList.add('arrow_unactive');
      nextArrow.classList.remove('arrow_unactive');
      lastArrow.classList.remove('arrow_unactive');
   }
    if(currentPage === maxPage) {
      firstArrow.classList.remove('arrow_unactive');
      previousArrow.classList.remove('arrow_unactive');
      nextArrow.classList.add('arrow_unactive');
      lastArrow.classList.add('arrow_unactive');
   } 
   if((currentPage < maxPage) && ((currentPage > 1))) {
      firstArrow.classList.remove('arrow_unactive');
      previousArrow.classList.remove('arrow_unactive');
      nextArrow.classList.remove('arrow_unactive');
      lastArrow.classList.remove('arrow_unactive');
   }

}

navigationPanel.addEventListener('click', (event) => {
   if (event.target.closest('[data-arrow="first"]')) {
      if (currentPage === 1) {
         return;
      } else {
         currentPage = currentArrow.firstElementChild.dataset.page = 1;
         fillCards(dataPets, currentPage, quantityPerPage);
      }
   } 
   if (event.target.closest('[data-arrow="previous"]')) {
      if (currentPage === 1) {
         return;
      } else {
      currentPage = --currentArrow.firstElementChild.dataset.page;
      fillCards(dataPets, currentPage, quantityPerPage)
      }
   }
   if (event.target.closest('[data-arrow="next"]')) {
      if (currentPage === maxPage) {
         return;
      } else {
      currentPage = ++currentArrow.firstElementChild.dataset.page;
      fillCards(dataPets, currentPage, quantityPerPage)
      }
   }
   if (event.target.closest('[data-arrow="last"]')) {
      if (currentPage === maxPage) {
         return;
      } else {
      currentPage = currentArrow.firstElementChild.dataset.page = maxPage;
      fillCards(dataPets, currentPage, quantityPerPage);
      }
   } 
})

fillCards(dataPets, currentPage, quantityPerPage);

