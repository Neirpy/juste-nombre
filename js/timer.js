export function choiceDifficulty() {
  let timer = document.getElementById("timer");
  let select = document.getElementById("difficulty");
  select.addEventListener("change", () => {
    let choiceDifficulty = select.selectedIndex;
    let difficult = select.options[select,choiceDifficulty].value;
    console.log(difficult);
    switch (difficult) {
      case "easy":
        timer.innerText = 60;
        break;
      case "normal":
        timer.innerText = 30;
        break;
      case "hard":
        timer.innerText = 15;
        break;
      case "extra-hard":
        timer.innerText = 10;
        break;
    }
    return timer.innerText;
  });

}


