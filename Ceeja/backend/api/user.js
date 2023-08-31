module.exports = app => {
    const {existsOrError , notExistsOrError } = app.api.validation

    const save = async (req , res) => {
        const student ={ ...req.body }
        if(req.params.id) student.id = req.params.id

        try {
            existsOrError(student.matriculation, 'Matrícula não informada!')
            existsOrError(student.name, 'Nome não informado!')
            existsOrError(student.cpf, 'CPF não informado!')
            existsOrError(student.phonenumber, 'Número de telefone não informado!')

            const studentFromDB = await app.db('students')
                .where({cpf: student.cpf}).first()
            if(!student.id){
                notExistsOrError(studentFromDB, 'Estudante já matriculado!')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(student.id) {
            app.db('students')
                .update(student)
                .where({ id: student.id })
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('students')
                .insert(student)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {
        app.db('students')
            .select('id', 'name', 'cpf', 'phoneNumber')
            .then(students => res.json(students))
            .catch(err => res.status(500).send(err))
    }

    return { save , get }
}