import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const DismissableAlert = (props) => {
  const [visible, setVisible] = useState(true);

  const onDismiss = () => {
    setVisible(false)
    props.dismiss()
  };

  return (
    <Alert color={ props.context } isOpen={ visible } toggle={ onDismiss }>
      { props.message }
    </Alert>
  );
}

export default DismissableAlert;