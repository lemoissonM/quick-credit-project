/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
document.getElementById('register1').addEventListener('submit', (event) => {
  event.preventDefault();
});
document.getElementById('connection').addEventListener('submit', (event) => {
  event.preventDefault();
});
const switchForm = (form) => {
  const register1Form = document.getElementById('register1');
  const registerFinishForm = document.getElementById('register2');
  const loginForm = document.getElementById('connection');
  const loginTab = document.getElementById('connection_tab');
  const registerTab = document.getElementById('registerTab');
  switch (form) {
    case 'reg1':
      register1Form.style.display = 'block';
      registerFinishForm.style.display = 'none';
      loginForm.style.display = 'none';
      registerTab.setAttribute('class', 'tab-connection-active');
      loginTab.setAttribute('class', 'tab-connection');
      break;
    case 'reg2':
      register1Form.style.display = 'none';
      registerFinishForm.style.display = 'block';
      loginForm.style.display = 'none';
      break;
    case 'login':
      register1Form.style.display = 'none';
      registerFinishForm.style.display = 'none';
      loginForm.style.display = 'block';
      loginTab.setAttribute('class', 'tab-connection-active');
      registerTab.setAttribute('class', 'tab-connection');
      break;
    default:
  }
};

letCheckRegForm1 = () => {
  if (document.getElementById('fname_input').value && document.getElementById('lname_input').value && document.getElementById('mail_input').value && document.getElementById('password_input').value && document.getElementById('cpassword_input').value) {
    switchForm('reg2');
  }
};

const loginBtn = document.getElementById('loginBtn');
loginBtn.onclick = () => {
  if (document.getElementById('mail').value && document.getElementById('password_login').value) {
    if (document.getElementById('mail').value === 'admin@quickcredit.com') { window.location = 'dashboard_admin.html'; } else {
      window.location = 'dashboard.html';
    }
  }
};
