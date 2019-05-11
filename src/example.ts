import * as _ from "lodash";

class Greeter {
	greeting: string;
	constructor(message: string) {
		this.greeting = message;
	}
	greet() {
		return _.join(["haha", "xixi"], "-");
	}
}

let greeter = new Greeter("world");

export default greeter;