import React, { useState } from 'react';
import { TextField } from './index';

const TextFieldExample: React.FC = () => {
  // State for each type of input
  const [textValue, setTextValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');

  // Example dropdown options
  const dropdownOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#277B12]">TextField Component Examples</h2>
      
      {/* Text input example */}
      <TextField
        type="text"
        label="Text Input"
        placeholder="Enter some text"
        value={textValue}
        onChange={setTextValue}
        required
        id="text-example"
      />
      
      {/* Email input example */}
      <TextField
        type="email"
        label="Email Input"
        placeholder="Enter your email"
        value={emailValue}
        onChange={setEmailValue}
        required
        id="email-example"
      />
      
      {/* Password input example */}
      <TextField
        type="password"
        label="Password Input"
        placeholder="Enter your password"
        value={passwordValue}
        onChange={setPasswordValue}
        required
        id="password-example"
      />
      
      {/* Dropdown example */}
      <TextField
        type="dropdown"
        label="Dropdown Menu"
        placeholder="Select an option"
        value={dropdownValue}
        onChange={setDropdownValue}
        options={dropdownOptions}
        id="dropdown-example"
      />
      
      {/* Example with error */}
      <TextField
        type="email"
        label="Email with Error"
        placeholder="Enter your email"
        value="invalid-email"
        onChange={() => {}}
        error="Please enter a valid email address"
        id="error-example"
      />
      
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="font-semibold mb-2">Current Values:</h3>
        <p><strong>Text:</strong> {textValue || '(empty)'}</p>
        <p><strong>Email:</strong> {emailValue || '(empty)'}</p>
        <p><strong>Password:</strong> {passwordValue ? '********' : '(empty)'}</p>
        <p><strong>Dropdown:</strong> {dropdownValue || '(empty)'}</p>
      </div>
    </div>
  );
};

export default TextFieldExample;