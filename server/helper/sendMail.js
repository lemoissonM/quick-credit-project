import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'lemoissonquick@gmail.com',
    pass: '12345678Quick',
  },
});
export function sendMailPassword(message, receiver, res) {
  const info = transporter.sendMail({
    from: '"QUick Credit" <lemoissonquick@gmail.com>',
    to: receiver,
    subject: 'Your password changed ✔',
    html: `<h1> Your new password is </h1> <b> ${message} </b>`,
  }).then((result) => {
    res.status(200).send({
      status: 200,
      message: 'Chech your email to find your new password',
    });
    console.debug(result);
  }).catch((err) => {
    res.status(500).send();
    console.debug(err);
  });
}
export function sendLoanMail(message, receiver, loan) {
  const info = transporter.sendMail({
    from: '"Lemoisson from QUick Credit " <lemoissonquick@gmail.com>',
    to: receiver,
    subject: 'Your loan status changed !!',
    html: `<html><head><style>
.loan-content
{
  color:back;
  font-size:15px;
  font-family:calibri;
  position:relative;
  background:#f9f6f6;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.5);
  width: 50%;
}
.loan-user-name
{
  font-weight:bold;
  display: inline-block;
  width:100%;
  margin-top: -5px;
  font-size:16px;
}
.loan-detail{
  margin-top:-10px;
  padding-bottom: 8px;
  font-size:15px;
  margin-right:0px;
  border-bottom: 1px solid #f1f1f1;
}
.loan-detail1{
  margin-top:-10px;
  padding-bottom: 8px;
  font-size:15px;
  margin-right:0px;

}

.right{float:right;margin-right:8px}

      </style> <body>
      <b>${message}</b>
      <div class="loan-content">
                <p class="loan-user-name">Date 23/5/2019  <span class="right"> Loan Id :${loan.id}</span> </p>
                <p class="loan-detail1 grey"> Amount : ${loan.amount} USD <span class="right">Tenor : ${loan.tenor} Months </span> </p>
                <p class="loan-detail grey"> Total interest : ${loan.interest} USD  <span class="right">monthly paiment : ${loan.paymentinstallment} USD </span> </p>
              </div>
       </body>`,
  }).then((result) => {
    console.debug(result);
  }).catch((err) => {
    console.debug(err);
  });
}
