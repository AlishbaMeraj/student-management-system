#! /usr/bin/env node


import inquirer from "inquirer"
import chalk from "chalk"

class student{
    static counter = 10000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor(name: string){
        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100;
    }


    // method to enroll a student in a course
    enroll_course(course: string){
        this.courses.push(course);
    }

    // method to view a student balance
    view_balance(){
        console.log(`Balance for ${this.name} : $${this.balance}`);
    }

    //method to pay student fees
    pay_fees(amount: number){
        this.balance -= amount;
        console.log(`$${amount}Fees paid successfully for ${this.name}`);
        console.log(`Remaining Balance : $${this.balance}`);
    }

    //method to display student status
    show_status(){
        console.log(`ID: ${this.id}`);
        console.log(`Name: ${this.name}`);
        console.log(`Courses: ${this.courses}`);
        console.log(`Balance: ${ this.balance}`);
    }

}
   

// defining a studend_manager class to manage student
class student_manager{
    students: student[]

    constructor(){
        this.students = [];
    }
    // method to add a new student 
    add_student(name: string){
        let Student = new student(name);
        this.students.push(Student);
        console.log(`student: ${name} added sucessfully. Student ID: ${Student.id}`);
    }

    // method to enroll a student in a course
    enroll_student(student_id: number, course: string){
     let student =  this.find_student(student_id);
     if(student){
        student.enroll_course(course);
        console.log(`${student.name} enrolled in ${course} sucessfully`);


     }

    }

    //method to view a student balance
    view__student_balance(student_id: number){
        let student =  this.find_student(student_id);
        if(student){
            student.view_balance();

        }
        else{
            console.log("Student not found. Please enter a correct student ID")
        }

    }
    // method to pay student fees
    pay_student_fees(student_id: number, amount: number){
        let student =  this.find_student(student_id);
        if(student){
            student.pay_fees(amount);
        }
        else{
            console.log("Student not found. Please enter a correct student ID")
        }
    }

    // method to display student status
    show_student_status(student_id: number){
        let student =  this.find_student(student_id);
        if(student){
            student.show_status();

        }
    }

    // method to find a student by student_id
    find_student(student_id: number){
        return this.students.find(std => std.id === student_id);

    }
}

async function main(){
    console.log(chalk.bold.cyan("\n\tWelcome to 'Alishba Meraj' - student Management system"));
    console.log("-*".repeat(35));

    let Student_manager = new student_manager();

    while(true){
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "Select an option",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ]
            }
        ]);

        // using switch case to handle user choice

        switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student Name",
                    }
                ]);
                Student_manager.add_student(name_input.name);
                break;
            

            case "Enroll Student":
                let Course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter a Course Name",
                    }
                ]);
                Student_manager.enroll_student(Course_input.student_id, Course_input.course)
                break;

                case "View Student Balance":
                    let balance_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a student ID",
                        }
                    ]);
                    Student_manager.view__student_balance(balance_input.student_id);
                    break;


                    case "Pay Fees":
                    let fees_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a student ID",
                        },
                        {
                            name: "amount",
                            type: "number",
                            message: "Enter the amount to pay",

                        }
                    ]);
                    Student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                    break;


                    case "Show Status":
                    let status_input = await inquirer.prompt([
                        {
                            name: "student_id",
                            type: "number",
                            message: "Enter a student ID",
                        }
                    ]);
                   Student_manager.show_student_status(status_input.student_id);
                    break;


                    case "Exit":
                        console.log("Exiting....");
                        process.exit();
        }
    }
}

main();