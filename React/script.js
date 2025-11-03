const rootElement = document.getElementById('root');

// Global state storage
let componentState = {
    hooks: [],
    currentHookIndex: 0
};

// ============================================
// STEP 1: createElement - Creates Virtual DOM structure
// ============================================
function createElement(type, props, ...children) {
    return {
        type,           // 'div', 'button', etc.
        props: props || {},  // { onClick: fn, style: {...} }
        children: children.flat()  // Nested children
    };
}

// ============================================
// STEP 2: render - Converts Virtual DOM to Real DOM
// ============================================
function render(vdom) {
    // Handle text nodes
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom);
    }
    
    // Create the actual DOM element
    const element = document.createElement(vdom.type);
    
    // Apply all props (attributes and event listeners)
    if (vdom.props) {
        Object.keys(vdom.props).forEach(key => {
            if (key.startsWith('on')) {
                // Handle events: onClick, onChange, etc.
                const eventName = key.substring(2).toLowerCase(); // onClick -> click
                element.addEventListener(eventName, vdom.props[key]);
            } else if (key === 'style' && typeof vdom.props[key] === 'object') {
                // Handle inline styles
                Object.assign(element.style, vdom.props[key]);
            } else if (key === 'className') {
                // Handle className
                element.className = vdom.props[key];
            } else {
                // Handle regular attributes
                element.setAttribute(key, vdom.props[key]);
            }
        });
    }
    
    // Recursively render children
    vdom.children.forEach(child => {
        if (child != null && child !== false) {
            element.appendChild(render(child));
        }
    });
    
    return element;
}

// ============================================
// STEP 3: useState Hook
// ============================================
function useState(initialValue){
    const hookIndex = componentState.currentHookIndex;
    
    if (componentState.hooks[hookIndex] === undefined) {
        componentState.hooks[hookIndex] = initialValue;
    }
    
    const currentState = componentState.hooks[hookIndex];
    
    const setState = (newValue) => {
        console.log(`State change: ${componentState.hooks[hookIndex]} → ${newValue}`);
        componentState.hooks[hookIndex] = newValue;
        renderComponent(); // Trigger re-render
    };
    
    componentState.currentHookIndex++;
    return [currentState, setState];
}

// ============================================
// STEP 4: Your Component (returns Virtual DOM)
// ============================================
function App() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('React');
    
    // Return Virtual DOM structure using createElement
    return createElement('div', 
        { 
            style: { 
                padding: '20px', 
                fontFamily: 'Arial',
                maxWidth: '600px',
                margin: '0 auto'
            } 
        },
        createElement('h1', { style: { color: '#4a5568' } }, `Count: ${count}`),
        createElement('h2', { style: { color: '#718096' } }, `Name: ${name}`),
        
        // Buttons with onClick handlers (real functions, not strings!)
        createElement('button', 
            { 
                onClick: () => setCount(count + 1),
                style: {
                    padding: '10px 20px',
                    margin: '5px',
                    backgroundColor: '#4299e1',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }
            }, 
            'Increment'
        ),
        
        createElement('button', 
            { 
                onClick: () => setCount(count - 1),
                style: {
                    padding: '10px 20px',
                    margin: '5px',
                    backgroundColor: '#ed8936',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }
            }, 
            'Decrement'
        ),
        
        createElement('button', 
            { 
                onClick: () => setCount(0),
                style: {
                    padding: '10px 20px',
                    margin: '5px',
                    backgroundColor: '#e53e3e',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }
            }, 
            'Reset'
        ),
        
        createElement('button', 
            { 
                onClick: () => setName(name === 'React' ? 'Vue' : 'React'),
                style: {
                    padding: '10px 20px',
                    margin: '5px',
                    backgroundColor: '#48bb78',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }
            }, 
            'Toggle Name'
        ),
        
        createElement('p', 
            { style: { marginTop: '20px', color: '#2d3748' } }, 
            `This mimics React's createElement! Variables like ${count} are in closures.`
        ),
        
        createElement('p', 
            { style: { color: '#718096', fontSize: '14px' } }, 
            'Event handlers are real functions, not strings!'
        )
    );
}

// ============================================
// STEP 5: Render Component to DOM
// ============================================
function renderComponent() {
    componentState.currentHookIndex = 0;
    
    // Get Virtual DOM from component
    const vdom = App();
    
    // Convert Virtual DOM to Real DOM
    const realDOM = render(vdom);
    
    // Clear and mount to root
    rootElement.innerHTML = '';
    rootElement.appendChild(realDOM);
}

// Initial render
console.log('🚀 Rendering app...');
renderComponent();

// ============================================
// EXAMPLE: What the Virtual DOM looks like
// ============================================
console.log('📦 Virtual DOM structure:', App());
