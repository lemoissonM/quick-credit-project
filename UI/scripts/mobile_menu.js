/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
const menu1 = document.getElementById('menu-1');
const menu2 = document.getElementById('menu-2');
const menu3 = document.getElementById('menu-3');
const sectionRequest = document.getElementById('user-section');
const loanList = document.getElementById('section-loan-list');
const loanHistory = document.getElementById('section-history');
const setMenu1Visible = () => {
  menu1.setAttribute('class', 'menu-active menu-mobile-tab');
  menu2.setAttribute('class', 'menu-mobile-tab ');
  menu3.setAttribute('class', 'menu-mobile-tab ');
  menu1.style.fontWeight = 'bold';
  menu2.style.fontWeight = 'normal';
  menu3.style.fontWeight = 'normal';

  sectionRequest.style.display = 'block';
  loanList.style.display = 'none';
  loanHistory.style.display = 'none';
};
const setMenu2Visible = () => {
  menu1.setAttribute('class', 'menu-mobile-tab');
  menu2.setAttribute('class', 'menu-active menu-mobile-tab ');
  menu3.setAttribute('class', 'menu-mobile-tab ');
  menu1.style.fontWeight = 'normal';
  menu2.style.fontWeight = 'bold';
  menu3.style.fontWeight = 'normal';

  sectionRequest.style.display = 'none';
  loanList.style.display = 'block';
  loanHistory.style.display = 'none';
};
const setMenu3Visible = () => {
  menu1.setAttribute('class', 'menu-mobile-tab');
  menu2.setAttribute('class', ' menu-mobile-tab');
  menu3.setAttribute('class', ' menu-active menu-mobile-tab');
  menu1.style.fontWeight = 'normal';
  menu2.style.fontWeight = 'normal';
  menu3.style.fontWeight = 'bold';

  sectionRequest.style.display = 'none';
  loanList.style.display = 'none';
  loanHistory.style.display = 'block';
};
window.onresize = () => {
  if (window.innerWidth >= 1150) {
    sectionRequest.style.display = 'inline-block';
    loanList.style.display = 'inline-block';
    loanHistory.style.display = 'inline-block';
  }
  console.log(window.innerWidth);
};
