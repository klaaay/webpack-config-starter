import React from "react";

const CountContext = React.createContext();

function CountProvider(props) {
	const [count, setCount] = React.useState(0);
	const value = React.useMemo(() => {
		return {
			count,
			setCount,
		};
	}, [count]);
	return <CountContext.Provider value={value} {...props} />;
}

function useCount() {
	const context = React.useContext(CountContext);
	if (!context) {
		throw new Error("useCount must be used within a CountProvider");
	}
	const { count, setCount } = context;
	const increment = React.useCallback(() => setCount(c => c + 1), [setCount]);
	return {
		count,
		increment,
	};
}

export { CountProvider, useCount };

// if you need to support React < 16.8.0

// function CountConsumer({children}) {
//   return (
//     <CountContext.Consumer>
//       {context => {
//         if (!context) {
//           throw new Error('CountConsumer must be used within a CountProvider')
//         }
//         const {count, setCount} = context
//         const increment = () => setCount(c => c + 1)
//         return children({
//           count,
//           increment,
//         })
//       }}
//     </CountContext.Consumer>
//   )
// }
