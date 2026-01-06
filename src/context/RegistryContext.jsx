import React, { createContext, useContext, useState } from 'react';

const RegistryContext = createContext();

export const useRegistry = () => useContext(RegistryContext);

const defaultStudents = [
    { id: 1, name: "Ali Khan", rollNo: "S101", course: "High School" },
    { id: 2, name: "Sara Ahmed", rollNo: "S102", course: "B.Sc" }
];

const defaultStaff = [
    { id: 1, name: "Mr. John Doe", role: "Teacher", department: "Science" },
    { id: 2, name: "Ms. Jane Smith", role: "Admin", department: "Office" }
];

export const RegistryProvider = ({ children }) => {
    const [students, setStudents] = useState(defaultStudents);
    const [staff, setStaff] = useState(defaultStaff);

    const addStudent = (student) => setStudents([...students, { ...student, id: Date.now() }]);
    const removeStudent = (id) => setStudents(students.filter(s => s.id !== id));

    const addStaff = (member) => setStaff([...staff, { ...member, id: Date.now() }]);
    const removeStaff = (id) => setStaff(staff.filter(s => s.id !== id));

    return (
        <RegistryContext.Provider value={{ students, staff, addStudent, removeStudent, addStaff, removeStaff }}>
            {children}
        </RegistryContext.Provider>
    );
};
