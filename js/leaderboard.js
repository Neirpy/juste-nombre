const listeScore = document.querySelector('#listeScore');

let leaderboard = load();


function load(){
    return (JSON.parse(localStorage.getItem("list")) || []);
}

function search(name){
    return leaderboard.filter(function (leader){
        return leader.name.includes(name);
    });
}

let searchInput = document.querySelector("#search");
searchInput.addEventListener("keyup",function (){
    let result=search(searchInput.value);
    listeScore.innerHTML = "";
    displayLeaderboard(result);
});




function displayRow(row){
    let div_lb = document.createElement('div');
    div_lb.classList = ('row');

    div_lb.innerHTML = `<div class="name">${row.name}</div><div class="score">${row.score}</div><div class="time">${row.time}</div>`;

    listeScore.append(div_lb);

}

function displayLeaderboard(leaderboard){
    console.log(leaderboard);
    sort();
    leaderboard.forEach(element => {
        displayRow(element);
    });

}

function resetScore(){
    localStorage.clear();
    displayLeaderboard(leaderboard);
    listeScore.innerHTML = "";
}

function sort(){
    leaderboard.sort((a,b) => a.score - b.score);
}




displayLeaderboard(leaderboard);

