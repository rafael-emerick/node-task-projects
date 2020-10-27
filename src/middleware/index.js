const { isUuid } = require('uuidv4'); 
var i = 0;
module.exports = {
    validateId(req, res, next){
        const { id } = req.params;
        if(!isUuid(id)){
            return res.status(400).json({ error: 'Invalidate id!' })
        }
        
        return next()
    },
    countReq(req, res, next){
        next()
        console.log(`Número de requisições: ${++i}`)
    },
    foundProject(req, res, next){
        console.log(req)
        const projectIndex = projects.findIndex(project => project.id === id)
        if(projectIndex < 0){
            return res.status(400).json({ error: 'Project not found!'})
        }
        next(projectIndex)
    }

}