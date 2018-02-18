import React, { Component} from 'react'
import ReactDOM from 'react-dom'

class Layout extends Component {
  constructor () {
    super()
    this.state = {
      name: 'Joe'
    }
  }
  render () {
    return (<div className='home'>
        Firuousss
      </div>)
  }
}

const app = document.getElementById('app')

ReactDOM.render(<Layout />, app)
