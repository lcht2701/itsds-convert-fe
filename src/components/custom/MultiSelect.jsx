import Select from "react-select";

export function MultiSelect(props) {
  return (
    <Select
      isMulti
      options={props.options}
      onChange={(selectedOptions) =>
        props.onChange(
          selectedOptions ? selectedOptions.map((option) => option.value) : []
        )
      }
      className="w-full"
      classNamePrefix="select"
    />
  );
}
