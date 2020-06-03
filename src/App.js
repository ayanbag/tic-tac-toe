import React, { Component } from 'react'

import { Switch, Route, withRouter } from 'react-router-dom'

import { connect } from 'react-redux'
import { getWeather, getNews } from './redux'

import withLoading from './shared/withLoading'
import MainWrapper from './components/MainWrapper'
import Navbar from './components/Navbar/Navbar'
import Game from './components/GameV2/Game'

import './App.css'

const MainWrapperWithLoading = withLoading(MainWrapper)

class App extends Component {
    componentDidMount() {
        this.props.getWeather()
        this.props.getNews()
    }

    render() {
        return (
            <div
                className="main-wrapper"
                style={
                    this.props.isLoading ? { justifyContent: 'center' } : null
                }
            >
                <MainWrapperWithLoading
                    isLoading={this.props.isLoading}
                    className="app-wrapper"
                >
                    <Navbar />
                    <Switch>
                        <Route exact path="/Weather" />
                        <Route path="/" component={Game} />
                    </Switch>
                </MainWrapperWithLoading>
            </div>
        )
    }
}


export default withRouter(
    connect(
        state => ({ isLoading: state.isLoading }),
        { getWeather, getNews }
    )(App)
)
