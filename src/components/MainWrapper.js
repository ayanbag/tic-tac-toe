import React, { Component } from 'react'

class MainWrapper extends Component {
    render() {
        const { children, className } = this.props
        return <div className={className}>{children}</div>
    }
}

export default MainWrapper
