import React, { useState } from 'react';
import { Card, CardBody, CardTitle, Col, Container, Row, Button, Form, FormGroup, Label, Input, Progress } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AssetStep = () => {
  const [step, setStep] = useState(1);
  const [policyFields, setPolicyFields] = useState({
    uploadPolicy: '',
    insurerName: '',
    policyNumber: '',
    reEnterPolicyNumber: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPolicyFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleNextStep = () => {
    if (step < 3) {
      setStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prevStep) => prevStep - 1);
    } else {
      // Navigate back to AssetPage when already at step 1
      navigate('/assetpage');
    }
  };

  const isStepComplete = () => {
    switch (step) {
      case 1:
        return !!policyFields.uploadPolicy && !!policyFields.insurerName && !!policyFields.policyNumber;
      case 2:
        // Add validation for step 2 if needed
        return true;
      case 3:
        // Add validation for step 3 if needed
        return true;
      default:
        return false;
    }
  };

  return (
    <Container>
      <Row className="mt-3">
        <Col>
          <Card>
            <CardBody>
              <CardTitle>
                <h5>Step {step}</h5>
                <Progress value={step * 33.33} />
              </CardTitle>

              <Form>
                {step === 1 && (
                  <div>
                    <FormGroup>
                      <Label for="uploadPolicy">Upload Policy (optional):</Label>
                      <Input
                        type="file"
                        name="uploadPolicy"
                        id="uploadPolicy"
                        value={policyFields.uploadPolicy}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="insurerName">Policy Insurer Name:</Label>
                      <Input
                        type="text"
                        name="insurerName"
                        id="insurerName"
                        value={policyFields.insurerName}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="policyNumber">Policy Number:</Label>
                      <Input
                        type="text"
                        name="policyNumber"
                        id="policyNumber"
                        value={policyFields.policyNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label for="reEnterPolicyNumber">Re-enter Policy Number:</Label>
                      <Input
                        type="text"
                        name="reEnterPolicyNumber"
                        id="reEnterPolicyNumber"
                        value={policyFields.reEnterPolicyNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </FormGroup>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    {/* Form fields for Step 2 */}
                  </div>
                )}

                {step === 3 && (
                  <div>
                    {/* Form fields for Step 3 */}
                  </div>
                )}

                <Button color="secondary" onClick={handleBack}>
                  Back
                </Button>
                <Button color="primary" onClick={handleNextStep} disabled={!isStepComplete()}>
                  Next
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AssetStep;
