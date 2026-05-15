import React from 'react'

const Codebox = () => {
  // Dummy code string
  const code = `const message = "Hello World";
console.log(message);

function greet() {
  return "This box is dummy!";
}`;

  return (
    <div className="mt-2 w-full rounded-lg border border-gray-800 bg-[#0d1117] p-6 cursor-pointer">
      <pre className="overflow-x-auto text-sm font-mono text-gray-300">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export default Codebox