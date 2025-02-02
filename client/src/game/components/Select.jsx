import { useState } from "react";

export default function Select({ onChange }) {
  return (
    <select
      name='gameMode'
      id='difficulty'
      defaultValue={"b"}
      onChange={onChange}
    >
      <option value='a'>9x9 10 mines</option>
      <option value='b'>16x16 40 mines</option>
      <option value='c'>16x30 99 mines</option>
    </select>
  );
}
