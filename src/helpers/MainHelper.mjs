export const verifyIsNull = (res, variable) => {
    if (variable === null) {
        return res.status(404).json({ mensagem: 'Não encontrado' })
    }
}