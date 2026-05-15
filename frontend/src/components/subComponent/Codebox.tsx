import React from 'react'
import { FaFileCode } from "react-icons/fa";

const Codebox = () => {
  // Dummy code string
  const code = `const message = "Hello World";
console.log(message);

function greet() {
  return "This box is dummy!";
}`;

  const eachLines = code.split("\n");

  return (
    <div className="w-full h-full rounded-xl border border-[#1f2937] bg-[#0d1117] overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-3 border-b border-[#1f2937] bg-[#161b22]">
        <FaFileCode color='green' size={20}/>

        <span className="ml-1 text-sm text-gray-400 font-medium">
          example.ts
        </span>
      </div>

      {/* main code Area */}
      <div className="overflow-auto h-full p-4 font-mono text-sm">
        {eachLines.map((line, index) => (
          <div
            key={index}
            className="flex gap-4 hover:bg-white/5 px-2 rounded-md"
          >

            {/* increasing line number */}
            <span className="w-8 text-right text-gray-500 select-none">
              {index + 1}
            </span>

            {/* main code */}
            <span className="text-gray-300 whitespace-pre">
              {line || " "}
            </span>

          </div>
        ))}
      </div>
    </div>
  )
}

export default Codebox