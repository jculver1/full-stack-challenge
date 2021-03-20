import React from 'react';
import './CompanyTile.scss'

const CompanyTile = (props) => {

    return ( 
        <div className="card">
            <div className="card-header d-inline-flex align-items-center justify-content-between">
                <div className='d-inline-flex align-items-center'>
                    <h4>{props.company.name} | </h4>
                    <h5>{props.company.city}, {props.company.state}</h5>
                </div>
                <button type="button" class="btn btn-link">Link</button>
            </div>
            <div class="card-body">
                <p class="card-text">{props.company.description}</p>
            </div>
        </div>
     );
}
 
export default CompanyTile;