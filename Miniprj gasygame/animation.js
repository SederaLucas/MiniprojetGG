document.getElementById("entrerj1").addEventListener('click', function() {
    var nomj1 = prompt('entrer le nom du joueur 1');
    document.getElementById('Nomj1').innerHTML = nomj1;
})

document.getElementById("entrerj2").addEventListener('click', function() {
    var nomj2 = prompt('entrer le nom du joueur 2');
    document.getElementById('Nomj2').innerHTML = nomj2;
})
// Tableau
var tab = [
    [1, 1, 1],
    [0, 0, 0],
    [2, 2, 2]
];


var position = document.querySelectorAll(".position");
var turn = document.querySelector(".container");

var player = "p1";

for(var elmt of position){
    var temp,
        from;

    elmt.addEventListener("click", function(e){

        if(!turn.classList.contains("moving")) {

            if(turn.classList.contains("player1")) {

                if(this.classList.contains("p1")) {
                    from = this.id;

                    this.classList.remove("p1");
                    this.classList.add("active-p1");
                    temp = this; 

                    turn.classList.add("moving");
                }
                else {
                    alert("Au tour du joueur 1");
                }

            }

            else if(turn.classList.contains("player2")) {

                if(this.classList.contains("p2")) {
                    from = this.id;

                    console.log(this.id);

                    this.classList.remove("p2");
                    this.classList.add("active-p2"); 
                    temp = this;

                    turn.classList.add("moving");
                }
                else {
                    alert("Au tour du joueur 2");
                }

            }

        }
        else {
            
            if(turn.classList.contains("player1")) {

                if(this != temp) {

                    if(!this.classList.contains("p1") && !this.classList.contains("p2") && isValid(from, this.id)) {
                        moveTo(from, this.id);

                        this.classList.add("p1");

                        temp.classList.remove("active-p1"); 

                        turn.classList.remove("moving");
                        turn.classList.remove("player1");
                        turn.classList.add("player2");
                    }
                    else {
                        alert("Ce coup n'est pas permis");
                    }

                    if(gameOver(1)){
                        alert("joueur 1 remporte cette manche");
                        window.location.reload();
                    }

                }
                else {
                    this.classList.add("p1");
                    this.classList.remove("active-p1");

                    turn.classList.remove("moving");
                }

            }

            else if(turn.classList.contains("player2")) {

                if(this != temp) {

                    if(!this.classList.contains("p1") && !this.classList.contains("p2") && this != temp && isValid(from, this.id)) {
                        moveTo(from, this.id);

                        this.classList.add("p2");
                        
                        temp.classList.remove("active-p2"); 

                        turn.classList.remove("moving");
                        turn.classList.remove("player2");
                        turn.classList.add("player1");
                    }
                    else {
                        alert("Ce coup n'est pas permis");
                    }

                    if(gameOver(2)){
                        alert("Joueur 2 remporte cette manche");
                        window.location.reload();
                    }

                }
                else {
                    this.classList.add("p1");
                    this.classList.remove("active-p1");

                    turn.classList.remove("moving");
                }

            }

        }

    }, false);
}

// Fonctions
function moveTo(id1, id2) {
    var start = id1.split("-")[1].split("");
    var end = id2.split("-")[1].split("");

    if(tab[end[0]][end[1]] != 0){
        console.log("Erreur")
        return;
    }

    tab[end[0]][end[1]] = tab[start[0]][start[1]];
    tab[start[0]][start[1]] = 0;
}

function display() {
    for(var i=0; i<3; i++) {
        console.log(tab[i][0], " ", tab[i][1], " ", tab[i][2]);
    }
}

function isValid(id1, id2) {
    var start = id1.split("-")[1];
    var end = id2.split("-")[1];

    // Centre
    if(start === "11")
        return true;

    // Coins
    if(start === "00") {
        if(end === "01" || end === "10" || end === "11")
            return true;
    }

    if(start === "02") {
        if(end === "01" || end === "12" || end === "11")
            return true;
    }

    if(start === "20") {
        if(end === "21" || end === "10" || end === "11")
            return true;
    }

    if(start === "22") {
        if(end === "21" || end === "12" || end === "11")
            return true;
    }

    // Arrets
    if(start === "01") {
        if(end === "00" || end === "02" || end === "11")
            return true;
    }

    if(start === "10") {
        if(end === "00" || end === "20" || end === "11")
            return true;
    }

    if(start === "21") {
        if(end === "20" || end === "22" || end === "11")
            return true;
    }

    if(start === "12") {
        if(end === "02" || end === "22" || end === "11")
            return true;
    }

    return false;
}



//fonction d'arrêt eto


function isAlignedX(x){
    var compt = 0;

    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(arrayPosition[i][j] == x){
                compt++;
            }
        }
        if(compt == 3){
            return true;
        }
        compt = 0;
    }

    return false;
}

function isAlignedY(x){
    var compt = 0;

    for(var i=0;i<3;i++){
        for(var j=0;j<3;j++){
            if(arrayPosition[j][i] == x){
                compt++;
            }
        }
        if(compt == 3){
            return true;
        }
        compt = 0;
    }

    return false;
}

function isAlignedDiag(x){
    if(x == arrayPosition[0][0] || x == arrayPosition[2][2] || x == arrayPosition[1][1])
        if(arrayPosition[1][1] == arrayPosition[0][0] && arrayPosition[1][1] == arrayPosition[2][2])
            return true;
    
    if(x == arrayPosition[0][2] || x == arrayPosition[2][0] || x == arrayPosition[1][1])
        if(arrayPosition[1][1] == arrayPosition[0][2] && arrayPosition[1][1] == arrayPosition[2][0])
            return true;

    return false;
}
