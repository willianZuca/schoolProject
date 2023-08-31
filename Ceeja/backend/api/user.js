module.exports = app => {
    const {existsOrError , notExistsOrError } = app.api.validation

    const save = async (req , res) => {
        const user ={ ...req.body }
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.matriculation, 'Matrícula não informada!')
            existsOrError(user.name, 'Nome não informado!')
            existsOrError(user.cpf, 'CPF não informado!')
            existsOrError(user.phoneNumber, 'Número de telefone não informado!')

            const userFromDB = await app.db('students')
                .where({cpf: user.cpf}).first()
            if(!user.id){
                notExistsOrError(userFromDB, 'Estudante já matriculado!')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        if(user.id) {
            app.db('students')
                .update(user)
                .where({id: user.id})
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        } else {
            app.db('students')
                .insert(user)
                .then(_ => res.status(204).send())
                .catch(err => res.status(500).send(err))
        }

        res.send('user save')
    }

    return { save }
}