import './employees-list-item.css';
import cn from 'classnames';

const EmployeesListItem = (props) => {
  
    const {name, salary, onDelete, onToggleProp, increase, like, changeSalary} = props;

    return (
        <li className={cn('list-group-item', 'd-flex', 'justify-content-between', {increase}, {like})}> 
        <span className='list-group-item-label' tabIndex={0} onClick={onToggleProp} data-toggle="like">{name}</span>
        <input type="text" className='list-group-item-input' defaultValue={salary + '$'} onChange={(e) => changeSalary(e.target.value, name)} />
        <div className="d-flex justify-content-center align-items-center">
            <button type='button'
                className='btn-cookie btn-sm'
                onClick={onToggleProp}
                data-toggle="increase">
                <i className="fas fa-cookie"></i>
            </button>

            <button type='button'
                className='btn-trash btn-sm'
                onClick={onDelete}>
                <i className="fas fa-trash"></i>
            </button>
            <i className="fas fa-star"></i>
        </div>
    </li>
)
}

export default EmployeesListItem;

