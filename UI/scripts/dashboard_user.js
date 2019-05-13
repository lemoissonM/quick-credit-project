/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
const setDetailSectionVisible = () => {
  sectionRequest.style.display = 'block';
};
const setDetailSectionHidden = () => {
  sectionRequest.style.display = 'none';
};
const modalLoanPaiement = document.getElementById('myModal2');
const closeDialog = () => {
  modalLoanPaiement.style.display = 'none';
};
const showPostLoanDialog = () => {
  modalLoanPaiement.style.display = 'block';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = () => {
  if (event.target === modalLoanPaiement) {
    modalLoanPaiement.style.display = 'none';
  }
};
const menuPastLoans = document.getElementById('menu-loan-1');
const menuRejectedLoans = document.getElementById('menu-loan-2');
const setPastLoanVisible = () => {
  menuPastLoans.setAttribute('class', 'card-tab card-tab-active');
  menuRejectedLoans.setAttribute('class', 'card-tab grey ');
};

const setRejectedLoanVisible = () => {
  menuPastLoans.setAttribute('class', 'card-tab grey');
  menuRejectedLoans.setAttribute('class', 'card-tab card-tab-active ');
};
let menuVisible = false;
const showProfile = () => {
  const menuContent = document.getElementById('menu-content-user');

  if (menuVisible === false) {
    menuContent.style.display = 'table';
    menuVisible = true;
  } else {
    menuContent.style.display = 'none';
    menuVisible = false;
  }
};
let menuNotifVisible = false;
const showNotification = () => {
  const menuContent = document.getElementById('menu-content-notification');

  if (menuNotifVisible === false) {
    menuContent.style.display = 'table';
    menuNotifVisible = true;
  } else {
    menuContent.style.display = 'none';
    menuNotifVisible = false;
  }
};
const showDetail = (loanID) => {
  // alert("overed");
  const viewD = document.getElementsByClassName('view-detail')[loanID];
  viewD.style.display = 'block';
};
const hideDetail = (loanID) => {
  // alert("overed");
  const viewD = document.getElementsByClassName('view-detail')[loanID];
  viewD.style.display = 'none';
};

const modalDialog = document.getElementById('myModal');
const showLoanDetail = () => {
  modalDialog.style.display = 'block';
};
const closeLoanDetail = () => {
  modalDialog.style.display = 'none';
};
