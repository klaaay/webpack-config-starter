import * as React from "react";
import * as ReactDOM from "react-dom";

import { CountProvider, useCount } from "./count-context";

const CountDisplay = () => {
	const { count } = useCount();
	return <div>{count}</div>;
};

const Counter = () => {
	const { increment } = useCount();
	return (
		<button
			onClick={() => {
				increment();
			}}
		>
			+
		</button>
	);
};

function App() {
	return (
		<CountProvider>
			<CountDisplay />
			<Counter />
		</CountProvider>
	);
}

ReactDOM.render(<App />, document.getElementById("root"));