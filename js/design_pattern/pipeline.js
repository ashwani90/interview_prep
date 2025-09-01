const pipe = (...fns) => input => fns.reduce((acc, fn) => fn(acc), input);

const double = x => x * 2;
const square = x => x * x;

const transform = pipe(double, square);
console.log(transform(3)); // 36