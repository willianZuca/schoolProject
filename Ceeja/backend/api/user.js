module.exports = app => {
    const {existsOrError , notExistsOrError } = app.api.validation

    const save = async (req , res) => {
        const user ={ ...req.body }
        if(req.params.id) user.id = req.params.id

        try {
            existsOrError(user.name, 'Nome não informado!')
            existsOrError(user.cpf, 'CPF não informado!')
            existsOrError(user.phoneNumber, 'Número de telefone não informado!')
            existsOrError(user.shift, 'Período não informado!')
            existsOrError(user.stage, 'Turno não informado!')
            existsOrError(user.educationalCenter, 'Polo não informado!')

            const userFromDB = await app.db('students')
                .where({cpf: user.cpf}).first()
            if(!user.id){
                notExistsOrError(userFromDB, 'Estudante já matriculado!')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        res.send('user save')
    }

    return { save }
}