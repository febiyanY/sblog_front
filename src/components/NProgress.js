import { NProgress } from '@tanem/react-nprogress'
import React from 'react'
import Bar from './nProgress/Bar'
import Container from './nProgress/Container'
import './nProgress/index.css'
import {useSelector} from 'react-redux'

const Nprogress = props => {
    const {isLoading} = useSelector(state => state.ui)
    
    return (
        <NProgress isAnimating={isLoading} >
        {({ isFinished, progress, animationDuration }) => (
            <Container
                isFinished={isFinished}
                animationDuration={animationDuration}
            >
                <Bar
                    progress={progress}
                    animationDuration={animationDuration}
                />

            </Container>
        )}
    </NProgress>
    )
}

export default Nprogress