function main()
{
	let width = 500;
	let height = 500;

	//create array
	let algorithm = new MyArray(50, width, height);

	//shuffle the cards
	algorithm.shuffle();


	//do the selection sort
	//algorithm.selectionSort();

	//do the insertion sort
	//algorithm.insertionSort();

	//do the bubble sort
	//algorithm.bubbleSort();

	//algorithm.radixSort();

	//algorithm.cocktailSort();

	//algorithm.bogoSort();

	console.log(algorithm.array);

	//algorithm.array.forEach(element => console.log(Math.floor(element)));

	//algorithm.gravitySort();
	

}

main();

