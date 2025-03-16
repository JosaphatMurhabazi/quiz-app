import React, { useRef, useState } from 'react';
import './Quiz.css';
import { data, Question } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(1);
  const [question, setQuestion] = useState<Question>(data[index]);
  const [islock, setLock] = useState(false);

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

  const checkAnswer = (e: React.MouseEvent, ans: number) => {
    if (!islock) {
      const target = e.target as HTMLLIElement;

      if (question.ans === ans) {
        if (target.classList) target.classList.add('correct');

        setLock(true);
      } else {
        if (target.classList) target.classList.add('wrong');

        setLock(true);

        const optionSelected = options[question.ans - 1];
        if (optionSelected?.current)
          optionSelected.current?.classList.add('correct');
      }
    }
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      <h2>
        {index + 1}. {question.question}
      </h2>
      <ul>
        <li ref={option1} onClick={(e) => checkAnswer(e, 2)}>
          {question.option2}
        </li>
        <li ref={option2} onClick={(e) => checkAnswer(e, 1)}>
          {question.option1}
        </li>
        <li ref={option3} onClick={(e) => checkAnswer(e, 3)}>
          {question.option3}
        </li>
        <li ref={option4} onClick={(e) => checkAnswer(e, 4)}>
          {question.option4}
        </li>
      </ul>
      <button>Next</button>
      <div className="index">1 of 5 questions</div>
    </div>
  );
};

export default Quiz;
