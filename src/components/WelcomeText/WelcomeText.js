import React from 'react';

const WelcomeText = (name) => {
  return (
    <div className='white f3'>
      {`Welcome ${name.name}!`}
    </div>
  );
}

export default WelcomeText;