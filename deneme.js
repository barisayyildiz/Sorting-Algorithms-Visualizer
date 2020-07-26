async function execute()
{
	this.sorted = [];
	this.activeIndex = [];


	if(this.terminate == true)
		return;

	let temp;
	for(let i=0; i<this.array.length; i++)
	{

		if(this.terminate == true)
		{
			this.clear();
			return;
		}

		let j = this.sorted.length;
		temp = i;

		this.activeIndex.push(i);

		await this.delay(1000/this.FPS);
		this.draw();

		this.activeIndex = [];

		while(j > 0 && this.array[j] < this.array[temp-1])
		{
			this.activeIndex.push(j-1);
			//this.activeIndex.push(temp);

			this.minIndex = j;
			this.swap(temp-1, j);

			await this.delay(1000/this.FPS);
			this.draw();

			this.activeIndex = [];

			j--;
			temp--;
		}


		this.sorted.push(i);

		this.activeIndex = [];
	}

	await this.delay(1000/this.FPS);
	this.draw();

}