let view = {
	displayMessage: function(msg) {
		let messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},

	displayHit: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute("class", "hit");
	},

	displayMiss: function(location) {
		let cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	},
    displaySunk: function(location){
        let cell = document.getElementById(location);
        cell.setAttribute("class", "sunk");
    }


}; 



let model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] },
		{ locations: [0, 0, 0], hits: ["", "", ""] }
	],

	fire: function(guess) {
		for (var i = 0; i < this.numShips; i++) {
			let ship = this.ships[i];
			let index = ship.locations.indexOf(guess);

			
			if (ship.hits[index] === "hit") {
				view.displayMessage("У тебя уже есть такое место");
				return true;
			} else if (index >= 0) {
				ship.hits[index] = "hit";
				view.displaySunk(guess);
				view.displayMessage("Попадание");
                

				if (this.isSunk(ship)) {
					view.displayMessage("Ты потопил мой корабль");
					this.shipsSunk++;
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("Ты промазал");
		return false;
	},

	isSunk: function(ship) {
		for (let i = 0; i < this.shipLength; i++)  {
			if (ship.hits[i] !== "hit") {
				return false;
			}
		}
	    return true;
	},

	generateShipLocations: function() {
		let locations;
		for (let i = 0; i < this.numShips; i++) {
			do {
				locations = this.generateShip();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
		console.log("Ships array: ");
		console.log(this.ships);
	},

	generateShip: function() {
		let direction = Math.floor(Math.random() * 2);
		let row, col;

		if (direction === 1) { // горизонтальные
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
		} else { // вертикальные
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
			col = Math.floor(Math.random() * this.boardSize);
		}

		let newShipLocations = [];
		for (let i = 0; i < this.shipLength; i++) {
			if (direction === 1) {
				newShipLocations.push(row + "" + (col + i));
			} else {
				newShipLocations.push((row + i) + "" + col);
			}
		}
		return newShipLocations;
	},

	collision: function(locations) {
		for (let i = 0; i < this.numShips; i++) {
			var ship = this.ships[i];
			for (let j = 0; j < locations.length; j++) {
				if (ship.locations.indexOf(locations[j]) >= 0) {
					return true;
				}
			}
		}
		return false;
	}
	
}; 



let controller = {
	guesses: 0,

	processGuess: function(guess) {
		let location = parseGuess(guess);
		if (location) {
			this.guesses++;
			let hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
					view.displayMessage("Ты потопил все мои корабли за" + " " + this.guesses + " " + "попытки");
			}
		}
	}
}




function parseGuess(guess) {
	let alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Пожалуйста введите букву и цифру");
	} else {
		let firstChar = guess.charAt(0);
		let row = alphabet.indexOf(firstChar);
		let column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Такого значения нет на доске");
		} else if (row < 0 || row >= model.boardSize ||
		           column < 0 || column >= model.boardSize) {
			alert("Значения за доской");
		} else {
			return row + column;
		}
	}
	return null;
}



function handleFireButton() {
	let guessInput = document.getElementById("guessInput");
	let guess = guessInput.value.toUpperCase();

	controller.processGuess(guess);

	guessInput.value = "";
}

function handleKeyPress(e) {
	let fireButton = document.getElementById("fireButton");

	
	e = e || window.event;

	if (e.keyCode === 13) {
		fireButton.click();
		return false;
	}
}




window.onload = init;

function init() {
	
	let fireButton = document.getElementById("fireButton");
	fireButton.onclick = handleFireButton;

	
	let guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;


	model.generateShipLocations();
}









