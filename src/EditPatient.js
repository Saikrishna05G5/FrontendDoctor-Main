import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditPatient = ({ patientId, onClose, onUpdate }) => {
  const [patientData, setPatientData] = useState({
    name: '',
    weight: '',
    gender: '',
    age: '',
    disease: '',
  });

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`https://doctorbackend-main-production.up.railway.app/patients/${patientId}`);
        setPatientData(response.data);
      } catch (error) {
        console.error('Error fetching patient data:', error);
      }
    };

    fetchPatient();
  }, [patientId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://doctorbackend-main-production.up.railway.app/patients/${patientId}`, patientData);
      onUpdate();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };

  return (
    <div>
      <h3>Edit Patient</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={patientData.name} onChange={handleChange} />
        </div>
        <div>
          <label>Weight:</label>
          <input type="text" name="weight" value={patientData.weight} onChange={handleChange} />
        </div>
        <div>
          <label>Gender:</label>
          <input type="text" name="gender" value={patientData.gender} onChange={handleChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="text" name="age" value={patientData.age} onChange={handleChange} />
        </div>
        <div>
          <label>Disease:</label>
          <input type="text" name="disease" value={patientData.disease} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default EditPatient;
