//console.log("Hola Mundo!!");

var c1 = Object();
var c2 = {
    name: 'Ana',
    phone: '5678'
};
c1.name = "peter";
c1.phone = "1234";

c1.friend = c2;

var contacts = [c1, c2];

for (var i = 0; i < contacts.length; i++) {
    print(contacts[i]);
}

contacts.forEach(print);


function getPhones(contacts) {
    var res = [];
    for (var i = 0; i < contacts.length; i++)
        res.push(contacts[i].phone);

    return res;
}

function getPhonesCool(contacts) {
    return contacts.map((contact) => {
        return contact.phone;
    });
}

function getNamesByInitial(contacts, letter) {
    return contacts.map((contact) => {
        return contact.name;
    }).filter((name) => {
        return (name.charAt(0) == letter);
    });
}

var names = getNamesByInitial(contacts, "P");
var phones = getPhones(contacts);

console.log(phones);

function print(contact) {
    if (contact)
        console.log(contact.name + " -> " + contact.phone);
    else
        console.log(this.name + " -> " + this.phone);

}


function setAddress(address) {
    this.address = address;
}


c1.setAddress - setAddress;
c1.setAddress = ("c/xxxx");



c1.print = print;

c1.print();

print(c2);

//console.log(c1);
