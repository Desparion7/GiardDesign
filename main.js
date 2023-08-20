
import './style.scss'
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
	// popup
	let currentIndex = 0;
	let galleryItems = document.querySelectorAll('.grid-item');
	const popupContainer = document.querySelector('.popup-container');
	const popupBackdrop = document.querySelector('.popup-backdrop');
	const popupImage = document.querySelector('.popup-image');
	const popupCloseBtn = document.querySelector('.popupCloseBtn');
	const popupNextBtn = document.querySelector('.popupNextBtn');
	const popupPrevBtn = document.querySelector('.popupPrevBtn');

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
			imgElement.src = `img/g${photoNumber}.png`;
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
		// refresh img for popup
		galleryItems = document.querySelectorAll('.grid-item');
		addListenersForPhoto();
	});

	// POPUP
	const addListenersForPhoto = () => {
		galleryItems.forEach((item, index) => {
			if (!item.hasEventListener) {
				const clickHandler = () => {
					currentIndex = index;
					const imageSrc = item.querySelector('img').src;
					const imageName = imageSrc.split('/').pop();
					const imageNameParts = imageName.split('.');
					const newImageName = `${imageNameParts[0]}-big.${imageNameParts[1]}`;
					const newImageSrc = imageSrc.replace(
						imageName,
						newImageName
					);
					popupImage.src = newImageSrc;
					popupContainer.style.display = 'flex';
				};

				item.addEventListener('click', clickHandler);
				item.hasEventListener = true;
			}
		});
	};

	const showNextImage = () => {
		currentIndex = (currentIndex + 1) % galleryItems.length;
		const nextImageSrc =
			galleryItems[currentIndex].querySelector('img').src;
		const imageName = nextImageSrc.split('/').pop();
		const imageNameParts = imageName.split('.');
		const newImageName = `${imageNameParts[0]}-big.${imageNameParts[1]}`;
		const newImageSrc = nextImageSrc.replace(imageName, newImageName);
		popupImage.src = newImageSrc;
	};

	const showPrevImage = () => {
		currentIndex =
			(currentIndex - 1 + galleryItems.length) % galleryItems.length;
		const prevImageSrc =
			galleryItems[currentIndex].querySelector('img').src;
		const imageName = prevImageSrc.split('/').pop();
		const imageNameParts = imageName.split('.');
		const newImageName = `${imageNameParts[0]}-big.${imageNameParts[1]}`;
		const newImageSrc = prevImageSrc.replace(imageName, newImageName);
		popupImage.src = newImageSrc;
	};

	// close popup
	popupBackdrop.addEventListener('click', () => {
		popupContainer.style.display = 'none';
	});
	popupCloseBtn.addEventListener('click', () => {
		popupContainer.style.display = 'none';
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape') {
			popupContainer.style.display = 'none';
		}
	});

	// change img
	document.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowRight') {
			showNextImage();
		}
	});
	popupNextBtn.addEventListener('click', () => {
		showNextImage();
	});
	document.addEventListener('keydown', (event) => {
		if (event.key === 'ArrowLeft') {
			showPrevImage();
		}
	});
	popupPrevBtn.addEventListener('click', () => {
		showPrevImage();
	});
	// change img for mobile
	popupContainer.addEventListener('swiped-left', () => {
		showNextImage();
	});
	popupContainer.addEventListener('swiped-right', () => {
		showPrevImage();
	});

	addListenersForPhoto();
};
