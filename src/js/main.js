import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
import Masonry from 'masonry-layout';

// Nav
window.onload = () => {
	const searchBtn = document.querySelector('.searchBtn');
	const burgerBtn = document.querySelector('.burgerBtn');
	const navSearch = document.querySelector('.searchForm');
	const gradient = document.querySelector('.gradient');
	const galleryBtn = document.querySelector('.realization-btnBox');
	const grid = document.querySelector('.grid');
	const photosIncrement = 5;
	let photoNumber = 7;

	// toggle searchForm
	searchBtn.addEventListener('click', () => {
		if (
			navSearch.style.display === 'none' ||
			navSearch.style.display === ''
		) {
			navSearch.style.display = 'flex';
		} else {
			navSearch.style.display = 'none';
		}
	});
	burgerBtn.addEventListener('click', () => {
		if (navSearch.style.display === 'flex') {
			navSearch.style.display = 'none';
		}
	});
	// Photo
	const masonry = new Masonry(grid, {
		itemSelector: '.grid-item',
		columnWidth: '.grid-item',
		gutter: 15,
		// percentPosition: true,
	});

	// create new photo div
	const createDiv = () => {
		const photoAmount = photoNumber + photosIncrement;

		while (photoNumber !== photoAmount) {
			photoNumber++;
			const divElement = document.createElement('div');
			divElement.className = 'grid-item';
			const imgElement = document.createElement('img');
			imgElement.src = `./assets/g${photoNumber}.png`;
			imgElement.alt = 'projekt';
			divElement.appendChild(imgElement);
			grid.appendChild(divElement);

			masonry.appended(divElement);
			masonry.reloadItems();
		}
	};

	galleryBtn.addEventListener('click', () => {
		gradient.style.display = 'none';
		galleryBtn.style.display = 'none';
		createDiv();
		setTimeout(() => {
			masonry.layout();
		}, 50);
	});
};
