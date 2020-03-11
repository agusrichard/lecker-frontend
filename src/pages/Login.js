import React from 'react'
import { 
  Container,
  Row,
  Col
} from 'reactstrap'

// import NavBar from '../components/NavBar'
import LoginForm from '../components/LoginForm'

class Login extends React.Component {
  render() {
    return (
      <Container>
        <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <LoginForm go={this.props.history.push}/>
        </Col>
        </Row>
      </Container>
    )
  }
}


export default Login