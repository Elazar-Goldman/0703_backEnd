let elem = document.querySelectorAll(".wrap");
let plus = document.querySelectorAll(".plus");
let minus = document.querySelectorAll(".minus");
let total = document.querySelectorAll(".total");

// elem.forEach((item, index) => {
//   item.addEventListener("click", (evt) => {
//     plus.forEach((add) => {
//       add.addEventListener("click", (evt) => {
//         let val = parseInt(total[index].innerHTML);

//       });
//     });
//   });
// });




plus.forEach((add, i) => {
  let value = parseInt(total[i].textContent);
  add.addEventListener("click", (evt) => {
    total[i].textContent = value++;
  });
});
minus.forEach((add, i) => {
  let value = parseInt(total[i].textContent);
  add.addEventListener("click", (evt) => {
    total[i].textContent = value--;
  });
});
