const express = require('express');
const router = express.Router();

const Libro = require('../models/Libro')

const { requiredScopes } = require("express-oauth2-jwt-bearer");

//endpoint para obtener todos los libros 
router.get("/", requiredScopes("read:libros"), async (req, res) => {
    try {
    const libros = await Libro.find();
    res.json(libros);
    } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
    }
    })

//endpoint para crear un nuevo libro
router.post('/', requiredScopes('write:libros'), async(req, res)=> {
    try{
        const nuevoLibro = new Libro(req.body);
        await nuevoLibro.save();
        res.json(nuevoLibro)
    }catch(error){
        res.status(500).json({error: 'Error al crear el libro'})
    }
})

//endpoint para actualizar un libro
router.put('/:id', requiredScopes('write:libros'), async(req, res)=> {
    try{
        const LibroUpd = await Libro.findByIdAndUpdate(req.params.id, req.body, 
            {
                new: true,
        });
        res.json(LibroUpd)
    }catch(error){
        res.status(500).json({error: 'error al actualizar el Libro'})
    }
})


//endpoint para eliminar un libro

router.delete('/:id', requiredScopes('write:libros'), async(req, res) => {
    try{
        await Libro.findByIdAndDelete(req.params.id);
        res.json({message: 'libro eliminado correctamente'})
    }catch(error){
        res.status(500).json({error: 'Error al eliminar el libro'})
    }
});

module.exports = router;