import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const CampaignForm = () => {
  const [campaignData, setCampaignData] = useState({
    title: '',
    objective: '', // Add this line
    budget: '',
    startDate: '',
    endDate: '',
    media: null,
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCampaignData({ ...campaignData, media: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(campaignData).forEach(key => {
      formData.append(key, campaignData[key]);
    });

    try {
      const response = await axios.post('/api/campaigns/create', formData);
      console.log(response.data);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
      alert('An error occurred while creating the campaign.');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="campaignTitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter campaign title"
          name="title"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="campaignObjective">
        <Form.Label>Objective</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter campaign objective"
          name="objective"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="campaignBudget">
        <Form.Label>Budget</Form.Label>
        <Form.Control
          type="number"
          placeholder="Enter campaign budget"
          name="budget"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="campaignStartDate">
        <Form.Label>Start Date</Form.Label>
        <Form.Control
          type="date"
          name="startDate"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="campaignEndDate">
        <Form.Label>End Date</Form.Label>
        <Form.Control
          type="date"
          name="endDate"
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="campaignMedia">
        <Form.Label>Media Upload</Form.Label>
        <Form.Control
          type="file"
          name="media"
          onChange={handleFileChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Launch Campaign
      </Button>
    </Form>
  );
};

export default CampaignForm;
