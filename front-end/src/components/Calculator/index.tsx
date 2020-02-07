import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
// import PointTarget from 'react-point';


const style = require('./index.scss');
const cx = classNames.bind(style);

const CalculatorOperations: any = {
  '/': (prevValue: any, nextValue: any) => prevValue / nextValue,
  '*': (prevValue: any, nextValue: any) => prevValue * nextValue,
  '+': (prevValue: any, nextValue: any) => prevValue + nextValue,
  '-': (prevValue: any, nextValue: any) => prevValue - nextValue,
  '=': (nextValue: any) => nextValue
};

interface ICalculatorKeyProps {
  handleClick: (event: any) => void;
  className?: string;
  props?: any
}

const CalculatorKey: React.FC<ICalculatorKeyProps> = ({ handleClick, className, ...props }) => (
  // <PointTarget onPoint={handleClick}>
  //   <button className={cx(className)} {...props} />
  // </PointTarget>
  <button className={cx(className)} {...props} onClick={handleClick} />

);

interface ICacluatorProps {
  onSetDisplayValue: (displayValue: string) => void;
}

const Calculator: React.FC<ICacluatorProps> = ({ onSetDisplayValue }) => {
  const [value, setValue] = useState(null);
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState<any>('');
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setValue(null);
    setDisplayValue('0');
    setOperator('');
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplayValue('0');
  };

  const clearLastChar = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || '0');
  };

  const toggleSign = () => {
    const newValue = parseFloat(displayValue) * -1;

    setDisplayValue(String(newValue));
  };

  const inputPercent = () => {
    const currentValue = parseFloat(displayValue);

    if (currentValue === 0) { return; }

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '');
    const newValue = parseFloat(displayValue) / 100;

    setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)));
  };

  const inputDot = () => {
    if (!(/\./).test(displayValue)) {
      setDisplayValue(`${displayValue}.`);
      setWaitingForOperand(false);
    }
  };

  const inputDigit = (digit: any) => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const performOperation = (nextOperator: any) => {
    const inputValue: any = parseFloat(displayValue);

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || 0;
      const newValue = CalculatorOperations[operator](currentValue, inputValue);

      setValue(newValue);
      setDisplayValue(String(newValue));
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  useEffect(() => {
    onSetDisplayValue(displayValue);
  }, [displayValue]);

  const isClearDisplay = displayValue !== '0';
  const clearText = isClearDisplay ? 'C' : 'AC';

  return (
    <div className={cx('calculator')}>
      <table>
        <tbody>
          <tr>
            <td><CalculatorKey handleClick={() => inputDigit(1)}>1</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputDigit(2)}>2</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputDigit(3)}>3</CalculatorKey></td>
            <td><CalculatorKey className="operator" handleClick={() => performOperation('/')}>÷</CalculatorKey></td>
          </tr>
          <tr>
            <td><CalculatorKey handleClick={() => inputDigit(4)}>4</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputDigit(5)}>5</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputDigit(6)}>6</CalculatorKey></td>
            <td><CalculatorKey className="operator" handleClick={() => performOperation('*')}>×</CalculatorKey></td>
          </tr>
          <tr>
            <td><CalculatorKey handleClick={() => inputDigit(7)}>7</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputDigit(8)}>8</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputDigit(9)}>9</CalculatorKey></td>
            <td><CalculatorKey className="operator" handleClick={() => performOperation('+')}>+</CalculatorKey></td>
          </tr>
          <tr>
            <td><CalculatorKey handleClick={() => inputDot()}>.</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputDigit(0)}>0</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => (isClearDisplay ? clearDisplay() : clearAll())}>{clearText}</CalculatorKey></td>
            <td><CalculatorKey className="operator" handleClick={() => performOperation('-')}>−</CalculatorKey></td>
          </tr>
          <tr>
            <td></td>
            <td><CalculatorKey handleClick={() => toggleSign()}>±</CalculatorKey></td>
            <td><CalculatorKey handleClick={() => inputPercent()}>%</CalculatorKey></td>
            <td><CalculatorKey className="operator" handleClick={() => performOperation('=')}>=</CalculatorKey></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default hot(Calculator);
