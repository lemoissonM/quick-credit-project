/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
const modalDialog = document.getElementById('myModal');
const modalLoanPaiement = document.getElementById('myModal2');
const showDialog = function (dialogMsg, yes, no) {
  const modalText = document.getElementById('modal-text');
  modalText.innerHTML = dialogMsg;
  modalDialog.style.display = 'block';
  console.log('clicked');
};
const showLoanDetail = function () {
  modalDialog.style.display = 'block';
};
const closeLoanDetail = function () {
  modalDialog.style.display = 'none';
};
const closeDialog = function () {
  modalLoanPaiement.style.display = 'none';
};
const showPostLoanDialog = function () {
  modalLoanPaiement.style.display = 'block';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modalDialog) {
    modalDialog.style.display = 'none';
    modalLoanPaiement.style.display = 'none';
  }
};
const menuPastLoans = document.getElementById('menu-loan-1');
const menuRejectedLoans = document.getElementById('menu-loan-2');
const menuAllLoans = document.getElementById('menu-loan-3');
const setPastLoanVisible = function (pageId) {
  if (!pageId) {
    menuPastLoans.setAttribute('class', 'card-tab card-tab-active');
    menuRejectedLoans.setAttribute('class', 'card-tab grey ');
    menuAllLoans.setAttribute('class', 'card-tab grey ');
  } else {
    menuPastLoans.setAttribute('class', 'card-tab card-tab-active card-tab-three');
    menuRejectedLoans.setAttribute('class', 'card-tab grey card-tab-three');
    menuAllLoans.setAttribute('class', 'card-tab grey card-tab-three');
  }
};

const setRejectedLoanVisible = function (pageId) {
  if (!pageId) {
    menuPastLoans.setAttribute('class', 'card-tab grey');
    menuRejectedLoans.setAttribute('class', 'card-tab card-tab-active ');
    menuAllLoans.setAttribute('class', 'card-tab grey ');
  } else {
    menuPastLoans.setAttribute('class', 'card-tab grey card-tab-three');
    menuRejectedLoans.setAttribute('class', 'card-tab card-tab-active card-tab-three ');
    menuAllLoans.setAttribute('class', 'card-tab grey card-tab-three');
  }
};
const setAllLoanVisible = function (pageId) {
  if (!pageId) {
    menuPastLoans.setAttribute('class', 'card-tab grey');
    menuRejectedLoans.setAttribute('class', 'card-tab grey');
    menuAllLoans.setAttribute('class', 'card-tab card-tab-active ');
  } else {
    menuPastLoans.setAttribute('class', 'card-tab grey card-tab-three');
    menuRejectedLoans.setAttribute('class', 'card-tab grey card-tab-three ');
    menuAllLoans.setAttribute('class', 'card-tab card-tab-active card-tab-three');
  }
};

let menuVisible = false;
const showProfile = function () {
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
const showNotification = function () {
  const menuContent = document.getElementById('menu-content-notification');

  if (menuNotifVisible === false) {
    menuContent.style.display = 'table';
    menuNotifVisible = true;
  } else {
    menuContent.style.display = 'none';
    menuNotifVisible = false;
  }
};
const verify = function (parent) {
  parent.style.background = '#dcffde';
  setTimeout(() => {
    parent.style.display = 'none';
  }, 500);
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
