/*

!!!!
DRAW FONKSİYONUNU NEREYE KOYACAĞINA KARAR VER !!!!!!
!!!!

*/


//function constructor
function MyArray(n, width, height)
{
	//canvas
	this.canvas = document.getElementById("myCanvas");

	this.canvas = document.getElementById("myCanvas");

	this.canvas.width = width, this.canvas.height = height;
	this.canvas.style = "border:1px solid black";

	this.ctx = this.canvas.getContext("2d");

	this.array = [];

	this.sorted = [];	//color black
	this.activeIndex = [];

	this.FPS = 60;

	for(let i=0; i<n; i++)
	{
		this.array.push(parseFloat((Math.random() * (height*0.7 - height*0.1 + 1) + height*0.1).toFixed(2)));
	}

	this.shuffle();
}

MyArray.prototype.clear = function()
{
	this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

//adjust this function!!!
MyArray.prototype.draw = function()
{
	//console.log(this.array, this.minIndex);
	//drawing function

	//clear canvas
	this.clear();

	var xPos = 0;


	for(let i = 0; i<this.array.length; i++)
	{
		if(this.sorted.includes(i))
		{
			this.ctx.fillStyle = "black";
		}else if(this.activeIndex.includes(i))
		{
			this.ctx.fillStyle = "green";
		}else
		{
			this.ctx.fillStyle = "blue";
		}

		this.ctx.fillRect(xPos, this.canvas.height, 10, - this.array[i]);
		xPos += 10;
	}
	
}

//returns a promise
//thus we can use await keyword in sorting functions
MyArray.prototype.delay = function(time)
{
	return new Promise((resolve, reject) => {
		setTimeout(resolve, time)
	})
}

MyArray.prototype.swap = function(index1, index2)
{
	let temp = this.array[index1];
	this.array[index1] = this.array[index2];
	this.array[index2] = temp;
}

MyArray.prototype.selectionSort = async function()
{
	//temporary values...
	let minIndex, temp;
	//this.counter = 0;
	this.sorted = [];

	//console.log("counter : ", this.counter);

	for(let i=0; i<this.array.length; i++)
	{
		minIndex = i;
		this.minIndex = i;	

		for(let j=i; j<this.array.length; j++)
		{
			//this.activeIndex = j;
			if(this.array[minIndex] > this.array[j])
			{
				this.minIndex = j;
				minIndex = j;
			}
			//wait for delay function
			
		}

		await this.delay(1000/this.FPS);
		this.draw();

		this.sorted.push(i);
		//console.log("counter : ", this.counter);

		this.swap(i, minIndex);
	}

	await this.delay(1000/this.FPS);
	this.draw();

}

MyArray.prototype.insertionSort = async function()
{
	this.sorted = [];
	let temp;
	for(let i=0; i<this.array.length; i++)
	{
		let j = this.sorted.length;
		temp = i;

		while(j > 0 && this.array[j] < this.array[temp-1])
		{
			this.minIndex = j;
			this.swap(temp-1, j);
			j--;
			temp--;
		}

		this.sorted.push(i);

		console.log(this)

		await this.delay(1000/this.FPS);
		this.draw();
	}

	await this.delay(1000/this.FPS);
	this.draw();
}

MyArray.prototype.bubbleSort = async function()
{
	this.sorted = [];
	let temp;
	for(let i=0; i<this.array.length; i++)
	{
		for(var j=0; j<this.array.length-i; j++)
		{
			if(this.array[j] > this.array[j+1])
			{
				this.swap(j, j+1);
			}

			await this.delay(1000/this.FPS);
			this.draw();

		}
		this.sorted.push(j);
		
	}

	this.sorted.push(0);

	await this.delay(1000/this.FPS);
	this.draw();
}

MyArray.prototype.radixSort = async function()
{
	let maxNumber = this.max();

	let exp = 1;
	while(maxNumber > exp)
	{
		await this.radixHelper(exp);
		exp *= 10;
	}

	for(let i=0; i<this.array.length; i++)
	{
		this.sorted.push(i);
	}

	await this.delay(1000/this.FPS);
	this.draw();

}

MyArray.prototype.radixHelper = async function(exp)
{
	//123 => 3, 123 => 2, 123 => 1
	let sorted = [];
	let count = [];

	//count : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
	for(let i=0; i<10; i++)
	{
		count.push([]);
	}

	let result;	

	//2D ARRAY
	let n = this.array.length;
	for(let i=0; i<n; i++)
	{
		result = (Math.floor(this.array[i] / exp))%10;
		count[result].push(i);
	}

	for(let i=0; i<10; i++)
	{
		for(let j=0; j<count[i].length; j++)
		{
			sorted.push(this.array[ count[i][j] ]);
		}
	}

	//save the sorted array
	for(let i=0; i<n; i++)
	{
		this.array[i] = sorted[i];
		await this.delay(1000/this.FPS);
		this.draw();
	}



}


MyArray.prototype.max = function()
{
	let max = this.array[0];
	for(let i=0; i<this.array.length; i++)
	{
		if(this.array[i] > max)
		{
			max = this.array[i];
		}
	}

	return max;
}

MyArray.prototype.shuffle = function()
{
	//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
	for(let i=this.array.length-1; i>0; i--)
	{
		const j = Math.floor(Math.random() * (i+1));
		this.swap(i, j);
	}
}

function main()
{
	let width = 500;
	let height = 500;

	//create array
	let algorithm = new MyArray(40, width, height);

	//shuffle the cards
	algorithm.shuffle();

	//do the selection sort
	//algorithm.selectionSort();

	//do the insertion sort
	//algorithm.insertionSort();

	//do the bubble sort
	//algorithm.bubbleSort();


	/*
	MERGE SORT => TRY TO FIX IT

	let sorted = algorithm.mergeSort(algorithm.array);

	algorithm.mergeSort(algorithm.array)
	.then(sorted => console.log(sorted));
	*/

	algorithm.radixSort();

	

}

main();

