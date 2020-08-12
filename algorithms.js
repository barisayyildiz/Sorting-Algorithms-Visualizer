class SelectionSort extends MyArray
{
	constructor(n, width, height, dx)
	{
		super(n, width, height, dx);

		this.execute();
		this.FPS = 120;

	}

	async execute()
	{
		

		console.log("&&&", this.terminate);

		let minIndex;
		//this.counter = 0;
		this.sorted = [];
		this.activeIndex = [];

		//console.log("counter : ", this.counter);

		for(let i=0; i<this.array.length; i++)
		{
			if(this.terminate == true)
			{
				this.clear();
				return;
			}

			minIndex = i;

			for(let j=i; j<this.array.length; j++)
			{
				this.activeIndex.push(j);
				//this.activeIndex = j;
				if(this.array[minIndex] > this.array[j])
				{
					minIndex = j;
				}

				//wait for delay function
				await this.delay(1000/this.FPS);
				this.draw();

				this.activeIndex.pop(j);
				
			}

			this.sorted.push(i);

			this.swap(i, minIndex);
		}

		await this.delay(1000/this.FPS);
		this.draw();

	}
}

class InsertionSort extends MyArray
{
	constructor(n, width, height)
	{
		super(n, width, height, dx);
		this.FPS = 120;
		this.execute();

	}

	async execute()
	{
		this.sorted = [];
		this.activeIndex = [];


		var i=1;
		for(; i<this.array.length; i++)
		{
			if(this.terminate == true)
			{
				this.clear();
				return;
			}


			let j=i-1;
			let temp = i;
			let flag = 1;

			for(let x=0; x<=i; x++)
					this.sorted.push(x);


			while(j >= 0 && this.array[i] < this.array[j])
			{
				this.swap(i,j);
				this.activeIndex.push(j);

				await this.delay(1000/this.FPS);
				this.draw();

				this.activeIndex = [];

				i--;
				j--;

				flag = 0;
			}

			i = temp;

			await this.delay(1000/this.FPS);
			this.draw();

		}


	}

	draw()
	{
		this.clear();

		var xPos = 0;

		for(let i = 0; i<this.array.length; i++)
		{
			if(this.activeIndex.includes(i))
			{
				this.ctx.fillStyle = "green";
			}else if(this.sorted.includes(i))
			{
				this.ctx.fillStyle = "black";
			}else
			{
				this.ctx.fillStyle = "blue";
			}

			this.ctx.fillRect(xPos, this.canvas.height, this.dx, - this.array[i]);
			xPos += this.dx;
		}
	}

}


class BubbleSort extends MyArray
{
	constructor(n, width, height)
	{
		super(n, width, height, dx);
		this.execute();

		this.FPS = 100;

	}

	async execute()
	{
		this.sorted = [];
		let temp;
		for(let i=0; i<this.array.length; i++)
		{
			if(this.terminate == true)
			{
				this.clear();
				return;
			}

			for(var j=0; j<this.array.length-i; j++)
			{
				this.activeIndex.push(j);

				if(this.array[j] > this.array[j+1])
				{
					this.activeIndex.pop(j);
					this.swap(j, j+1);
					this.activeIndex.push(j+1);
				}

				await this.delay(1000/this.FPS);
				this.draw();

				this.activeIndex = [];

			}
			this.sorted.push(j);

			await this.delay(1000/this.FPS);
			this.draw();
			
		}

		this.sorted.push(0);

		await this.delay(1000/this.FPS);
		this.draw();

	}

}

class RadixSort extends MyArray
{
	constructor(n, width, height)
	{
		super(n, width, height, dx);
		this.execute();

		this.FPS = 60;
	}

	fillSorted()
	{
		for(let i=0; i<this.array.length; i++)
		{
			this.sorted.push(i);
		}
	}

	async execute()
	{
		this.sorted = [];
		let maxNumber = this.max();

		let exp = 1;
		while(maxNumber > exp)
		{
			if(this.terminate == true)
			{
				this.clear();
				return;
			}

			await this.execute_helper(maxNumber, exp);
			exp *= 10;
		}

		//fill sorted array
		this.fillSorted();

		await this.delay(1000/this.FPS);
		this.draw();
	}

