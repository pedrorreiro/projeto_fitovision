const Ensaio = require('../Model/Ensaio');

    async function addEnsaio(e){

        try{
            await Ensaio.create({
                envio: e.envio,
                ensaio: e.ensaio,
                dataRecebida: e.dataRecebida,
                planejado: e.planejado,
                reteste: e.reteste,
                estacao: e.estacao,
                ano: e.ano,
                criarPbs: e.criarPbs,
                validar: e.validar,
                geracao: e.geracao,
                ADTorPDT: e.ADTorPDT,
                reg: e.reg,
                evento: e.evento,
                pais: e.pais,
                macro: e.macro,
                etapa: e.etapa,
                projeto: e.projeto,
                solicitante: e.solicitante,
                amostrasRecebidas: e.amostrasRecebidas
            });
        }
        catch(error){
            console.log("Erro na inserção dos dados!");
            console.log(error);
        }
        
        
    }

    async function getEnsaios(orderBy){

        var objOrdem = {order: []};

        if(orderBy !== ''){
            objOrdem.order.push(orderBy);
        }

        try{
            return await Ensaio.findAll(objOrdem);
        }
        catch(error){
            console.log("Erro ao pegar dados do banco!");
            console.log(error);
            return null;
        }
        
        
    }

    async function getQtdBy(tipo, valor){   

        const result = await Ensaio.count({
            where: {
                [tipo]: valor    
            }
        })

        return result;
        
    }

    async function deleteByEnvio(envio){   

        const result = await Ensaio.destroy({
            where: {
                envio: envio    
            }
        })

        return result;
        
    }


module.exports = {
    addEnsaio: addEnsaio,
    getEnsaios: getEnsaios,
    getQtdBy: getQtdBy,
    deleteByEnvio: deleteByEnvio
};
