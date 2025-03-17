import React, { useEffect, useRef, useState } from 'react';
import './Quiz.css';
import Question, { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState<Question>(data[index]);
  const [islock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [isResult, setResult] = useState(false);

  useEffect(() => {
    setQuestion(data[index]);
  }, [index]);

  const option1 = useRef<HTMLLIElement | null>(null);
  const option2 = useRef<HTMLLIElement | null>(null);
  const option3 = useRef<HTMLLIElement | null>(null);
  const option4 = useRef<HTMLLIElement | null>(null);

  const options: React.RefObject<HTMLLIElement | null>[] = [
    option1,
    option2,
    option3,
    option4,
  ];

  const resetOptionsStyles = () => {
    options.forEach((option) => {
      option.current?.classList.remove('wrong');
      option.current?.classList.remove('correct');
    });
  };

  const checkAnswer = (e: React.MouseEvent, ans: number) => {
    if (islock) return;
    const target = e.target as HTMLLIElement;

    if (question.ans === ans) {
      target.classList?.add('correct');
      setScore((prev) => prev + 1);
    } else {
      target.classList.add('wrong');
      options[question.ans - 1]?.current?.classList.add('correct');
    }

    setLock(true);
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    resetOptionsStyles();
  };

  const next = () => {
    if (islock) {
      if (index === data.length - 1) {
        setResult(true);
      } else {
        setIndex((prev) => prev + 1);
        resetOptionsStyles();
      }

      setLock(false);
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {isResult ? (
        <>
          <h2>
            Your scored {score} out of {data.length}
          </h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li role="button" ref={option1} onClick={(e) => checkAnswer(e, 1)}>
              {question.option1}
            </li>
            <li role="button" ref={option2} onClick={(e) => checkAnswer(e, 2)}>
              {question.option2}
            </li>
            <li role="button" ref={option3} onClick={(e) => checkAnswer(e, 3)}>
              {question.option3}
            </li>
            <li role="button" ref={option4} onClick={(e) => checkAnswer(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">
            {index + 1} of {data.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
