import React ,{useState, useEffect} from 'react';
import './CompanyDetails.scss'
import CompanyTile from '../../components/CompanyTile/CompanyTile'
import CreateNewCompany from '../CreateNewCompany/CreateNewCompany'
import { Button, Form, Modal, Row, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

const CompanyDetails = (props) => {

    const baseUrl = 'http://localhost:3001/'

    const {name, city, state, description, date, id } = (props.location && props.location.details) || {};
    const [companyDetails, setCompanyDetails] = useState({id:id, name: name, city: city, state: state, description: description, founded_date:date })
    const [founders, setFounders] = useState([]);
    const [editCompany, setEditCompany] = useState(false)

    const getFounderList = () => {
        if(id){
            fetch(baseUrl + 'founders/' + id, {
                method: 'get',
            })
            .then(res => res.json())
            .then(response => {
                console.log(response, 'res')
               setFounders(response)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const deleteCompany = () => {
        if(id){
            fetch(`${baseUrl}company/${id}`, {
                method: 'delete',
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }

    const updateDetails = (e, key) => {
        let updateCompanyDetails = companyDetails
        updateCompanyDetails[key]= e.target.value
        setCompanyDetails(updateCompanyDetails)
    }

    const saveDetails = () => {
        fetch(`${baseUrl}company/${id}`, {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(
              companyDetails
            )
        })
        .then(response => response.json())
        .then(response => setCompanyDetails(response))
        .catch((err) => {
              console.log(err)
        })
        setEditCompany(false)
    }

    useEffect(() => {
        getFounderList()
    }, [])


    return (
       <div className='details-container'>
           <h3 className='d-flex justify-content-center p-4'>{companyDetails.name}</h3>
            <div className='d-flex justify-content-center p-4 align-items-center'>
                <div className='d-inline-flex align-items-center justify-content-center'>
                    <p className='m-2'>{companyDetails.date} </p>
                    <p className='m-2'> {companyDetails.city}, {companyDetails.state}</p>
                </div>
                <div className='line-break m-2'></div>
                <div className='d-inline-flex align-items-center justify-content-center'>
                    <Button className='m-2' onClick={()=> setEditCompany(true)}>Edit</Button>
                    <Link
                        onClick={() => deleteCompany()}
                        className="btn btn-primary m-2"
                        to={{
                        pathname: "/",
                        }}
                    >
                        Delete
                    </Link>
                </div>
            </div>
            <p className='d-flex justify-content-center p-4'>{companyDetails.description}</p>
            <div className="founders-list d-flex justify-content-center p-5">
                {
                    founders.length > 0 ?
                    founders.map(founder => {
                        return(
                            <div className='founder-container d-inline-flex align-items-center justify-content-around p-5'>
                                <div>{founder.full_name}</div>
                                <div>{founder.title}</div>
                                <Button>Add Founder</Button>
                            </div>
                        )
                    })
                :
                <div className='founder-container d-inline-flex align-items-center justify-content-center'>
                    <h5 className='m-4'>No Founders Have Been Added Yet</h5>
                </div>
            }
            </div>
            <Modal
                size="lg"
                centered
                aria-labelledby="contained-modal-title-vcenter"
                show={editCompany}
                onHide={() => setEditCompany(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Company</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Row className='p-2'>
                            <Form.Label>Company Name:</Form.Label>
                            <Form.Control type="text" placeholder={name} onChange={(e) => updateDetails(e, 'name')} />
                        </Row>
                        <Row className='p-2'>
                            <Col xs={6} md={4}>
                                <Form.Label>City:</Form.Label>
                                <Form.Control type="text" placeholder={city} onChange={(e) => updateDetails(e, 'city')}/>
                            </Col>
                            <Col xs={6} md={4}>
                                <Form.Label>State:</Form.Label>
                                <Form.Control type="text" placeholder={state} onChange={(e) => updateDetails(e, 'state')}/>
                            </Col>
                            <Col xs={6} md={4}>
                                <Form.Group controlId="validateFoundedDate">
                                    <Form.Label>Founded Date:</Form.Label>
                                    <Form.Control
                                        placeholder={date}
                                        id='date'
                                        type="date" 
                                        name="foundedDate"
                                        onChange={e => updateDetails(e, 'date')}
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className='p-2'>
                            <Form.Label>Description:</Form.Label>
                            <Form.Control type="text" placeholder={description} onChange={(e) => updateDetails(e, 'description')}/>
                        </Row>
                    </Form.Group>
                    <Button id='submit-button' type="submit" onClick={() => saveDetails()}>Save</Button>
                </Modal.Body>
            </Modal>
       </div>
    );
}
 
export default CompanyDetails;