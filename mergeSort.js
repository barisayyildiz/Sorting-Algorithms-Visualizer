function mergeSort(array)
{
	//console.log(array.length);
	if(array.length < 2)
	{
		return array;
	}else
	{
		let midPoint = parseInt(array.length / 2);
		console.log(midPoint);

		let leftArr = array.slice(0,midPoint);
		let rightArr = array.slice(midPoint);

		console.log(leftArr, rightArr);

		return merge(mergeSort(leftArr), mergeSort(rightArr));
	}
}

function merge(leftArr, rightArr)
{
	let sortedArray = [];

	while(leftArr.length && rightArr.length)
	{
		//console.log(leftArr[0]);
		//leftArr = leftArr.slice(1);
		console.log(leftArr[0], rightArr[0])
		if(leftArr[0] <= rightArr[0])
		{
			sortedArray.push(leftArr[0]);
			leftArr = leftArr.slice(1);
		}else if(rightArr[0] < leftArr[0])
		{
			sortedArray.push(rightArr[0]);
			rightArr = rightArr.slice(1);
		}
	}

	while(leftArr.length)
	{
		sortedArray.push(leftArr[0]);
		leftArr = leftArr.slice(1);
	}

	while(rightArr.length)
	{
		sortedArray.push(rightArr[0]);
		rightArr = rightArr.slice(1);
	}

	return sortedArray;

}


let array = [6,4,2,5,12,21,1];
let sorted = mergeSort(array);


console.log("sorted : ", sorted);
