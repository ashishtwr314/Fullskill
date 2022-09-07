import React from "react";

function Layout({ children }) {
  return (
    <div className="w-full h-full flex">
      <div className="flex-1 h-screen border-r flex items-center justify-center">
        <div className="w-[80%]">
          <h1 className="text-3xl font-bold tracking-wide mb-4">
            Heading text here
          </h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At eius
            voluptatibus magnam cumque deleniti consectetur, sint quaerat
            ratione ea dignissimos quae nemo, in iusto maxime perferendis et
            totam dolorum quisquam?
          </p>
        </div>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}

export default Layout;
