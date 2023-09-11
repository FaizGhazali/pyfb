import { useState } from 'react';

export default function CrudTest() {
  const [column1, setColumn1] = useState('');
  const [column2, setColumn2] = useState('');
  const [db_name, setColumnDb_name] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'column1') {
      setColumn1(value);
    } else if (name === 'column2') {
      setColumn2(value);
    } else if (name === 'db_name') {
      setColumnDb_name(value);
    }
  };

  const handleCreate = async () => {
    try {
      const response = await fetch('/api/createRecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ column1, column2 }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRead = async () => {
    try {
      const response = await fetch('/api/getAllRecords');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('/api/updateRecord', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 1, column1, column2 }), // Assuming you're updating the record with id 1
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch('/api/deleteRecord', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 1 }), // Assuming you're deleting the record with id 1
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h1>CRUD Test</h1>
      <div>
        <label>
          Column 1:
          <input type="text" name="column1" value={column1} onChange={handleInputChange} />
        </label>
      </div>
      <div>
        <label>
          Column 2:
          <input type="text" name="column2" value={column2} onChange={handleInputChange} />
        </label>
      </div>
      <button onClick={handleCreate}>Create</button>
      <button onClick={handleRead}>Read</button>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
      {/* <br/><br/><br/><br/>
      <h1>CREATE DB</h1>
      <div>
        <label>
          DB NAME: 
          <input type="text" name="db_name" value={db_name} onChange={handleInputChange} />
        </label>
        <br/>
        <button onClick={handleCreate}>Create New DB</button>
      </div> */}
    </div>
  );
}
