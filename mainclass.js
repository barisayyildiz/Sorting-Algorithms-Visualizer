class MyArray
{
	constructor(n, width, height, dx)
	{
		//initilize canvas
		this.canvas = document.getElementById("myCanvas");
		this.canvas.width = width, this.canvas.height = height;
		//this.canvas.style = "border:1px solid black";
		
		//initilize context
		this.ctx = this.canvas.getContext("2d");

		//thickness
		this.dx = dx;

		//termination condition
		this.terminate = false;

		//default FPS
		this.FPS = 120;

		this.array = [];

		//holds the indexes of sorted elements
		this.sorted = [];

		//holds the indexes of active elements
		this.activeIndex = [];

		//generate array
		this.generate(n);

		//Faster button
		this.fastButton = document.getElementById("faster");
		this.fastButton.addEventListener("click", () => {
			this.FPS *= 1.5;
		});

		//Slower button
		this.slowButton = document.getElementById("slower");
		this.slowButton.addEventListener("click", () => {
			this.FPS /= 1.5;
		})

	}

	generate(n)
	{
		for(let i=0; i<n; i++)
		{
			this.array.push(parseFloat((Math.random() * (height*0.9 - height*0.1 + 1) + height*0.1).toFixed(2)));
			this.shuffle();
		}

	}

	shuffle()
	{
		//https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
		for(let i=this.array.length-1; i>0; i--)
		{
			const j = Math.floor(Math.random() * (i+1));
			this.swap(i, j);
		}
	}

	swap(index1, index2)
	{
		//swaps elements at indexes at index1 and index2
		let temp = this.array[index1];
		this.array[index1] = this.array[index2];
		this.array[index2] = temp;
	}

	clear()
	{
		//clears canvas
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	draw()
	{
		//first clears canvas
		this.clear();


		//then draws this.array
		var xPos = 0;

		//if the element at index i sorted -> paints black
		//													active -> paints green
		//													else   -> paints blue

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

			this.ctx.fillRect(xPos, this.canvas.height, this.dx, - this.array[i]);

			//increase xPos by thickness value
			xPos += this.dx;
		}
	}

	delay(time)
	{
		return new Promise((resolve, reject) => {
			setTimeout(resolve, time);
		})
	}

	max()
	{
		//returns the max number in this.array
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

	min()
	{
		//returns the min number in this.array
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

}