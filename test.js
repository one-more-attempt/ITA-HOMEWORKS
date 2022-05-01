class Pets {    
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

class Dog extends Pets {
    constructor(name, age) {
        super(name, age);
    }

    sayGau() {
        console.log(`Gau gau, ${this.name}, ${this.age}`);
    }

}

class Cat extends Pets {
    constructor(name, age) {
        super(name, age);
    }

    sayMeow() {
        console.log(`Meow meow, ${this.name}, ${this.age}`);
    }
}

const murzik = new Cat('Murzik', 5);
const bobik = new Dog('Bobik', 10);

murzik.sayMeow();
bobik.sayGau();