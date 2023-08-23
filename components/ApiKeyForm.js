import { useState } from 'react';

const ApiKeyForm = ({ onSubmit }) => {
  const [apiKey, setApiKey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(apiKey);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        API Key:
        <input
          type="text"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApiKeyForm;
