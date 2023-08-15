import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';

// Nav

const searchBtn = document.querySelector('.searchBtn');
const burgerBtn = document.querySelector('.burgerBtn');
const navSearch = document.querySelector('.searchForm');

// toggle searchForm
searchBtn.addEventListener('click', () => {
	if (navSearch.style.display === 'none' || navSearch.style.display === '') {
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
