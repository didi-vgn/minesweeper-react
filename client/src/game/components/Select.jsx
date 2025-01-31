import { useState } from "react";

export default function Select() {
  function handleChange(e) {
    const value = e.target.value;
    console.log(value);
  }
  return (
    <select
      name='difficulty'
      id='difficulty'
      defaultValue={"b"}
      onChange={handleChange}
    >
      <option value='a'>9x9 10 mines</option>
      <option value='b'>16x16 40 mines</option>
      <option value='c'>16x30 99 mines</option>
    </select>
  );
}
