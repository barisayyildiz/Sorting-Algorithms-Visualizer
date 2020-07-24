function delay(time)
{
	return new Promise((resolve, reject) => {

		setTimeout(resolve, time);

	});
}

async function main()
{
	console.log("welcome to the main function")
	await delay(2000);
	console.log("waited for 2 seconds");


	return new Promise((resolve, reject) => {
		resolve(5);
	})
}


let x;
main()
.then(e => e*20)
.then(e => console.log(e));
