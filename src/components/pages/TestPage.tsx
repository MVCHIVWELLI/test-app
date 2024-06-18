import React, { useState, useEffect } from 'react';
import { Card, Radio, Checkbox, Input, Button, Space, Typography, Pagination, Progress } from 'antd';
import moment from 'moment';

const { TextArea } = Input;
const { Title } = Typography;

interface Question {
  id: number;
  type: 'single' | 'multiple' | 'short' | 'long';
  question: string;
  options?: string[];
}

const questions: Question[] = [
  {
    id: 1,
    type: 'single',
    question: 'Столица Франции?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
  },
  {
    id: 2,
    type: 'multiple',
    question: 'Что из этого фрукт?',
    options: ['Apple', 'Carrot', 'Banana', 'Potato'],
  },
  {
    id: 3,
    type: 'short',
    question: 'Какой твой любимый цвет?',
  },
  {
    id: 4,
    type: 'long',
    question: 'Расскажи о своем хобби.',
  },
];

const TestPage: React.FC = () => {
    const [answers, setAnswers] = useState<{ [key: number]: any }>(() => {
        const savedAnswers = localStorage.getItem('testAnswers');
        return savedAnswers ? JSON.parse(savedAnswers) : {};
      });
      const [currentQuestion, setCurrentQuestion] = useState(() => {
        const savedQuestion = localStorage.getItem('currentQuestion');
        return savedQuestion ? JSON.parse(savedQuestion) : 1;
      });
      const [timeLeft, setTimeLeft] = useState(() => {
        const savedTimeLeft = localStorage.getItem('timeLeft');
        return savedTimeLeft ? JSON.parse(savedTimeLeft) : moment.duration(10, 'minutes').asSeconds();
      });
    
    

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime: number) => {   
        if (prevTime <= 0) {
          clearInterval(interval);
          alert('Время вышло, тест завершен! Добро пожаловать во взрослую жизнь, товарищ!');
          return 0;
        }
        const newTime = prevTime - 1;
        localStorage.setItem('timeLeft', JSON.stringify(newTime));
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    localStorage.setItem('testAnswers', JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem('currentQuestion', JSON.stringify(currentQuestion));
  }, [currentQuestion]);


  const handleSingleChange = (id: number, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleMultipleChange = (id: number, value: string[]) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleShortChange = (id: number, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleLongChange = (id: number, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'single':
        return (
          <Radio.Group
            onChange={(e) => handleSingleChange(question.id, e.target.value)}
            value={answers[question.id]}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            {question.options?.map((option, index) => (
              <Radio key={index} value={option}>
                {option}
              </Radio>
            ))}
          </Radio.Group>
        );
      case 'multiple':
        return (
          <Checkbox.Group
            options={question.options}
            onChange={(checkedValues) =>
              handleMultipleChange(question.id, checkedValues as string[])
            }
            value={answers[question.id]}
            style={{ display: 'flex', flexDirection: 'column' }}
          />
        );
      case 'short':
        return (
          <Input
            onChange={(e) => handleShortChange(question.id, e.target.value)}
            value={answers[question.id]}
          />
        );
      case 'long':
        return (
          <TextArea
            rows={4}
            onChange={(e) => handleLongChange(question.id, e.target.value)}
            value={answers[question.id]}
          />
        );
      default:
        return null;
    }
  };

  const handleSubmit = () => {
    console.log('Submitted answers:', answers);
    if(currentQuestion !=4){
      handlePageChange(currentQuestion + 1); 
    }
   
  };
  const handlePageChange = (page: number) => {
    setCurrentQuestion(page);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>ЕГЭ 2050</Title>
      <Progress percent={(timeLeft / (10 * 60)) * 100} status="active" showInfo={false} />
      <Card title={questions[currentQuestion - 1].question}>
        {renderQuestion(questions[currentQuestion - 1])}
      </Card>
      <Pagination
        current={currentQuestion}
        total={questions.length}
        pageSize={1}
        onChange={handlePageChange}
        style={{ marginTop: '20px' }}
      />
      <Button type="primary" onClick={handleSubmit} style={{ marginTop: '20px' }}>
        Ответить
      </Button>
     
    </div>
  );
};

export default TestPage;
