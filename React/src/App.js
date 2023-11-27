import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const questions = [
    {
      text: 'Is your body itchy?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,  paddingLeft: '60px',paddingBottom: '30px'},
    },
    {
      text: 'Are you expirencing abdomen pain?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingBottom: '30px'},
    },
    {
      text: 'Do you have a stomach burn?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingBottom: '30px' },
    },
    {
      text: 'Do you have any ulcers in your mouth?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingBottom: '30px'},
    },
    {
      text: 'Did you vomit recently?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingLeft: '20px',paddingBottom: '30px' },
    },
    {
      text: 'Are you coughning frequently?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Are your eyes sore?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingLeft: '50px',paddingBottom: '30px'},
    },
    {
      text: 'Do you feel dehydrated?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingLeft: '20px',paddingBottom: '30px'},
    },
    {
      text: 'Is your bowel movement normal?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Does your skin look yellow?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingLeft: '10px',paddingBottom: '30px' },
    },
    {
      text: 'Are you feeling nauseous?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingLeft: '10px',paddingBottom: '30px' },
    },
    {
      text: 'Are you expirencing appetite loss?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Are you expirencing abdominal pain?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Are you suffering from diereohea?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Do you have a fever?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px',paddingLeft: '40px'},
    },
    {
      text: 'Are your eyes yellow?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px',paddingLeft: '40px'},
    },
    {
      text: 'Does your abdomen look swollen?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Are you expirencing any chest pain?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Are you passing any gas?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px',paddingLeft: '20px'},
    },
    {
      text: 'Do you feel any internal itching?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingBottom: '30px' },
    },
    {
      text: 'Any distention in your abdomen?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
    {
      text: 'Do you drink?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px',paddingLeft: '90px',paddingBottom: '30px'},
    },
    {
      text: 'Did you consume a lot of fluids recently?',
      style: { color: 'white', fontWeight: 'bold', fontSize: '30px' ,paddingBottom: '30px'},
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [fadeIn, setFadeIn] = useState(false);
  const [userResponses, setUserResponses] = useState([]);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const diseaseLinks = {
    'Peptic ulcer diseae': 'https://www.mayoclinic.org/diseases-conditions/peptic-ulcer/symptoms-causes/syc-20354223#:~:text=A%20peptic%20ulcer%20is%20a,lower%20part%20of%20your%20esophagus.',
    'Chronic cholestasis': 'https://pubmed.ncbi.nlm.nih.gov/32942866/#:~:text=Cholestasis%20is%20defined%20as%20hepatocyte,common%20reasons%20of%20chronic%20cholestasis.',
    'GERD':'https://www.mayoclinic.org/diseases-conditions/gerd/symptoms-causes/syc-20361940#:~:text=Gastroesophageal%20reflux%20disease%20(GERD)%20occurs,reflux%20from%20time%20to%20time.',
    'Gastroenteritis':'https://www.betterhealth.vic.gov.au/health/conditionsandtreatments/gastroenteritis',
    'Alcoholic hepatitis': 'https://www.hopkinsmedicine.org/health/conditions-and-diseases/hepatitis/alcoholic-hepatitis#:~:text=and%20cell%20death.-,Alcoholic%20hepatitis%20is%20caused%20by%20drinking%20too%20much%20alcohol.,over%20time%20with%20continued%20drinking.'
  };
  useEffect(() => {
    if (currentQuestion >= 0) {
      setFadeIn(true);
    }
  }, [currentQuestion]);

  const beginDiagnosis = () => {
    setCurrentQuestion(0);
    setFadeIn(true);
  };

  const handleYesNo = (response) => {
    setFadeIn(false);

    setTimeout(() => {
      setUserResponses([...userResponses, response]); // Save the user's response
      setCurrentQuestion(currentQuestion + 1);
      setFadeIn(true);
    }, 500);
  };

  const sendUserResponses = async () => {
  try {
    setFadeIn(false); // Start fading out

    const requestData = { data: userResponses.join(',') };
    console.log('Data being sent:', requestData);
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: userResponses.join(',') }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Predicted Diagnosis:', data.result);
    // Handle the response from the server as needed
    setDiagnosisResult(data.result);
    setFadeIn(true); // Show the diagnosis result by fading in
  } catch (error) {
    console.error('Error:', error);
  }
};

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          {currentQuestion === -1 ? (
            <>
              <h1 className={`header-text ${fadeIn ? 'fade-out' : ''}`}>Hey Sai.</h1>
              <button onClick={beginDiagnosis}>Begin Diagnosis</button>
            </>
          ) : currentQuestion < questions.length ? (
            <div className={`question ${fadeIn ? 'active' : ''}`} key={currentQuestion}>
              <p style={questions[currentQuestion].style}>{questions[currentQuestion].text}</p>
              <div className="answer-buttons">
                <div className="button-container">
                  <button onClick={() => handleYesNo(1)}>Yes</button>
                  <button onClick={() => handleYesNo(0)}>No</button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p style={{color:'white', paddingLeft:'0px', fontSize:'30px', fontWeight: 'bold'}}>Diagnosis Completed!</p>
              <button style={{marginLeft:'0px'}} onClick={sendUserResponses}>Get Diagnosis</button>
              {diagnosisResult !== null && (
        <div>
          <button
            style={{ marginLeft: '0px', marginTop: '50px' }}
            onClick={() => {
              if (diagnosisResult in diseaseLinks) {
                window.open(diseaseLinks[diagnosisResult], '_blank');
              } else {
                console.error('No link found for this disease');
              }
            }}
          >
            Learn More
          </button>
          <p style={{ color: 'white', paddingLeft: '0px', fontSize: '30px', fontWeight: 'bold' }}>
            Diagnosis Result: {diagnosisResult}
          </p>
        </div>
      )}
            </div>
          )}
        </div>
        <div className="ripple-background">
          {/* Circles for ripple effect */}
          <div className="circle xxlarge shade1"></div>
          <div className="circle xlarge shade2"></div>
          <div className="circle large shade3"></div>
          <div className="circle medium shade4"></div>
          <div className="circle small shade5"></div>
        </div>
      </header>
    </div>
  );
}

export default App;