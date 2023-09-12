import { useState } from 'react';

const AddSensorReading = () => {
  const [formValues, setFormValues] = useState({
    value1: '',
    value2: '',
    value3: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sensor/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formValues)
      });

      const data = await response.json();

      if (data.success) {
        alert('Sensor reading added successfully!');
        setFormValues({
          value1: '',
          value2: '',
          value3: ''
        });
      } else {
        alert('Error adding sensor reading. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Value 1:
          <input
            type="text"
            name="value1"
            value={formValues.value1}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Value 2:
          <input
            type="text"
            name="value2"
            value={formValues.value2}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Value 3:
          <input
            type="text"
            name="value3"
            value={formValues.value3}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddSensorReading;
