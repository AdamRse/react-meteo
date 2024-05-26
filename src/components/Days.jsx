import React from 'react'

const Days = ({ days }) => {
  return (
    <div className="card-action">
      {days.map((day, index) => (
        <a href="#" key={index}>{day}</a>
      ))}
    </div>
  );
};

export default Days;