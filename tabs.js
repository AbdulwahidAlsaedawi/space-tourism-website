const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(e) {
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.key === "ArrowRight") {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.key === "ArrowLeft") {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
        e.preventDefault();  // منع التمرير الافتراضي عند الضغط على الأسهم
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    const targetImage = targetTab.getAttribute("data-image");

    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    // إلغاء تمييز التبويب المحدد سابقاً
    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);

    // تعيين التبويب الحالي كمحدد
    targetTab.setAttribute("aria-selected", true);

    // إخفاء جميع المحتويات ثم إظهار المحتوى الخاص بالتبويب المحدد
    hideContent(mainContainer, '[role="tabpanel"]');
    showContent(mainContainer, `#${targetPanel}`);

    hideContent(mainContainer, 'picture');
    showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
    parent.querySelectorAll(content).forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content).removeAttribute('hidden');
}
