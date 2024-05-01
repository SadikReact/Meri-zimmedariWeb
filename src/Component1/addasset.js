import React, { useState } from 'react';
import { Container, Row, Col, Table, Button, Input } from 'reactstrap';

import { useNavigate } from 'react-router-dom';

const AssetPage = () => {
  const navigate = useNavigate();  

  const [assets] = useState([
    { id: 1, assetType: 'Laptop', numberOfAssets: 10 },
    { id: 2, assetType: 'Printer', numberOfAssets: 5 },
    // Add more assets as needed
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredAssets = assets.filter((asset) =>
    asset.assetType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddClick = () => {
    navigate('/assetform');
  };

  return (
    <Container className="mt-6">
      <h2>Asset Management</h2>
      <Row className="mb-3">
        <Col sm="6">
          <Input
            type="text"
            placeholder="Search Asset"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "30%", borderRadius: "20px" }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Table>
            <thead>
              <tr>
                <th>Asset Type</th>
                <th>Number of Assets Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.assetType}</td>
                  <td>{asset.numberOfAssets}</td>
                  <td>
                    <Button color="success" className="mr-2" onClick={handleAddClick}>
                      Add
                    </Button>
                    <Button color="info">
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default AssetPage;
