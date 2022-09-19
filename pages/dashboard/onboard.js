import React, { useState } from "react";

const formFieldsInitial = [
  {
    id: "firstName",
    label: "First Name",
    value: "",
  },
  {
    id: "lastName",
    label: "Last Name",
    value: "",
  },
  {
    id: "email",
    label: "Email",
    value: "",
  },
  {
    id: "phoneNumber",
    label: "Phone Number",
    value: "",
  },
  {
    id: "address",
    label: "Address",
    value: "",
  },
];

function Onboard() {
  const [formFields, setFormFields] = useState([...formFieldsInitial]);

  const handleValChange = (event, formField) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormFields((prev) => {
      return prev.map((x) => {
        if (x.id == formField.id) {
          return {
            ...x,
            value: value,
          };
        } else {
          return x;
        }
      });
    });
  };

  return (
    <div className="max-w-sm mx-auto">
      <h1 className="text-xl font-bold  text-center my-12">
        Please help us understand you better
      </h1>
      <div className=" h-full justify-center items-center">
        <form className="w-full max-w-sm">
          {formFields.map((formField) => (
            <div key={formField.id} className="md:flex md:items-center mb-6">
              {console.log(formField)}
              <div className="md:w-1/3">
                <label
                  className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                  htmlFor="inline-full-name"
                >
                  {formField.label}
                </label>
              </div>
              <div className="md:w-2/3">
                <input
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  id="inline-full-name"
                  type="text"
                  onChange={(e) => handleValChange(e, formField)}
                  value={formField.value}
                />
              </div>
            </div>
          ))}

          <div className="md:flex md:items-center">
            <div className="md:w-1/3" />
            <div className="md:w-2/3">
              <button
                className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Onboard;
