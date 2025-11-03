const rootElement = document.getElementById('root');

function render(component){
    rootElement!.innerHTML = component();
}

function useState(initialValue){
    let value = initialValue;
    function setValue(newValue){
        value = newValue;
    }
    return [value, setValue];
}

function useEffect(callback,dependencies){
    
}

//create reconsilation logic to recall the function component and update the state
function component(){
    
    const [count, setCount] = useState(0);

    useEffect(() => {
        
    }, [count]);

    return `
        <div>
            <h1>Count: ${count}</h1>
            <button>Increment</button>
            <p>This is a simple HTML render demo</p>
        </div>
    `;
}

render(component);