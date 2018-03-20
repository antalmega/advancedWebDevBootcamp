// In Javascript we mimic classes by using functions to creates objets through the use of contructor functions and the 'new' keyword.

// The new keyword does four things: 1. It creates an empty object out of thin air 2. It then sets the keyword 'this' in the function wich is being used with to be that empty object that we just created 3. It adds an implicit 'return this' to the end of the function, so that the object created using the 'new' keyword can be returned from the function 4. It adds a property onto the empty object called '__proto__", commonly called "dunder proto", wich links the prototype property on the constructor function to the empty object that was just created

// Example of constructor
function Dog(name, age){
    this.name = name;
    this.age = age;
    this.bark = function(){
        console.log(this.name + ' just barked!');
    }
}

// Creating a new object
var rusty = new Dog('rusty', 3);

// Calling a method
rusty.bark() // Rusty just barked!

// Using call or apply to make multiple constructors
function Car(make, model, year){
	this.make = make;
	this.model = model;
	this.year = year;
	this.numWheels = 4;
}

// Using call
function Motorcycle(make, model, year){
	Car.call(this, make, model, year);
	this.numWheels = 2;
}

// Using apply
function Motorcycle(make, model, year){
	Car.apply(this, [make, model, year]);
	this.numWheels = 2;
}

// We don't need to even pass in parameters! even better using apply with arguments
function Motorcycle(make, model, year){
	Car.apply(this, arguments);
	this.numWheels = 2;
}
