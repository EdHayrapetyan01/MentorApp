import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';

import './styles.scss';

export default function Profile() {
  const { choosedSuggestions } = useSelector((state) => state.employeeData.employees);
  const [user, setUser] = useState([]);

  useEffect(() => {
    //TODO: set user obj to localStoage for signIn implementation
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUser(user);
    }
  }, []);

  return (
    <>
      <Row>
        <Col className='profile-col'>
          <img
            className='user-photo'
            src='https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt=''
          />

          <p className='username'>Name: {user.name}</p>
          <p className='user-email'>Email: {user.email}</p>
          <p>Bio: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia, consequuntur.</p>
          <Button>Edit profile</Button>
        </Col>

        <Col className='profile-col'>
          <h2>MentorCliq?</h2>
          <p className='mentor-text'>
            MentorcliQ customers rate us the highest in overall satisfaction, ease of use, features and value for the
            money. Don’t take our word for it, see real customer reviews below.
          </p>
          <h2>Chosen accounts</h2>

          {choosedSuggestions.length ? (
            choosedSuggestions.map((account) => {
              return (
                <>
                  <div>
                    <Card className='profile-card' style={{ width: '230px' }}>
                      <CardImg
                        style={{ width: '100%' }}
                        top
                        width='100%'
                        src='https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                        alt='Card image cap'
                      />
                      <CardBody>
                        <CardTitle style={{ fontWeight: 'bold' }}>
                          {account.first_name} {account.last_name}
                        </CardTitle>
                        <CardSubtitle style={{ color: '#00bcd4' }}>{account.country}</CardSubtitle>
                        <CardText>{account['job title']}</CardText>
                      </CardBody>
                    </Card>
                  </div>
                </>
              );
            })
          ) : (
            <p className='mentor-text'>You still not have any chosen accounts.</p>
          )}
        </Col>
      </Row>
    </>
  );
}
