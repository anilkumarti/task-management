import React, { useState } from 'react';
import './AddTaskForm.css';

const AddTaskForm = ({ onAdd, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        dueDate: '',
        status: 'Todo',
        category: 'Work'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;
        
        const newTask = {
            id: Date.now().toString(),
            ...formData,
            dueDate: formData.dueDate || 'Today'
        };
        
        onAdd(newTask);
    };

    return (
        <div className="add-task-container">
            <form onSubmit={handleSubmit} className="add-task-form">
                <div className="form-main">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="task-title-input"
                        placeholder="Task Title"
                        autoFocus
                    />
                    <div className="task-controls">
                        <button 
                            type="button" 
                            className="date-button"
                            onClick={() => {
                                const dateInput = document.createElement('input');
                                dateInput.type = 'date';
                                dateInput.onchange = (e) => {
                                    handleChange({
                                        target: {
                                            name: 'dueDate',
                                            value: e.target.value
                                        }
                                    });
                                };
                                dateInput.click();
                            }}
                        >
                            📅 Add date
                        </button>
                        
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="status-select"
                        >
                            <option value="Todo">TO-DO</option>
                            <option value="In-Progress">IN-PROGRESS</option>
                            <option value="Completed">COMPLETED</option>
                        </select>

                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="category-select"
                        >
                            <option value="Work">WORK</option>
                            <option value="Personal">PERSONAL</option>
                        </select>
                    </div>
                </div>
                
                <div className="form-actions">
                    <button type="submit" className="add-button">
                        ADD
                    </button>
                    <button 
                        type="button" 
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        CANCEL
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddTaskForm;