import { useState } from "react";
import { StreamTextResponse, StreamObjectResponse } from "../../";
export default function Home() {
  const [formState, setFormState] = useState({
    input1:
      "Tell me about artificial interlligence. Response must be less than 100 characters",
    input2: "Five Chuck Norris Jokes to make you laugh",
    content: "",
    array: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container px-4 mt-10 mx-auto">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full lg:w-1/3 px-4 mb-6 lg:mb-0">
          <div className="relative px-6 pb-6 py-4 bg-white rounded">
            <div className="">
              <input
                type="text"
                name="input1"
                defaultValue={formState.input1}
                onChange={handleChange}
                className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <button
              className="w-32 mt-2 py-2 px-3 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded"
              onClick={() => {
                StreamTextResponse(
                  process.env.NEXT_PUBLIC_OPENAIKEY,
                  formState.input1 || "",
                  (value) => {
                    console.log("RESPONSE", value);
                    handleChange({
                      target: {
                        name: "content",
                        value: value,
                      },
                    });
                  },
                  (value) => {
                    console.log("STATUS", value);
                  }
                );
              }}
            >
              Send
            </button>
            <div className="text-sm mt-5">{formState.content}</div>
          </div>
        </div>
        <div className="w-full lg:w-2/3 px-4">
          <div className="px-6 pb-6 pt-4 bg-white shadow rounded">
            <div className="">
              <input
                type="text"
                name="input2"
                defaultValue={formState.input2}
                onChange={handleChange}
                className=" w-96 p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 "
              />
            </div>
            <button
              className="w-32 mt-2 py-2 px-3 text-xs text-white bg-indigo-500 hover:bg-indigo-600 rounded"
              onClick={() => {
                StreamObjectResponse(
                  process.env.NEXT_PUBLIC_OPENAIKEY,
                  formState.input2 || "",
                  (value) => {
                    console.log("RESPONSE", value);
                    handleChange({
                      target: {
                        name: "array",
                        value: value,
                      },
                    });
                  },
                  (value) => {
                    console.log("STATUS", value);
                  }
                );
              }}
            >
              Send
            </button>
            <div className="text-sm mt-5">
              {JSON.stringify(formState.array, null, 2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
