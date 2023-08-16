//This file holds all static texts

const CommonText = {
    addModalTitlePrefix: 'Create',
    editModalTitlePrefix: 'Update',
    deleteBtn:'Delete',
    cancelBtn:'Cancel',
    addBtn: 'Add',
    editBtn: 'Edit',
    deleteTitle: "Are you sure to delete",
    deleteBody: "Deleting",
    sagaError: "Something went wrong while",
    sagaGetError: "getting",
    sagaListError: "listing",
    sagaAddError: "adding",
    sagaEditError: "updating",
    sagaDeleteError: "deleting",
};
const HomeText = {
    title: "Café Employee Management",
    description: "A simple café employee management."
};
const CafeText = {
    menuText: "Café",
    title: "Café Management",
    addNewBtn: "Add New Café",
    addNewModalBody: "This will add new café to the café management.",
    addNewModalEditBody: "This will update",
    addNewModalEditBody2: " café into the café management",
    deleteBody: `café will delete all café data as well as their employee's.`,
    sagaErrorText: 'café'
};
const EmployeeText = {
    menuText: "Employee",
    title: "Employee Management",
    addNewBtn: "Add New Employee",
    addNewModalBody: "This will add new employee to the café management and add his/her café relation if you select a café as well.",
    addNewModalEditBody: "This will update",
    addNewModalEditBody2: " employee into the café management",
    deleteBody: `employee will delete all employee data his/her relation with the café.`,
    editOpenErr: 'Something seems wrong please try after a while, if still persist check server management.',
    sagaErrorText: 'employee'
};

export {
    CommonText,
    HomeText,
    CafeText,
    EmployeeText
}