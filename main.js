function Evaluator() {

}

Evaluator.prototype.evaluate = function (expr) {
    return this.parse(expr);
};

Evaluator.prototype.isNumeric = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

Evaluator.prototype.parse = function ( expr ) {
    var self = this;

    var tokens = expr.split(' ').map(function (token) {
        return self.isNumeric(token) ? parseFloat(token) : token;
    });

    var stack = [];

    for (var i = tokens.length - 1; i >= 0; i--) {
        var token = tokens[i];
        if (this.isNumeric(token)) stack.unshift(token);
        else if (token === '+' || token === '*' || token === '/' || token === '-') {
            var next = this.eval(token, stack.shift(), stack.shift());
            stack.unshift( next );
        }
    }

    return stack.shift();
}

Evaluator.prototype.eval = function ( op, x, y ) {
    switch( op ) {
        case "+": return x + y;
        case "-": return x - y;
        case "*": return x * y;
        case "/": if (y == 0) { throw new Error('Cannot divide by zero.'); }
                  return x / y;
    }
}

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Please enter a valid space-delimited expression to evaluate: ', ( input ) => {
  
    var evaluator = new Evaluator();
    var answer = evaluator.evaluate( input );
    console.log(answer);
    rl.close();
});