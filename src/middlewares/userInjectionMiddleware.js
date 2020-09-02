const {User} = require("../models");
module.exports = async (ctx, next) => {
    let user = await User.findOne({tgId: ctx.from.id});
    if (!user)
        user = new User({tgId: ctx.from.id, tgInfo: ctx.from});

    ctx.user = user;
    try {
        await next();

        await user.save()
    }catch (e) {
        ctx.reply('Произошла ошибка ;(')
        console.error(e.message)
    }
};