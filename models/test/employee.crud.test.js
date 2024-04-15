// Reading data

// should return all the data with find method,
// should return proper document by various params with findOne method.
// Creating data

// should insert new document with insertOne method.
// Updating data

// should properly update one document with updateOne method,
// should properly update one document with save method,
// should properly update multiple documents with updateMany method.
// Removing data

// should properly remove one document with deleteOne method,
// should properly remove multiple documents with deleteMany method.

//spróbuj przetestować również taką operację: Employee.find().populate('department'). Test powinien sprawdzić, czy takie wywołanie zwróci dokumenty, w których atrybut department nie będzie tylko referencyjnym id, lecz zwykłym obiektem, otrzymanym oczywiście z kolekcji departments.