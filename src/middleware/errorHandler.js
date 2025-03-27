const errorHandler=(err,req,res,next)=>{
    console.error(err.stack)
    const statusCode=err.statusCode||500
    const message=err.message||"internal sarver error"

    res.status(statusCode).json({
        status:"error",
        message,
    })
}
export default errorHandler


