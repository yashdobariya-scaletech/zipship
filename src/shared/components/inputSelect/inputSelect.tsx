import React from 'react';
import Select from 'react-select';

interface Props {
  fieldName: string;
  options: ISelectOptions[];
  onChange: (selectedValue: any) => void;
  selectedValue: ISelectOptions | any;
  label?: string;
  defaultValue?: ISelectOptions;
}

export interface ISelectOptions {
  label: string;
  value: string;
}

export const InputSelect: React.FC<Props> = (props) => {
  const { fieldName, options, onChange, selectedValue, label } = props;

  return (
    <>
      {label && <p className="mb--10 font--bold text--black">{label || ''}</p>}
      <Select
        className="form__input form__input--select"
        classNamePrefix="form__input--select"
        value={selectedValue}
        onChange={onChange}
        options={options}
        name={fieldName}
      />
    </>
  );
};
