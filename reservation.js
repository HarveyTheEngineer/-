function zoomIn(imgElem) {
    // 建立一個全螢幕的遮罩容器
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.cursor = 'zoom-out';

    // 建立放大後的圖片元素
    let bigImg = document.createElement('img');
    bigImg.src = imgElem.src;
    bigImg.style.maxHeight = '90vh';
    bigImg.style.maxWidth = '90vw';
    bigImg.style.objectFit = 'contain';
    bigImg.style.borderRadius = '8px';

    // 將圖片放入遮罩中
    overlay.appendChild(bigImg);

    // 將遮罩放入網頁主體中
    document.body.appendChild(overlay);

    // 點擊遮罩或圖片的任何地方就關閉放大效果
    overlay.onclick = function () {
        document.body.removeChild(overlay);
    };
}





const today = new Date();
let currentDate = new Date(today.getFullYear(), today.getMonth(), 1)
function initCalendar() {
    renderCalendar();
    document.getElementById('prev-month').addEventListener
        ('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });
    document.getElementById('next-month').addEventListener
        ('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });
}
function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    document.getElementById('current-month').textContent = `${year} 年 ${month + 1}月`

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const daysInMonth = lastDay.getDate();
    const firstDayOfWeek = firstDay.getDay();

    const calendarBody = document.getElementById('calendar-body');
    calendarBody.innerHTML = '';

    let date = 1;
    for (let i = 0; i < 6; i++) {
        if (date > daysInMonth && i > 0) break;

        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');
            if (j === 0 || j === 6) {
                cell.classList.add('weekend')
            }

            if (i === 0 && j < firstDayOfWeek) {
                const prevMonthLastDay = new Date(year, month, 0).getDate();
                const prevDate = prevMonthLastDay - (firstDayOfWeek - j - 1);

                cell.innerHTML = `<div class="day-number">${prevDate}</div>`;
                cell.classList.add('other-month');
            } else if (date > daysInMonth) {
                const nextDate = date - daysInMonth;

                cell.innerHTML = `<div class="day-number">${nextDate}</div>`;
                cell.classList.add('other-month');
                date++
            } else {
                const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
                const dayOfWeek = new Date(year, month, date).getDay();

                cell.innerHTML = `<div class="day-number">${date}</div>`;

                if (year === today.getFullYear() &&
                    month === today.getMonth() &&
                    date === today.getDate()) {
                    cell.classList.add('today');
                }
                date++;
            }
            row.appendChild(cell);
        }
        calendarBody.appendChild(row);
    }
}

window.onload = initCalendar;




const submitBtn = document.getElementById('submitBtn');
const usernameInput = document.getElementById('username');
const userphoneInput = document.getElementById('userphone');
const dateInput = document.getElementById('date');

if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault(); // 防止畫面重新整理

        const nameValue = usernameInput.value.trim();
        const phoneValue = userphoneInput.value.trim();
        const dateValue = dateInput.value.trim();

        // 1. 檢查姓名是否填寫
        if (nameValue === '') {
            alert('請填寫您的姓名！');
            usernameInput.focus();
            return;
        }

        // 2. 檢查電話是否填寫
        if (phoneValue === '') {
            alert('請填寫您的電話！');
            userphoneInput.focus();
            return;
        }

        // 3. 檢查電話格式是否正確（台灣手機號碼：09開頭，共10碼數字）
        const phoneRegex = /^09\d{8}$/;
        if (!phoneRegex.test(phoneValue)) {
            alert('電話格式不正確！請輸入正確的 10 碼手機號碼（例如：0912345678）。');
            userphoneInput.focus();
            return;
        }

        // 4. 檢查預約日期/時段是否填寫
        if (dateValue === '') {
            alert('請填寫或選擇您的預約日期/時段！');
            dateInput.focus();
            return;
        }

        // 5. 檢查「是否有需卸甲」是否勾選
        const nailCleanChecked = document.querySelector('input[name="nailclean"]:checked');
        if (!nailCleanChecked) {
            alert('請選擇是否有需卸甲！');
            return;
        }

        // 6. 檢查「施作項目」是否勾選
        const nailStyleChecked = document.querySelector('input[name="nailStyle"]:checked');
        if (!nailStyleChecked) {
            alert('請選擇施作項目（單色或造型）！');
            return;
        }

        // 7. 檢查「是否已詳閱預約須知」是否勾選
        const readChecked = document.querySelector('input[name="read"]:checked');
        if (!readChecked) {
            alert('請確認是否已詳閱預約須知！');
            return;
        }

        // 8. 所有檢查皆通過後，顯示預約成功
        alert('預約成功！我們已收到您的資訊。');
        
        // 清空表單
        document.getElementById('reservationForm').reset();
    });
}