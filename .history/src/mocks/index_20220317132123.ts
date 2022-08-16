const IS_BROWSER = typeof window != 'undefined'

export const setupMocks = async() =>{
    const{ mswWorker} = await import("./mswWorker")
    mswWorker.listen()
}