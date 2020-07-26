let sorting;

//This should have the size of #container width for the maximum resolution
let width = 1000;

let height = 380;
let dx = 10;
let n = width/dx;


//Buttons
let selection = document.getElementById("selection");
selection.onclick = () => {
	sorting = new SelectionSort(n, width, height, dx);
}

let insertion = document.getElementById("insertion")
insertion.onclick = () => {
	sorting = new InsertionSort(n, width, height, dx);
}

let bubble = document.getElementById("bubble")
bubble.onclick = () => {
	sorting = new BubbleSort(n, width, height, dx);
	console.log("clicked");
}

let radix = document.getElementById("radix")
radix.onclick = () => {
	sorting = new RadixSort(n, width, height, dx);
	console.log("clicked");
}

let cocktail = document.getElementById("cocktail")
cocktail.onclick = () => {
	sorting = new CockTailSort(n, width, height, dx);
	console.log("clicked");
}

let bogo = document.getElementById("bogo")
bogo.onclick = () => {
	sorting = new BogoSort(n, width, height, dx);
	console.log("clicked");
}

let gravity = document.getElementById("gravity");
gravity.addEventListener("click", () => {
	sorting = new GravitySort(n, width, height, dx);
})

let terminator = document.getElementById("terminator")
terminator.addEventListener("click", () => {
	if(sorting !== undefined)
	{
		sorting.terminate = true;
	}
})