// Burger Menu
const burgerIcon = document.querySelector('.header__burger');
const menuHeader = document.querySelector('.header__menu');
const logoHeader = document.querySelector('.logo-header');
const shadow = document.querySelector('.shadow');
const menuElement = document.querySelector('.menu-header__item');
// const headerContainerPets = document.querySelector('.header__container_pets'); 

function burgerMove(event) {
      menuHeader.classList.toggle('header__menu_active');
      burgerIcon.classList.toggle('header__burger_active');
      logoHeader.classList.toggle('logo-header_active');
      shadow.classList.toggle('shadow_active-header');
      if (shadow.classList.contains('shadow_active-header')) {
         document.body.style.overflow = "hidden"
      } else document.body.style.overflow = "";
      
      if (burgerIcon.children[0].classList.contains('burger__line_dark')) {
         menuHeader.classList.add('header__menu_pets-active');
         // headerContainerPets.classList.toggle('header__container_pets-active');
      } else {
         // headerContainerPets.classList.toggle('header__container_pets-active');
         menuHeader.classList.remove('header_pets-active')
      };
      if (shadow.classList.contains('shadow_active-header')) {
         shadow.addEventListener('click', burgerMove);
      } else shadow.removeEventListener('click', burgerMove);
}

burgerIcon.addEventListener('click', burgerMove);
menuHeader.addEventListener('click', burgerMove);



