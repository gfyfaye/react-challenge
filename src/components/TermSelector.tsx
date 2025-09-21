import type { Dispatch, SetStateAction } from "react"

interface TermSelectorProps {
  name: string,
  options: string[],
  selected: string,
  setSelected: Dispatch<SetStateAction<string>>
}

const TermSelector = ({name, options, selected, setSelected }: TermSelectorProps) => (

    <div className = "flex justify-center gap-4">
        {options.map((option) => (
            <div key = {option}>
                <input type = "radio" id = {option} name={name} value={option}
                checked = {option === selected}
                onChange = {() => setSelected(option)} />
            
                <label className = "ml-1" htmlFor = {option}>{option}</label>
            </div>
            ))
        }
    </div>
);

export default TermSelector;