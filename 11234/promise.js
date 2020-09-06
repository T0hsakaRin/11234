function doSth(num, cb) {
	return function () {
		console.log("num", num);
		num--;
		// if (--num === 0) {
		// 	cb();
		// 	return 1;
		// }
	};
}

function logSth() {
	console.log("log");
}

var fn = doSth(4, logSth);

fn();

fn();
console.log(999);
fn();

// fn();
// fn();

// fn1();

// console.log("fn", doSth(2, logSth)(), doSth(1, logSth)());
