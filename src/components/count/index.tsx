import React, { useState } from "react";

function Count() {
  const [count, setCount] = useState(1);

  return (
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
  );
}

export { Count };
