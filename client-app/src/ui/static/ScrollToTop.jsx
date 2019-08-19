import React, { useEffect } from 'react';
import {withRouter} from 'react-router-dom';

  function ScrollToTop({children, location: { pathname, hash }}) {
      useEffect(() => {
        // if(!hash) {
          window.scrollTo(0, 0);
        // }
      }, [pathname]);

      return (
      <>
        {children}
      </>);
  }
  
  export default withRouter(ScrollToTop);