import React from 'react'

import LoadingIndicator from '../shared/LoadingIndicator'

const withLoading = Comp => ({ isLoading, children, ...props }) => {
    if (isLoading) {
        return <LoadingIndicator style={{ margin: 'auto' }} />
    } else {
        return <Comp {...props}>{children}</Comp>
    }
}

export default withLoading
