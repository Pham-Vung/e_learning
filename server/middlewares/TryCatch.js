const TryCatch = (handler) => {
    return async(request, response, next) => {
        try {
            await handler(request, response, next);
        } catch(error) {
            response.status(200).json({
                message: error.message
            });
        }
    }
};

export default TryCatch;