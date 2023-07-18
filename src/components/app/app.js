import { Component } from 'react';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import nextId from "react-id-generator";
import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: [
                {name: "Mus D.", salary: 900, increase: false, like: true, id: nextId()},
                {name: "Lim M.", salary: 322, increase: true, like: false, id: nextId()},
                {name: "Orta Boy", salary: 5000, increase: true, like: false, id: nextId()}
            ],
            term:'',
            filter:'all'
        }
    }

    deleteItem = (id) => {
        this.setState(({obj}) => ({
             obj: obj.filter(item => item.id !== id)
        }))
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: nextId()
        };
        this.setState(({obj}) => {
            return {obj: [...obj, newItem]};
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({obj}) => ({
            obj: obj.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                } else {
                    return item;
                }
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    filterPost = (items, filter) => {
        switch(filter) {
            case 'like':
                return items.filter(item => item.like)
            case 'more1000':
                return items.filter(item => item.salary > 1000)
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    changeSalary = (newSalary, person) => {
        this.setState(({obj}) => ({
            obj: obj.map(item => {
                if (item.name === person) {
                return {...item, newSalary}
            }
            return item;
            })
        }))
    }

    render() {
       const {obj, term, filter} = this.state;
       const employees = this.state.obj.length;
       const increased = this.state.obj.filter(item => item.increase).length;
       const visibleObj = this.filterPost(this.searchEmp(obj, term), filter);
        return (
            <div className="app">
                <AppInfo
                    employees={" " + employees}
                    increased={increased}
                />
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data={visibleObj}
                    onDelete={this.deleteItem}
                    onToggleProp={this.onToggleProp}
                    changeSalary={this.changeSalary}
                    />
                <EmployeesAddForm
                    onAdd={this.addItem}
                    />
            </div>
        )
    }
}

export default App;