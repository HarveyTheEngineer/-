// 分類過濾邏輯
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        galleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            if (filterValue === 'all' || itemCategory === filterValue) {
                item.classList.remove('hide');
            } else {
                item.classList.add('hide');
            }
        });
    });
});

// 彈出視窗與多圖載入邏輯
const modal = document.getElementById('detailModal');
const modalTitle = document.getElementById('modalTitle');
const modalImagesGrid = document.getElementById('modalImagesGrid');

function openModal(title, imageArray) {
    modalTitle.textContent = title;
    modalImagesGrid.innerHTML = ''; // 清空舊圖片

    // 【放點進去後的多張細節圖片位置】透過 JavaScript 迴圈建立細節圖卡片
    imageArray.forEach((imgSource) => {
        const imgCard = document.createElement('div');
        imgCard.className = 'modal-img-card';

        // 如果是真實圖片，建議改為：imgCard.style.backgroundImage = `url('${imgSource}')`;
        imgCard.style.backgroundImage = `url('${imgSource}')`;
        imgCard.style.backgroundSize = 'cover';
        imgCard.style.backgroundPosition = 'center';

        modalImagesGrid.appendChild(imgCard);
    });

    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// 點擊背景可關閉彈跳視窗
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});



