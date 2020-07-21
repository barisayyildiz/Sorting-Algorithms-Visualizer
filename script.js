//function constructor
function MyArray(n, min, max)
{
	//canvas
	this.canvas = document.getElementById("myCanvas");

	this.canvas = document.getElementById("myCanvas");

	this.canvas.width = 500, this.canvas.height = 500;
	this.canvas.style = "border:1px solid black";

	this.ctx = this.canvas.getContext("2d");

	this.array = [];
	let current = min;

	//this.activeIndex;

	//counter değişkeni yerine bir array kullanmak daha mantıklı olabilir
	//çünkü sıralama sağdan veya soldan olabilir
	//this.sorted = [] ... şeklinde !!!
	this.counter = 0;
	this.minIndex;

	this.FPS = 10;

	for(let i=0; i<n; i++)
	{
		//1st method
		this.array.push(parseFloat((Math.random() * (max - min + 1) + min).toFixed(2)));

		//2nd method
		//this.array.push(parseFloat(current.toFixed(2)));
		//current += (max-min) / (n-1);
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
	console.log(this.array, this.minIndex);
	//drawing function

	//clear canvas
	this.clear();

	var xPos = 0;
	this.ctx.fillStyle = "black";
	for(var i=0; i<this.counter; i++)
	{
		this.ctx.fillRect(xPos, this.canvas.height, 10, - this.array[i]);
		xPos += 10;
	}


	for(i; i<this.array.length; i++)
	{
		if(i == this.minIndex)
			this.ctx.fillStyle = "green";
		else
			this.ctx.fillStyle = "blue";
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
	this.counter = 0;

	console.log("counter : ", this.counter);

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

		this.counter++;
		console.log("counter : ", this.counter);

		this.swap(i, minIndex);
	}

	await this.delay(1000/this.FPS);
	this.draw();

}

MyArray.prototype.insertionSort = async function()
{
	this.counter = 0;
	let temp;
	for(let i=0; i<this.array.length; i++)
	{
		let j = this.counter;
		temp = i;

		while(j > 0 && this.array[j] < this.array[temp-1])
		{
			this.minIndex = j;
			this.swap(temp-1, j);
			j--;
			temp--;
		}

		this.counter++;

		await this.delay(1000/this.FPS);
		this.draw();
	}	
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
	let algorithm = new MyArray(40, height/10, height/2);

	//shuffle the cards
	algorithm.shuffle();

	//do the selection sort
	//algorithm.selectionSort();

	//do the insertion sort
	algorithm.insertionSort();

}

main();

