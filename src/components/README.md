# TextField Component

A flexible and reusable text field component that can render different types of inputs: text, email, password, or dropdown menu.

## Features

- Supports multiple input types: text, email, password, and dropdown
- Customizable styling with className prop
- Error state handling
- Required field indication
- Accessible labels
- Consistent styling across all input types

## Usage

```tsx
import { TextField } from '@/components';

// Basic text input
<TextField
  type="text"
  label="Full Name"
  placeholder="Enter your full name"
  value={name}
  onChange={setName}
  required
/>

// Email input
<TextField
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  value={email}
  onChange={setEmail}
  error={emailError}
/>

// Password input
<TextField
  type="password"
  label="Password"
  placeholder="Enter your password"
  value={password}
  onChange={setPassword}
  required
/>

// Dropdown menu
<TextField
  type="dropdown"
  label="Country"
  placeholder="Select your country"
  value={country}
  onChange={setCountry}
  options={[
    { value: 'ng', label: 'Nigeria' },
    { value: 'gh', label: 'Ghana' },
    { value: 'ke', label: 'Kenya' },
  ]}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| type | 'text' \| 'email' \| 'password' \| 'dropdown' | Yes | The type of input to render |
| label | string | No | Label text for the input |
| placeholder | string | No | Placeholder text for the input |
| value | string | Yes | Current value of the input |
| onChange | (value: string) => void | Yes | Function to call when the input value changes |
| options | { value: string; label: string }[] | No | Options for dropdown type (required for dropdown) |
| required | boolean | No | Whether the field is required (default: false) |
| className | string | No | Additional CSS classes to apply to the input |
| error | string | No | Error message to display below the input |
| id | string | No | HTML id attribute for the input |
| name | string | No | HTML name attribute for the input |

## Example

See `TextFieldExample.tsx` for a complete example of how to use this component with all supported input types.