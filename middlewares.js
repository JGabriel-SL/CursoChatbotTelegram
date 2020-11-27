const exec = (ctx, ...middlewares) => {
    const run = index => {
        middlewares &&  index < middlewares.length &&
            middlewares[index](ctx, () => run(index + 1))
    }
    run(0)
}

const mid1 = (ctx, next) => {
    ctx.info1 = "info1"
    next()
}

const mid2 = (ctx, next) => {
    ctx.info2 = "info2"
    next()
}

const ctx = {}

exec(ctx, mid1, mid2)

console.log(ctx)