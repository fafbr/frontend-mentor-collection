const markAll = document.getElementById('mark-all');
const unreadMessages = document.querySelectorAll('.notification.unread');
const notifCount = document.getElementById('notif-count');

markAll.addEventListener('click', () => {
    unreadMessages.forEach(el => {
        el.classList.remove('unread');
    });

    notifCount.innerText = '0';
})