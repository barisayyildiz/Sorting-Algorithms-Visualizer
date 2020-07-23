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

	this.FPS = 240;

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
	this.sorted = [];
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

MyArray.prototype.cocktailSort = async function()
{
	this.sorted = [];

	let swapped = true;
	let start = 0;
	let end = this.array.length - 1;

	while(swapped)
	{
		swapped = false;

		for(let i=start; i<= end; i++)
		{
			if(this.array[i] > this.array[i+1])
			{
				this.swap(i, i+1);
				swapped = true;
			}

			await this.delay(1000/this.FPS);
			this.draw();
		}

		this.sorted.push(end);

		end--;

		if(!swapped)
			break;

		swapped = false;

		for(let i=end ; i >= start; i--)
		{
			if(this.array[i-1] > this.array[i])
			{
				this.swap(i-1, i);
				swapped = true;
			}

			this.draw();
		}

		this.sorted.push(start);
		start++;


	}

	//fill this.sorted
	for(let i=start; i<=end; i++)
	{
		this.sorted.push(i);
	}

	await this.delay(1000/this.FPS);
	this.draw();

}

MyArray.prototype.bogoSort = async function()
{
	let sorted = false;

	while(!sorted)
	{
		sorted = true;

		await this.delay(1000/this.FPS);
		this.draw();

		for(let i=0; i<this.array.length; i++)
		{
			if(this.array[i] > this.array[i+1])
			{
				sorted = false;
				this.shuffle();
				break;
			}
		}
	}
}

MyArray.prototype.gravitySort = async function()
{
	let table = [];

	let max = this.max();

	await this.delay(1000);
	this.draw();

	//create 2d array
	for(let i=0; i<this.array.length; i++)
	{
		table.push([]);
	}


	//fill 2d table
	var row = 0;
	var col = 0;
	for(row = 0; row < this.array.length; row++)
	{

		for(col = 0; col < this.array[row]; col++)
		{
			table[row].push(1);
		}

		for(;col < max; col++)
		{
			table[row].push(0);
		}

	}


	//adjust 2d table
	for(let col=0; col<max; col++)
	{
		//toplam 1 leri hesapla
		let total = 0;
		for(let row=0; row<this.array.length; row++)
		{
			//console.log(col, row);
			if(table[row][col] == 1)
				total++;

		}

		let bottom = this.array.length - 1;

		//yerçekimi... 1 leri indir
		for(let i=0; i<total; i++)
		{
			table[bottom--][col] = 1;
		}

		for(let i=0; i<=bottom; i++)
		{
			table[bottom][col] = 0;
		}
	}

	let sortedArray = [];

	for(let i=0; i<table.length; i++)
	{
		let counter = 0;
		for(let j=0; j<max; j++)
		{
			if(table[i][j] == 1)
				counter++;
			else
				break;
		}

		sortedArray.push(counter);
	}

	for(let i=0; i<this.array.length; i++)
	{
		this.array[i] = sortedArray[i];
	}

	await this.delay(2000);
	await this.draw();

	console.log(sortedArray);

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

MyArray.prototype.min = function()
{
	let min = this.array[0];
	for(let i=0; i<this.array.length; i++)
	{
		if(this.array[i] < min)
		{
			min = this.array[i];
		}
	}

	return min;
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