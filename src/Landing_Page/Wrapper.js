import React from 'react';
import SlideMenu from './SlideMenu'
import Footer from './Footer'
import './assets/css/main.css'

export default function componentWrapper(Component){
    
    return (
      <>
      <SlideMenu />
      <Component />
      <Footer />
      </>
    )
  }