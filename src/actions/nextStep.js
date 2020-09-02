const {steps} = require('../../botSettings');
const fs = require('fs');

const errMsg = 'Произошла ошибка, нет сообщения для текущего шага';
const sendStep = async (ctx, currentStepId) => {
    const currentStep = steps[currentStepId] || {};
    const {message, photo, video} = currentStep;


    console.log(currentStepId)
   if(photo)
        await ctx.replyWithPhoto({source: fs.readFileSync(`public/${photo}`)},{caption: message || errMsg});
    else if(video)
        await ctx.replyWithVideo({source: fs.readFileSync(`public/${video}`)},{caption: message || errMsg});
    else
        await ctx.reply(message || errMsg);
};

const sendSuccess = async (ctx, currentStepId) => {
    const currentStep = steps[currentStepId];

    if (!currentStep) {
        if (currentStepId === 'start')
            await ctx.reply('привет');
        else if (currentStepId === 'end')
            await ctx.reply('пока');
    } else {
        const {successMessage, successPhoto, successVideo} = currentStep;
        if(successPhoto)
            await ctx.replyWithPhoto({source: fs.readFileSync(`public/${successPhoto}`)},{caption: successMessage || errMsg});
        else if(successVideo)
            await ctx.replyWithVideo({source: fs.readFileSync(`public/${successVideo}`)},{caption: successMessage || errMsg});
        else
            await ctx.reply(successMessage || errMsg);
    }
};


module.exports = async (ctx) => {

    const currentStepId = ctx.user.currentStep;
    const currentStep = steps[currentStepId] || {};
    const {nextStep} = currentStep;

    if (currentStepId === 'end')
        return sendStep(ctx, 'end');
    if (currentStepId !== 'start') {
        if (ctx.message.text === currentStep.code) {
            await sendSuccess(ctx, currentStepId);
        } else
            return ctx.reply('Не верный код');
    } else {
        await sendStep(ctx, 'start');
    }

    ctx.user.currentStep = nextStep || 'none';
    await sendStep(ctx, ctx.user.currentStep);
};