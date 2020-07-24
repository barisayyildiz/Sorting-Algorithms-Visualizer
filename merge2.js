function mergeSort(array)
{
	if(array.length > 1)
	{
		let midPoint = Math.floor(array.length / 2);
		let leftArr = array.slice(0, midPoint);
		let rightArr = array.slice(midPoint);

		mergeSort(leftArr);
		mergeSort(rightArr);

		let counter = 0;

		while(leftArr.length && rightArr.length)
		{
			if(leftArr[0] < rightArr[0])
			{
				array[counter++] = leftArr[0];
				leftArr = leftArr.slice(1);
			}else
			{
				array[counter++] = rightArr[0];
				rightArr = rightArr.slice(1);
			}
		}

		while(leftArr.length)
		{
			array[counter++] = leftArr[0];
			leftArr = leftArr.slice(1);
		}

		while(rightArr.length)
		{
			array[counter++] = rightArr[0];
			rightArr = rightArr.slice(1);
		}
	}
}

let array = [9,4,2,46,3];

mergeSort(array);

console.log(array);