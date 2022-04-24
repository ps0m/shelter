// Burger Menu
let numberCard = 1;
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


// Popup
const popup = document.querySelector('.popup');
const cards = document.querySelector('.cards');
const popupCloser = document.querySelector('.popup__closer');

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
   if (!event.target.dataset.card) {
      numberCard = event.target.closest('.card-slider').dataset.card;
   } else numberCard = (event.target.dataset.card);
   showPopup();
   getData();
});


// 
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

async function getData() {
  const res = await fetch('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/markups/level-2/shelter/pets.json');
  const data = await res.json();
  console.log(data[1]);
  
  fillContents(data);
  fillContentsPopup(data, numberCard);
}
getData();

const card = document.querySelectorAll('.card-slider');

function fillContents(dataJson) {
   card.forEach(element => {
      element.children[0].src = dataJson[+`${element.dataset.card-1}`].img;
      element.children[1].textContent = dataJson[+`${element.dataset.card-1}`].name;
   });
}

