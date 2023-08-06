import { useReducer } from 'react';

type StateType = { count: number }
//  根据传入的 action 返回新的 state（不可变数据）
function reducer(state: StateType, action: { type: string }) {
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 }
        case 'decrement':
            return { count: state.count - 1 }
        default:
            throw new Error()
    }
}
const initialState: StateType = { count: 100 }
const CountReducer:React.FC = ()=>{
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <div>
            Count: {state.count}
            <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
            <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        </div>
    );
}

export default CountReducer;
