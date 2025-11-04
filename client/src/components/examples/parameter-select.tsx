import { useState } from 'react';
import { ParameterSelect } from '../parameter-select';
import { Sun } from 'lucide-react';

export default function ParameterSelectExample() {
  const [value, setValue] = useState('');

  return (
    <div className="p-4 max-w-md">
      <ParameterSelect
        label="Time of Day"
        value={value}
        options={['Dawn', 'Morning', 'Noon', 'Afternoon', 'Dusk', 'Night']}
        onChange={setValue}
        icon={Sun}
      />
    </div>
  );
}
