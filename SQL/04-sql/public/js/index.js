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
  add.addEventListener("click", (evt) => {
    let value = parseInt(total[i].value);
    let count = value;
    count++;
    total[i].value = count;
    value = count;
  });
});
minus.forEach((add, i) => {
  add.addEventListener("click", (evt) => {
    console.log(total[i].value);
    let value = parseInt(total[i].value);
    let count = value;
    count--;
    total[i].value = count;
    value = count;
  });
});

let myName = "Eli";
