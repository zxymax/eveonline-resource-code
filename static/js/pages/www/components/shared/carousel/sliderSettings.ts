const defaultSettings = {
  slidesToShow: 5,
  focusOnSelect: true,
  lazyLoad: 'ondemand',
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1921,
      settings: {
        slidesToShow: 3,
        centerPadding: '300px',
        centerMode: true,
      },
    },
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 3,
        centerPadding: '100px',
        centerMode: true,
      },
    },
    {
      breakpoint: 1290,
      settings: {
        centerPadding: '50px',
        slidesToShow: 3,
        centerMode: true,
      },
    },
    {
      breakpoint: 768,
      settings: {
        centerPadding: '20px',
        slidesToShow: 2,
        centerMode: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        centerPadding: '15%',
        slidesToShow: 1,
        centerMode: true,
      },
    },
  ],
}

export default defaultSettings

