module.exports = app => {
    app.route('/students')
        .post(app.api.user.save)
        .get(app.api.user.get)

    app.route('/students/:id')
        .put(app.api.user.save)
}