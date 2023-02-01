const btn = document.querySelector('.btn');

btn.addEventListener('click', () => {
    alert(`Размер вашего экрана: ${screen.width} x ${screen.height}`);
});