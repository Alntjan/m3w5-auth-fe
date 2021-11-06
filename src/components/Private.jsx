import React, { Component } from 'react'
import axios from "axios"
import { Redirect } from 'react-router';

class Private extends Component {

  state = {
    privateData: null,
    isLoading: true
  }

  componentDidMount() {
    axios.get(`${process.env.REACT_APP_API_HOST}/private`, { withCredentials: true }) // credentials will allow the backend to access the session on this request. Important when authorizing.
    .then( (response) => {
      this.setState({ privateData:response.data, isLoading: false })
    })
    .catch( (err) => {
      console.log(err.response.status) // => the error message status code
      if (err.response.status === 403) {
        this.props.history.push("/login");
      }
    });
  }


  render() {

    const { privateData, isLoading } = this.state

    // authorization in the Frontend. Optional if you have backend authorization.
    // Redirect is like a Link but automatically clicked when read
    if (!this.props.isLoggedIn) return <Redirect to="/login"/>

    return (
      <div>
        <h1>My private Page</h1>
        {isLoading && <h1>...isLoading</h1>}
        {!isLoading && <h3>{privateData.message}</h3>}
      </div>
    )
  }
}

export default Private
