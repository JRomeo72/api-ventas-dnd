import Date from './model.js';

const getAllDates = async (req, res) => {

    try {
        let allDates = await Date.findAll();
        res.json(allDates)
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const getDate = async (req, res) => {
    try {
        let { id } = req.params;
        let date = await Date.findByPk(id);
        if(!date) return res.status(404).json( { message: "Date mot found" } );
        res.status(200).json(date);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const createDate = async (req, res) => {

    try {
        let { date, data } = req.body;
        
        let newDate = await Date.create( {date, data} );
        res.status(200).json([{ message: 'Product created successfully' }, newDate]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const updateDate = async (req, res) => {

    try {
        let { id } = req.params;
        let { data } = req.body;
        console.log(req.body)
        let dateUpdated = await Date.findByPk(id);
        if(!dateUpdated) return res.status(404).json( { message: "Date not found" } );
        dateUpdated.data = JSON.stringify(data);
        console.log("Dentro", dateUpdated.data)
        await dateUpdated.save();
        res.json({ message: 'Product updated successfully', dateUpdated });

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

const deleteDate = async (req, res) => {

    try {
        let { id } = req.params;
        let DateDeleted = await Date.findByPk(id);
        if(!DateDeleted) return res.status(404).json( { message: "Date not found" } );
        DateDeleted.destroy();
        res.json( { message: "Oeder deleted successfully" } )
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};

let dates = {
    getAllDates, createDate, getDate, updateDate, deleteDate
};

export default dates