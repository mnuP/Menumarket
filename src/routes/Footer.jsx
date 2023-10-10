import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow
} from 'mdb-react-ui-kit';
import Button from 'react-bootstrap/Button';
import "../style.css";

export default function Footer() {
  return (
    <MDBFooter style={{ backgroundColor: '#000000', color:"white"}} className='text-center text-lg-left'>
      <MDBContainer fluid className='p-4'>
        <MDBRow>
          <MDBCol md=''>
            <h5 className='text-uppercase'>¡La diversion esta servida!</h5>
            <img
                src="https://menumarket.co/wp-content/uploads/2022/03/menu-logo.png"
                className="d-inline-block align-top"
                alt="React Bootstrap logo"
              />
          </MDBCol>

          <MDBCol md=''>
          </MDBCol>


          <MDBCol md=''>
            <h5 className='text-uppercase'> Contacto</h5>
            <br></br>
            <p >Tel: 573117917370</p>
            <p >Email: atencionalcliente@menumarket.co</p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: '#000000', color:"white"}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://menumarket.co/'>Menumarket.co</a>
      </div>
    </MDBFooter>
  );
}