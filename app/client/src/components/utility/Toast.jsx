import React from 'react';
import {toast} from 'bulma-toast';

const Toast = ({message, type}) => (
  <React.Fragment>
    {
      toast({
        message,
        type,
        dismissible: true,
        position: 'top-right'
      })
    }
  </React.Fragment>
);
export default Toast;
