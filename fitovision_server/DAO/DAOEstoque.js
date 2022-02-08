const Estoque = require('../Model/Estoque');

    async function addEstoque(e){

        try{
            await Estoque.create({
                produto: e.produto,
                quantidade: e.quantidade,
                validade: e.validade,
                unidade: e.unidade,
                lote: e.lote,
                obs: e.obs
            });
        }
        catch(error){
            console.log("Erro na inserção dos dados!");
            console.log(error);
        }
        
        
    }

    async function getEstoque(){

        try{
            return await Estoque.findAll();
        }
        catch(error){
            console.log("Erro ao pegar dados do banco!");
            console.log(error);
            return null;
        }
        
    }

    async function deleteById(id){   

        const result = await Estoque.destroy({
            where: {
                id: id    
            }
        })

        return result;
        
    }


module.exports = {
    addEstoque: addEstoque,
    getEstoque: getEstoque,
    deleteById: deleteById
};
