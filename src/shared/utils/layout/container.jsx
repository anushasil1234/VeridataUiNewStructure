import React, { useEffect, useRef, useState } from 'react'
import { Container } from '@mui/material';
import { containerSx } from 'app';
const CustomContainer = ({ children }) => {
    // const [scrollPosition, setScrollPosition] = useState(0);
    // console.log('scrollPosition', scrollPosition);
    
    // const scrollableDivRef = useRef(null);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         if (scrollableDivRef.current) {
    //             setScrollPosition(scrollableDivRef.current.scrollTop);
    //         }
    //     };

    //     const div = scrollableDivRef.current;
    //     if (div) div.addEventListener("scroll", handleScroll);

    //     return () => {
    //         if (div) div.removeEventListener("scroll", handleScroll);
    //     };
    // }, []);
    return (
        <Container  maxWidth="xlg" sx={containerSx}>
            {children}
        </Container>
    )
}

export default CustomContainer