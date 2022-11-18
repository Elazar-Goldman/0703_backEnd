let elem = document.querySelectorAll(".wrap");
let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let total = document.querySelectorAll(".total");

plus.forEach((add, i) => {
  add.addEventListener("click", (evt) => {
    let value = parseInt(total[i].value);
    value++;
    total[i].value = value;
  });
});
minus.forEach((add, i) => {
  add.addEventListener("click", (evt) => {
    let value = parseInt(total[i].value);
    value--;
    value = value < 0 ? 0 : value;
    total[i].value = value;
  });
});
