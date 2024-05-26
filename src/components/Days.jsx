import React from 'react'

const Days = ({ days, onDayClick }) => {
  return (
    <div className="card-action">
      {days.map((day, index) => (
        <a href="#" key={index} onClick={() => onDayClick(day)}>{day}</a>
      ))}
    </div>
  );
};

export default Days;