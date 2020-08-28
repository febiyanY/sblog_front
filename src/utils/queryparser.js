
const parser = (queryparams) => {
    let queryObj
    let query = queryparams.replace('?','').split('&')
    query = query.forEach(q => {
        let splitted = q.split('=')
        const name = splitted[0]
        queryObj = {...queryObj, [name] : splitted[1]}
    })
    return queryObj
}

export default parser