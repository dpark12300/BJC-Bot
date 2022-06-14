const date = new Date();
window.addEventListener("load", ()=>{
	const loader = document.querySelector(".loader");
	loader.className += " hidden";
});
if (season() == 'winter') {
	document.body.style.backgroundImage = 'url(https://unsplash.com/photos/7kj6h_jaUd4/download?force=true&w=1400)';
	$('.text').css('color', 'black');
} else if (season() == 'spring') {
	document.body.style.backgroundImage = 'url(https://unsplash.com/photos/H1k1dxbG7mg/download?force=true&w=1400)';
	$('.text').css('color', 'white');
} else if (season() == 'summer') {
	document.body.style.backgroundImage = 'url(https://unsplash.com/photos/2iS6nQWXYvE/download?force=true&w=1400)';
	$('.text').css('color', 'white');
} else if (season() == 'fall') {
	document.body.style.backgroundImage = 'url(https://unsplash.com/photos/y-FrYi7gBzE/download?force=true&w=1400)';
	$('.text').css('color', 'black');
} else {
	document.body.style.backgroundImage = 'url(https://unsplash.com/photos/7kj6h_jaUd4/download?force=true&w=1400)';
	$('.text').css('color', 'black');
}