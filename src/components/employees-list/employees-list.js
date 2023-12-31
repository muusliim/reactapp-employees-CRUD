import EmployeesListItem from "../employees-list-item/employees-list-item"
import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp, changeSalary}) => {
    const elements = data.map(elem => {
        const {id, ...elemProps} = elem;
        
        return (
            <EmployeesListItem 
                key={id} 
                {...elemProps} 
                onDelete={() => onDelete(id)}
                onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                changeSalary={changeSalary}
                />
        )
    })
    return (
        <ul className="app-list list-group">
            {elements}  
        </ul>
    )
}

export default EmployeesList;