const defaultSettings = {
    slidesToShow: 3,
    focusOnSelect: true,
    infinite: false,
    // lazyLoad: 'ondemand',
    swipeToSlide: true,
    // centerMode: true,
    // centerPadding: "700px",
    responsive: [
        {
            breakpoint: 1921,
            settings: {
                slidesToShow: 2.1,
                // centerPadding: '200px',
                // centerMode: true,
            },
        },
        {
            breakpoint: 1600,
            settings: {
                slidesToShow: 2.1,
                // centerPadding: '100px',
                // centerMode: true,
            },
        },
        {
            breakpoint: 1290,
            settings: {
                // centerPadding: '50px',
                slidesToShow: 2.1,
                // centerMode: true,
            },
        },
        {
            breakpoint: 960,
            settings: {
                // centerPadding: '120px',
                slidesToShow: 1.1,
                // centerMode: true,
            },
        },
        {
            breakpoint: 480,
            settings: {
                // centerPadding: '15%',
                slidesToShow: 1,
                // centerMode: true,
            },
        },
    ],
}

export default defaultSettings
