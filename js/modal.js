const openModal = document.getElementById('openModal');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('subscribeModal');

openModal.addEventListener('click', function(e) {
    e.preventDefault();
    modal.classList.add('active');
    document.body.classList.add('modal-open');
});

closeModal.addEventListener('click', function() {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
});

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
    }
});