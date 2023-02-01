const btn = document.querySelector('.btn');
const icon1 = document.querySelector('.btn__icon1');
const icon2 = document.querySelector('.btn__icon2');

btn.addEventListener('click', () => {
    icon1.classList.toggle("hidden");
    icon2.classList.toggle("unset");
 
});