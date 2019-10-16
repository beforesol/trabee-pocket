import * as React from 'react';
import axios from 'axios';

class DynamicPage extends React.PureComponent {

  nameRef = React.createRef();
  IDRef = React.createRef();
  CheckNameRef = React.createRef();

  componentDidMount () {
    // axios.get('/api/tests')
    //   .then(response => {
    //     console.log(response);
    //   }) // SUCCESS
    //   .catch( response => { console.log(response); } ); // ERROR
  }

  handleSubmit = () => {
    const name = this.nameRef.current.value;
    const id = this.IDRef.current.value;

    console.log('hi');
    // axios.post('/api/users', {
    //   user: {
    //     name,
    //     id
    //   }
    // })
    //   .then(response => {
    //     if (response.data.result === 0) {
    //       alert('Error, please, try again')
    //     }
    //     if (response.data.result === 1) {
    //       alert('Success')
    //     }
    //   })
    //   .catch( response => { console.log(response) } )
  }

  checkData = () => {
    const name = this.CheckNameRef.current.value;

    console.log('hi');
    axios.post('/api/users/checkUsers', {
      user: {
        name
      }
    })
      .then(
        response => {
          console.log(response.data);
        }
      )
      .catch( response => { console.log(response) } )
  }

  render() {
    return (
      <div>
        <h1>Dynamic Page</h1>
        <h2>Input</h2>
        name: <input type="text" placeholder="name" ref={this.nameRef}/>
        ID: <input type="text" placeholder="ID" ref={this.IDRef}/>
        <button onClick={this.handleSubmit}>Submit</button>
        <h2>Check</h2>
        name: <input type="text" placeholder="name" ref={this.CheckNameRef}/>
        <button onClick={this.checkData}>Check</button>
      </div>
    );
  }
}

export default DynamicPage;
