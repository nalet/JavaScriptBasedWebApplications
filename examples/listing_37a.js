function Person(name, age) {
	this.name = name;
	this.age = age;
}
Person.prototype.describe = function() {
	console.log(this.name+" is "+this.age);
}
Person.prototype.speak = function(phrase) {
	console.log(this.name+" says: "+phrase);
}

// Student extends Person
//------------------------
function Student(name, age, university) {
	// Call super constructor on 'this'
	Person.call(this, name, age);
	
	// Student's properties
	this.university = university;
}
// ...
// Replace Student's prototype by a new object which has 
// Person's prototype as proto
Student.prototype = Object.create(Person.prototype);
// Set consctructor property
Student.prototype.constructor = Student;
// Add Student functionality
Student.prototype.sleep = function() {
	console.log("CHRRR Z Z Z z z...");
}
// Override Person's prototype.describe
Student.prototype.describe = function(){
	console.log(this.name+" is a student at "+this.university);
};

var bob = new Student("Bob", 25, "BFH");
console.log(bob instanceof Student);  // >> true
console.log(bob instanceof Person);   // >> true
bob.speak("Hi");                      // >> Bob says: Hi
bob.describe();                       // >> Bob is a student at BFH
bob.sleep();                          // >> CHRRR Z Z Z z z...