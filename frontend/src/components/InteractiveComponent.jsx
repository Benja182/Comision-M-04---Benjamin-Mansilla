// InteractiveComponent.js
import React, { useState } from 'react';

const InteractiveComponent = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Contador: {count}</p>
      <button onClick={handleIncrement}>Incrementar</button>
    </div>
  );
};

export default InteractiveComponent;