	async execute_helper(maxNumber, exp)
	{
		let sorted = [];
		let count = [];

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
			this.activeIndex = [];
			this.activeIndex.push(i);

			if(this.terminate == true)
			{
				this.clear();
				return;
			}

			//last run
			if(!(maxNumber > exp*10))
				this.sorted.push(i);

			this.array[i] = sorted[i];
			await this.delay(1000/this.FPS);
			this.draw();
		}
	}
}

class CockTailSort extends MyArray
{
	constructor(n, width, height, dx)
	{
		super(n, width, height, dx);

		this.FPS = 120;
		this.execute();
	}

	async execute()
	{
		this.sorted = [];
		this.activeIndex = [];

		let swapped = true;
		let start = 0;
		let end = this.array.length - 1;

		while(swapped)
		{
			swapped = false;

			if(this.terminate == true)
			{
				this.clear();
				return;
			}

			for(let i=start; i<= end; i++)
			{

				this.activeIndex.push(i);

				if(this.array[i] > this.array[i+1])
				{
					this.activeIndex.pop(i);
					this.swap(i, i+1);
					swapped = true;
					this.activeIndex.push(i+1);
				}

				console.log(this.FPS);

				await this.delay(1000/this.FPS);
				this.draw();

				this.activeIndex = [];
			}

			this.sorted.push(end);

			end--;

			if(!swapped)
				break;

			swapped = false;

			for(let i=end ; i >= start; i--)
			{
				this.activeIndex.push(i);
				if(this.array[i-1] > this.array[i])
				{
					this.activeIndex.pop(i);
					this.swap(i-1, i);
					swapped = true;

					this.activeIndex.push(i-1);
				}
				await this.delay(1000/this.FPS);
				this.draw();

				this.activeIndex = [];
			}

			this.sorted.push(start);
			start++;

			this.activeIndex = [];


		}

		//fill this.sorted
		for(let i=start; i<=end; i++)
		{
			this.sorted.push(i);

			await this.delay(1000/this.FPS);
			this.draw();
		}

	}
}


class BogoSort extends MyArray
{
	constructor(n, width, height, dx)
	{
		super(n, width, height, dx);
		this.execute();
	}

	async execute()
	{
		let sorted = false;

		while(!sorted)
		{
			sorted = true;

			if(this.terminate == true)
			{
				this.clear();
				return;
			}

			await this.delay(1000/this.FPS);
			this.draw();

			console.log(this.FPS);

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
}

class GravitySort extends MyArray
{
	constructor(n, width, height, dx)
	{
		super(n, width, height, dx);
		this.execute();
	}

	async execute()
	{
		let table = [];

		let max = this.max();

		this.toIntArray();

		console.log(this.array);

		this.draw();

		//create 2d array
		for(let i=0; i<this.array.length; i++)
		{
			table.push([]);
		}


		//fill 2d table
		var col = 0;
		for(let row = 0; row < this.array.length; row++)
		{
			let col;
			for(col = 0; col < this.array[row]; col++)
			{
				table[row].push(1);
			}

			for(;col < max; col++)
			{
				table[row].push(0);
			}

		}

		//this is going the be the array we will draw
		let temp = [];

		temp = this.readTable(table, max);

		//adjust 2d table
		for(let col=0; col<max; col++)
		{
			for(let i=0; i<this.array.length; i++)
			{
				this.array[i] = temp[i];
			}

			await this.delay(1000/this.FPS);
			this.draw();

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
				table[i][col] = 0;
			}

			temp = this.readTable(table, max);

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

		console.log(this.array);

		await this.delay(2000);
		await this.draw();


	}

	readTable(table, max)
	{
		let array = [];

		for(let row = 0; row < table.length; row++)
		{
			let counter = 0;
			for(let col = 0; col < max; col++)
			{
				if(table[row][col] == 1)
				{
					counter++;
				}
			}

			array.push(counter);
		}


		return array;
	}

	toIntArray()
	{
		for(let i=0; i<this.array.length; i++)
		{
			this.array[i] = Math.floor(this.array[i]);
		}
	}

}
