const Professional = require('../models/MoviePofessional');

async function create(professional) {
    if (!professional.name) throw 'Name can not be empty';
    if (!professional.nationality) throw 'Nationality can not be empty';
    if (!professional.born) throw 'Date of birth can not be empty';
    p = new Professional(professional);
    await p.save();
}

async function getAll() {
    return await Professional.find();
}

async function getById(id) {
    return await Professional.findById(id);
}

async function update(id, professionalParam) {
    if (!professional.name) throw 'Name can not be empty';
    if (!professional.nationality) throw 'Nationality can not be empty';
    if (!professional.born) throw 'Date of birth can not be empty';

    const professional = await Professional.findById(id);

    Object.assign(movie, professionalParam);

    await professional.save();
}

async function _delete(id) {
    await Professional.findByIdAndRemove(id);
}

async function findByName(name){
    const professionals = await Professional.find()
    return professionals.filter(a => m.name.indexOf(name) != -1)
}


module.exports = {
    create,
    update,
    _delete,
    getAll,
    getById,
    findByName
};