import { useState, useEffect } from 'react';

function DisplayData({sendData}) {
  const [data, setData] = useState([]);

  const value = "Hello";
  const value2 = "World";

  
  async function fetchData() {
    try {
      const response = await fetch('/api/mapApis/getAllRecords');
      const result = await response.json();
      setData(result.results);
      sendData(result.results);
      
    } catch (error) {
      console.error('Error:', error);
    }
  }
  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/deleteRecord', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }), // Assuming you're deleting the record with id 1
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleUpdate = async(id)=>{
    await fetch('./api/updateRecord',{
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, column1:value,column2:value2 }), 
    })
  };
  useEffect(()=>{
      fetchData();
  },[]);

  useEffect(() => {
    
    const interval = setInterval(() => {
        //fetchData();
    }, 0); // Refresh data every 5 seconds
    return ()=>{
        clearInterval(interval);
    }  
  }, []);

  return (
    <div>
      <h2>Display Data</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Column 1</th>
            <th>Column 2</th>
            <th>Delete Rows</th>
            <th>Update Items</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.latitude}</td>
              <td>{item.longitude}</td>
              <td><button onClick={() => handleDelete(item.id)}>Delete Button</button></td>
              <td><button onClick={() => handleUpdate(item.id)}>Update Item</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayData;