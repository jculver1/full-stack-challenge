import React from 'react';
import './CreateNewCompany.scss'
import { Form, Col, Row, Container } from 'react-bootstrap';

const CompanyTile = (props) => {
    return ( 
        <Container>
            <Row className='p-2'>
                <Form.Group>
                    <Form.Label>Company Name:</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Company Name"
                    />
                </Form.Group>
            </Row>
            <Row className='p-2'>
                <Col xs={6} md={4}>
                    <Form.Group>
                        <Form.Label>City:</Form.Label>
                        <Form.Control
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                    <Form.Group>
                        <Form.Label>State:</Form.Label>
                        <Form.Control
                            required
                        />
                    </Form.Group>
                </Col>
                <Col xs={6} md={4}>
                    <Form.Group>
                        <Form.Label>Founded Date:</Form.Label>
                        <Form.Control type="date" name="foundedDate" />
                    </Form.Group>
                </Col>
            </Row>
            <Row className='p-2'>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" aria-label="With textarea" />
                </Form.Group>
            </Row>
        </Container>
     );
}
 
export default CompanyTile;