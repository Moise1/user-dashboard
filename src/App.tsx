import './App.css'
import 'antd/dist/antd.css'
import React from 'react'
import Home from './views/Home'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import ChannelCreate from './components/ChannelCreate'
class App extends React.Component {
  state = {
    collapsed: true,
    staticvalue: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  };

  togglestatic = () => {
    this.setState({
      staticvalue: !this.state.staticvalue
    })
  };

  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={Home} />
            <Route
              path="/newchannel"
              component={() => {
                return (
                  <>
                    <ChannelCreate />
                  </>
                )
              }}
            />
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}

export default App
