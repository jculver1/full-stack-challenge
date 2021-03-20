import React ,{useState, useEffect} from 'react';
import './CompaniesList.scss'
import CompanyTile from '../../components/CompanyTile/CompanyTile'

const CompaniesList = () => {

    const baseUrl = 'http://localhost:3001/'
    const [companies, setCompanies] = useState([])


    const getCompanyList = () => {
        fetch(baseUrl + 'companies', {
            method: 'get',
        })
        .then(res => res.json())
        .then(response => {
           setCompanies(response)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getCompanyList()
    }, [])

    return (
       <div className='companylist-container'>
           {
               companies.map(item => {
                   return(
                        <div className='p-2'>
                            <CompanyTile company={item}/>
                        </div>
                   )
               })
           }
          <button type="button" class="btn btn-primary m-2">Add Company</button>
       </div>
    );
}
 
export default CompaniesList;