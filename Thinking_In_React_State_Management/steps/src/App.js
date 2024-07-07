import { useState } from "react";

const messages = ["Learn React ⚛️", "Apply for jobs 💼", "Invest your new income 🤑"];

function App() {
  return (
    <div>
      <Steps />
      <StepMessage step={1}>
        {/* CHILDREN PROPS */}
        <p>Pass in content</p>
        <p>😇</p>
      </StepMessage>
      <StepMessage step={2}>
        {/* CHILDREN PROPS */}
        <p>Read children prop</p>
        <p>😇</p>
      </StepMessage>
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [detail, setDetail] = useState({ name: "Shubham" });
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = function () {
    if (step > 1) {
      setStep((curStep) => curStep - 1);
      setStep((curStep) => curStep - 1);
    }
    setDetail({ name: "Saurabh" });
  };

  const handleNext = function () {
    if (step < 3) setStep(step + 1);
    setDetail({ name: "Jeevan" });
  };

  return (
    <>
      <button className="close" onClick={() => setIsOpen((isOpen) => !isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>
          <StepMessage step={step}>
            {/* CHILDREN PROPS */}
            {messages[step - 1]} {detail.name}
            <div className="buttons">
              <Button bgColor="#e7e7e7" textColor="#333" onClick={() => alert(`Learn how to ${messages[step - 1]}`)}>
                Learn how
              </Button>
            </div>
          </StepMessage>
          <div className="buttons">
            {/* created reusable button */}
            <Button textColor="#fff" bgColor="#7950f2" onClick={handlePrevious}>
              {/* CHILDREN PROPS */}
              <span>👈</span> Previous
            </Button>
            <Button textColor="#fff" bgColor="#7950f2" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

//children is predefined keyword
function StepMessage({ step, children }) {
  return (
    <p className="message">
      <h3>Step {step}</h3>
      {children}
    </p>
  );
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button style={{ backgroundColor: bgColor, color: textColor }} onClick={onClick}>
      {children}
    </button>
  );
}

export default App;

//CHILDREN PROPS
//the children prop is prop that each react component automatically recieve(value between opening closing tag of component )
//allow us to pass JSX into an element (beside regular props).
//props.children is predefined keyword
