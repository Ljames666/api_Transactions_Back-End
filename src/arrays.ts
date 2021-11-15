import { ClientGrowBank, EmployeeGrowBank } from "./Class";
const clientsGrowBank: Array<ClientGrowBank> = [];

const employeesGrowBank: Array<EmployeeGrowBank> = [
  {
    id: 1,
    username: "admin",
    password: "admin",
  },
  {
    id: 2,
    username: "Paulo",
    password: "1234",
  },
];
let eId: number = 3;

let addEmployees = (username: string, password: string) => {
  const employee = new EmployeeGrowBank(eId, username, password);
  eId++;
  employeesGrowBank.push(employee);
};
addEmployees("Jamerson", "Jam123");
export { clientsGrowBank, employeesGrowBank };
