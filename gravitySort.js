Array.prototype.max = function()
{
	let max = this[0];
	for(let i=0; i<this.length; i++)
	{
		if(this[i] > max)
			max = this[i];
	}

	return max;
}

function gravitySort(array)
{
	let table = [];

	let max = array.max();

	//create 2d array
	for(let i=0; i<array.length; i++)
	{
		table.push([]);
	}


	//fill 2d table
	var row = 0;
	var col = 0;
	for(row = 0; row < array.length; row++)
	{

		for(col = 0; col < array[row]; col++)
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
		for(let row=0; row<array.length; row++)
		{
			//console.log(col, row);
			if(table[row][col] == 1)
				total++;

		}

		let bottom = array.length - 1;

		//yerçekimi... 1 leri indir
		for(let i=0; i<total; i++)
		{
			table[bottom--][col] = 1;
		}

		for(let i=0; i<=bottom; i++)
		{
			table[i][col] = 0;
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

	console.log(sortedArray);


}


let array = [3,7,4,1,2,6,2,6];
gravitySort(array);

/*

START
1110000
1111111
1111000
1000000
1100000
1111110
1100000
1111110


END
1000000
1100000
1100000
1110000
1111000
1111110
1111110
1111111

1,2,2,3,4,6,6,7


*/
