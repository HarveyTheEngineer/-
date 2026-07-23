// 直接透過 CSS 選擇器選取訂閱的輸入框與按鈕
const emailInput = document.querySelector('main input[type="text"], main input[type="email"], footer input');
const subscribeBtn = document.querySelector('main button, footer button');

if (subscribeBtn && emailInput) {
    subscribeBtn.addEventListener('click', (e) => {
        e.preventDefault(); // 防止表單預設的跳轉或重新整理行為

        // 檢查是否有填寫內容
        if (emailInput.value.trim() === '') {
            alert('請先輸入您的 Email 喔！');
            return;
        }

        // 彈出訂閱成功提示
        alert('訂閱成功');
        
        // 清空輸入框
        emailInput.value = '';
    });
}