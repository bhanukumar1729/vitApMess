import React from "react";

const MenuItem = ({ name }) => {
  return (
    <div className="py-3 border-b border-[rgb(var(--border))] last:border-b-0">
      <h3
        className="
          text-base sm:text-lg
          bg-[rgb(var(--bg))] text-[rgb(var(--text))]
          break-words whitespace-normal
          leading-relaxed
        "
      >
        {name}
      </h3>
    </div>
  );
};

export default MenuItem;
