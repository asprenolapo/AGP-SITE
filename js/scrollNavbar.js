const navbar = document.querySelector('.scrollNav')

window.addEventListener('scroll', () => {
if (window.scrollY > 250) {
    navbar.style.display = 'none';
    
} else {
    navbar.style.display = 'block';
}
}); 