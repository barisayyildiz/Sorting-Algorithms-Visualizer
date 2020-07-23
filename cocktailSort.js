function cokctailSort(array)
{
	let swapped = true;

	while(swapped)
	{
		swapped = false;

		for(let i=0; i<array.length; i++)
		{
			if(array[i] > array[i+1])
			{
				let temp = array[i];
				array[i] = array[i+1];
				array[i+1] = temp;

				swapped = true;
			}
		}


		if(!swapped)
			break;

		swapped = false;

		for(let i=array.length - 1; i > 0; i--)
		{
			if(array[i-1] > array[i])
			{
				let temp = array[i-1];
				array[i-1] = array[i];
				array[i] = temp;
				swapped = true;
			}
		}
	}
}

let array = [5,7,4,2,12,-1];

for(let i=0; i<array.length; i++)
{
	console.log(array[i]);
}