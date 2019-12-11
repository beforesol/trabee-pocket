import React, { useState, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import PointTarget from 'react-point';


const style = require('./calculator.scss');
const cx = classNames.bind(style);

const CalculatorOperations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue
};

const CalculatorKey = ({ onPress, className, ...props }) => (
  <PointTarget onPoint={onPress}>
    <button className={cx(className)} {...props} />
  </PointTarget>
);

CalculatorKey.propTypes = {
  onPress: PropTypes.func,
  className: PropTypes.string
};

const Calculator = ({ onSetDisplayValue }) => {
  const [value, setValue] = useState(null);
  const [displayValue, setDisplayValue] = useState('0');
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const clearAll = () => {
    setValue(null);
    setDisplayValue('0');
    setOperator(null);
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

  const inputDigit = digit => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit);
    }
  };

  const performOperation = nextOperator => {
    const inputValue = parseFloat(displayValue);

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

  const handleKeyDown = event => {
    let { key } = event;

    if (key === 'Enter') { key = '='; }

    if ((/\d/).test(key)) {
      event.preventDefault();
      inputDigit(parseInt(key, 10));
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === '.') {
      event.preventDefault();
      inputDot();
    } else if (key === '%') {
      event.preventDefault();
      inputPercent();
    } else if (key === 'Backspace') {
      event.preventDefault();
      clearLastChar();
    } else if (key === 'Clear') {
      event.preventDefault();

      if (displayValue !== '0') {
        clearDisplay();
      } else {
        clearAll();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
            <td><CalculatorKey onPress={() => inputDigit(1)}>1</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputDigit(2)}>2</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputDigit(3)}>3</CalculatorKey></td>
            <td><CalculatorKey className="operator" onPress={() => performOperation('/')}>÷</CalculatorKey></td>
          </tr>
          <tr>
            <td><CalculatorKey onPress={() => inputDigit(4)}>4</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputDigit(5)}>5</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputDigit(6)}>6</CalculatorKey></td>
            <td><CalculatorKey className="operator" onPress={() => performOperation('*')}>×</CalculatorKey></td>
          </tr>
          <tr>
            <td><CalculatorKey onPress={() => inputDigit(7)}>7</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputDigit(8)}>8</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputDigit(9)}>9</CalculatorKey></td>
            <td><CalculatorKey className="operator" onPress={() => performOperation('+')}>+</CalculatorKey></td>
          </tr>
          <tr>
            <td><CalculatorKey onPress={() => inputDot()}>.</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputDigit(0)}>0</CalculatorKey></td>
            <td><CalculatorKey onPress={() => (isClearDisplay ? clearDisplay() : clearAll())}>{clearText}</CalculatorKey></td>
            <td><CalculatorKey className="operator" onPress={() => performOperation('-')}>−</CalculatorKey></td>
          </tr>
          <tr>
            <td></td>
            <td><CalculatorKey onPress={() => toggleSign()}>±</CalculatorKey></td>
            <td><CalculatorKey onPress={() => inputPercent()}>%</CalculatorKey></td>
            <td><CalculatorKey className="operator" onPress={() => performOperation('=')}>=</CalculatorKey></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

Calculator.propTypes = {
  onSetDisplayValue: PropTypes.func
};

export default hot(Calculator);
