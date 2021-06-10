let view = {
    displayMessage: function (msg) {
        let messageArea = document.getElementById("messageArea");
        messageArea.innerHTML = msg;
    },
    displayHit: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "hit");
    },
    displayMiss: function (location) {
        let cell = document.getElementById(location);
        cell.setAttribute("class", "miss");
    }

};
let model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipsSunk: 0,
    ships=[
        { location: ["10", "20", "30"], hits: ["", "", ""] },
        { location: ["42", "43", "44"], hits: ["", "", ""] },
        { location: ["63", "64", "65"], hits: ["", "", ""] }],
    fire: function (guess) {
        for (let i = 0; i < this.numShips; i++) {
            let ship = this.ships[i];
            location=ship.location;
            let index=locations.indexOf(guess);
            if(index>=0){
                ship.hits[index]="hit";
                view.displayHit(guess);
                view.displayMessage("Hit");
                if(this.isSunk(ship)){
                    view.displayMessage("You sank my battleship");
                    this.shipsSunk++;
                }
                return true;
            }
        }
        view.displayMiss(guess);
        view.displayMessage("You miss");
        return false;
    },
    isSunk:function(ship){
        for(let i=0;i<this.shipLength; i++){
            if(ship.hits[i]!=="hit"){
                return false;
            }
        }
        return true;
    }

};



