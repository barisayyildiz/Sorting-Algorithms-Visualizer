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

function radixSort(array)
{
	let maxNumber = array.max();

	let exp = 1;
	while(maxNumber > exp)
	{
		helper(array, exp);
		exp *= 10;
	}

}

function helper(array, exp)
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
	let n = array.length;
	for(let i=0; i<n; i++)
	{
		result = (Math.floor(array[i] / exp))%10;
		count[result].push(i);
	}

	for(let i=0; i<10; i++)
	{
		for(let j=0; j<count[i].length; j++)
		{
			sorted.push(array[ count[i][j] ]);
		}
	}

	//save the sorted array
	for(let i=0; i<n; i++)
	{
		array[i] = sorted[i];
	}



}

let array = [7,4,12,75,3,2];

radixSort(array);

console.log(array);