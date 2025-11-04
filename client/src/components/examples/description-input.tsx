import { useState } from 'react';
import { DescriptionInput } from '../description-input';

export default function DescriptionInputExample() {
  const [value, setValue] = useState('');

  return (
    <div className="p-4 max-w-2xl">
      <DescriptionInput value={value} onChange={setValue} />
    </div>
  );
}
