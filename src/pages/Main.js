import React from 'react'


class Main extends React.Component {
  
  componentDidMount() {
    const data = JSON.parse(localStorage.getItem('token'))
    
    if (data) {
      this.props.history.push('/')
    } else {
      this.props.history.push('/auth/login')
    }
  }

  render() {
    return (
      <div>
        <p>Main page</p>
      </div>
    )
  }
}


export default Main